const fs = require("fs");
const Discord = require("discord.js");
const DataStore = require("nedb");
const auth = require("./auth.json");
const Canvas = require("canvas");

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

client.once("ready", () => {
    console.log("Ready!");

    let statuses = ["Yoooooooooooooooooo", "Quantum Mechanics", "General Relativity", "nothing"];
    setInterval(
        () => client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)]),
        10000
    );
});

client.on("message", (message) => {
    if (message.author.bot) return;
    //client.emit("guildMemberAdd", message.member);

    if (!message.guild.id === "775202092880494613") handleRank(message, database);

    if (message.content.startsWith("~")) {
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
                message.reply("There was an error trying to execute that command!");
            }
        }

        if (command.args && !args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
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

client.on("guildMemberAdd", async (member) => {
    console.log("YOOOOO");
    const channel = member.guild.channels.cache.find((ch) => ch.name === "general");
    if (!channel) return;
    console.log("TOOOOO");

    const canvas = Canvas.createCanvas(1920, 1080);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage("./res/welcome.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = "150px sans-serif";
    ctx.fillStyle = "#ffffff";

    ctx.fillText("Welcome!", canvas.width / 2.5, canvas.height / 2.5);

    ctx.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.5);

    ctx.beginPath();
    ctx.arc(420, 540, 270, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "jpg" }));
    ctx.drawImage(avatar, 150, 270, 540, 540);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");

    channel.send(`Welcome to the server!`, attachment);
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));

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
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + "/" + file;
        let stat = fs.statSync(file);
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
