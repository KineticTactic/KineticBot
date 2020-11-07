const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Returns the avatar of the user",
    usage: "(user)",
    args: false,
    category: "fun",
    execute(message, args) {
        if (!args.length) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username}'s avatar`)
                .setImage(
                    message.author.displayAvatarURL({
                        dynamic: true,
                        size: 256,
                    })
                )
                .setColor("#0088ff");
            message.channel.send(embed);
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${message.mentions.users.first().username}'s avatar`)
                .setImage(
                    message.mentions.users.first().displayAvatarURL({
                        dynamic: true,
                        size: 256,
                    })
                )
                .setColor("#0088ff");
            console.log(message.mentions.users.first());
            message.channel.send(embed);
        }
    },
};
