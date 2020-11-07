const debate = require("../../data/debate.json");

module.exports = {
    name: "debate",
    description: "Returns a random debate topic",
    usage: "",
    args: false,
    category: "fun",
    execute(message, args) {
        let index = Math.floor(Math.random() * debate.length);
        message.channel.send(debate[index]);
    },
};
