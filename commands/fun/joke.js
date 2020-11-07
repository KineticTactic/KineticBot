const fetch = require("node-fetch");

module.exports = {
    name: "joke",
    description: "Returns a random joke",
    usage: "",
    args: false,
    category: "fun",
    execute(message, args) {
        fetch("https://official-joke-api.appspot.com/jokes/random")
            .then((res) => res.json())
            .then((json) => {
                message.channel.send(json.setup);
                message.channel.send(json.punchline);
            });
    },
};
