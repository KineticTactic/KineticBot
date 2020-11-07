const Discord = require("discord.js");

module.exports = {
    name: "coinflip",
    description: "Flips a coin and returns the result",
    usage: "",
    args: false,
    category: "fun",
    execute(message, args) {
        let result = Math.random() < 0.5 ? "HEADS" : "TAILS";
        let embed = new Discord.MessageEmbed()
            .setTitle(`The result is ${result}`)
            .setColor("#0088ff");
        message.channel.send(embed);
    },
};
