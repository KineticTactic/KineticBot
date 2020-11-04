module.exports = {
    name: "react",
    description: "Reacts to the message",
    args: false,
    category: "utility",
    execute(message, args) {
        message.react("✅");
    },
};
