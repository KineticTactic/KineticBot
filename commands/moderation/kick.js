module.exports = {
    name: "kick",
    description: "Kicks the mentioned user",
    usage: "<user>",
    args: true,
    category: "moderation",
    execute(message) {
        if (message.mentions.users.first()) {
            if (message.member.hasPermission("KICK_MEMBERS")) {
                try {
                    message.mentions.members.first().kick();
                    message.channel.send(
                        `${message.mentions.members.first()} has been kicked`
                    );
                } catch (err) {
                    console.log(err);
                    message.reply(
                        "I do not have permissions to kick " +
                            message.mentions.users.first()
                    );
                }
            } else {
                message.reply(
                    "You do not have permissions to kick " +
                        message.mentions.users.first()
                );
            }
        }
    },
};
