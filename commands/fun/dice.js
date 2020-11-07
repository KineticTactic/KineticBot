const Discord = require("discord.js");

module.exports = {
    name: "dice",
    description: "Rolls a dice and returns the result",
    usage: "",
    args: false,
    category: "fun",
    execute(message, args) {
        let result = Math.floor(Math.random() * 6) + 1;

        let embed = new Discord.MessageEmbed()
            .setTitle(`You rolled a ${result}`)
            .setColor("#0088ff");
        message.channel.send(embed);
    },
};
