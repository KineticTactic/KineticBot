module.exports = {
    name: "eval",
    description: "Evaluates JavaScript code",
    usage: "<code>",
    args: true,
    category: "fun",
    execute: async (message, args) => {
        const code = message.content.slice(1).trim().substring(5);
        try {
            await eval(code);
        } catch (error) {
            message.channel.send(`ERROR: ${error}`);
        }
    },
};
