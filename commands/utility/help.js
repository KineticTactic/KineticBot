const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "List all of my commands or info about a specific command.",
    usage: "(command)",
    args: false,
    category: "utility",
    execute(message, args) {
        const prefix = "~";

        const { commands } = message.client;

        let cmds = commands.map((command) => [command.name, command.category]);
        if (args.length === 0) {
            let fun = getCommandsInCategory(cmds, "fun");
            let cubing = getCommandsInCategory(cmds, "cubing");
            let knowledge = getCommandsInCategory(cmds, "knowledge");
            let music = getCommandsInCategory(cmds, "music");
            let moderation = getCommandsInCategory(cmds, "moderation");
            let utility = getCommandsInCategory(cmds, "utility");

            const embed = new Discord.MessageEmbed()
                .setColor("#0088ff")
                .setTitle("KineticBot Help")
                .setDescription(
                    `For more info on a particular command, you can do '${prefix}help <command>'`
                )
                .addFields(
                    { name: "Fun", value: fun },
                    { name: "Cubing", value: cubing },
                    { name: "Knowledge", value: knowledge },
                    { name: "Music", value: music },
                    { name: "Moderation", value: moderation },
                    { name: "Utility", value: utility }
                );

            message.channel.send(embed);
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("#0088ff")
                .setTitle("KineticBot Help")
                .addFields(
                    { name: "Command", value: `\`${args[0]}\`` },
                    {
                        name: "Description",
                        value: commands.get(args[0]).description,
                    },
                    {
                        name: "Usage",
                        value: `\`${prefix}${commands.get(args[0]).name} ${
                            commands.get(args[0]).usage
                        }\``,
                    }
                );

            message.channel.send(embed);
        }
    },
};

function getCommandsInCategory(list, category) {
    let cmdsArr = list.filter((cmd) => cmd[1] === category);
    let cmdString = "";
    for (let cmd of cmdsArr) {
        cmdString += "`" + cmd[0] + "` ";
    }
    console.log(cmdString);
    return cmdString;
}
