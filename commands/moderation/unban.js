module.exports = {
    name: "unban",
    description: "Unbans the user",
    usage: "<id>",
    args: true,
    category: "moderation",
    execute(message, args) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            try {
                message.guild.members.unban(args[0]);
                message.channel.send("The user has been unbanned");
            } catch {
                message.reply(
                    "I do not have permissions to unban" +
                        message.mentions.users.first()
                );
            }
        } else {
            message.reply(
                "You do not have permissions to unban" +
                    message.mentions.users.first()
            );
        }
    },
};
