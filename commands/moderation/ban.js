module.exports = {
    name: "ban",
    description: "Bans the mentioned user",
    usage: "<user>",
    args: true,
    category: "moderation",
    execute(message, args) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            try {
                message.guild.members.ban(message.mentions.members.first());
                message.channel.send(
                    `${message.mentions.members.first()} has been banned`
                );
            } catch (err) {
                console.log(err);
                message.reply(
                    "I do not have permissions to ban" +
                        message.mentions.users.first()
                );
            }
        } else {
            message.reply(
                "You do not have permissions to ban" +
                    message.mentions.users.first()
            );
        }
    },
};
