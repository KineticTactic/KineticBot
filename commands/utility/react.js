module.exports = {
    name: "react",
    description: "Reacts to the message",
    usage: "",
    args: false,
    category: "utility",
    execute(message) {
        message.react("✅");
    },
};
