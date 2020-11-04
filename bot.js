const fs = require("fs");
const Discord = require("discord.js");
const DataStore = require("nedb");
const auth = require("./auth.json");

// load Database
const database = new DataStore("database.db");
database.loadDatabase();
database.persistence.compactDatafile();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = walk("./commands");
commandFiles.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(file);
    client.commands.set(command.name, command);
}

client.once("ready", (evt) => {
    console.log("Ready!");
});

client.on("message", (message) => {
    if (message.author.bot) return;

    handleRank(message, database);

    if (message.content.startsWith("!")) {
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        if (command.database) {
            try {
                command.execute(message, args, database);
                return;
            } catch (error) {
                console.error(error);
                message.reply(
                    "There was an error trying to execute that command!"
                );
            }
        }

        if (command.args && !args.length) {
            return message.channel.send(
                `You didn't provide any arguments, ${message.author}!`
            );
        }

        try {
            if (command.database) command.execute(message, args, database);
            else command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply("There was an error trying to execute that command!");
        }
    }
});

client.login(auth.token);

function handleRank(message, database) {
    database.findOne({ id: message.author.id }, (err, doc) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!doc) {
            database.insert({
                id: message.author.id,
                level: 0,
                xp: 0,
                timestamp: 0,
            });
            console.log("new");
        } else {
            if (Date.now() - doc.timestamp >= 60 * 1000) {
                let totalXp = 5 * doc.level ** 2 + 50 * doc.level + 100;
                let newXp = doc.xp + Math.random() * 20 + 25;
                let newLevel = doc.level;
                if (newXp >= totalXp) {
                    newXp = 0;
                    newLevel = doc.level + 1;
                    message.reply(`You just leveled up to ${newLevel}!`);
                }
                database.update(
                    { id: message.author.id },
                    {
                        $set: {
                            xp: newXp,
                            level: newLevel,
                            timestamp: Date.now(),
                        },
                    }
                );
                console.log("update");
            }
        }
    });
}

function walk(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + "/" + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else {
            /* Is a file */
            results.push(file);
        }
    });
    return results;
}
