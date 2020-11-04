module.exports = {
    name: "rank",
    description: "Displays the rank of the user",
    args: false,
    database: true,
    category: "fun",
    execute(message, args, db) {
        if (args.length !== 0) {
            db.findOne(
                { id: message.mentions.users.first().id },
                (err, doc) => {
                    if (err) {
                        console.log(err);
                    }

                    message.channel.send(
                        `@${
                            message.mentions.users.first().username
                        }, Your level is ${doc.level}. You have ${
                            doc.xp
                        } xp out of a total of ${
                            5 * doc.level ** 2 + 50 * doc.level + 100
                        } xp that is required to level up.`
                    );
                }
            );
        } else {
            db.findOne({ id: message.author.id }, (err, doc) => {
                if (err) {
                    console.log(err);
                }

                message.reply(
                    `Your level is ${doc.level}. You have ${
                        doc.xp
                    } xp out of a total of ${
                        5 * doc.level ** 2 + 50 * doc.level + 100
                    } xp that is required to level up.`
                );
            });
        }
    },
};
