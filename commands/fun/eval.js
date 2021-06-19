module.exports = {
    name: "eval",
    description: "Evaluates JavaScript code",
    usage: "<code>",
    args: true,
    category: "fun",
    execute: async (message) => {
        if (message.author.id === "733608333575192606") {
            const code = message.content.slice(1).trim().substring(5);
            try {
                await eval(code);
            } catch (error) {
                message.channel.send(`ERROR: ${error}`);
            }
        } else {
            message.channel.send("this command is not for noobs");
        }
    },
};
