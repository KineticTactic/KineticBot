const figlet = require("figlet");

module.exports = {
    name: "ascii",
    description: "Converts a string of text into ASCII art",
    usage: "<text>",
    args: true,
    category: "fun",
    execute(message, args) {
        let string = args.join(" ");
        figlet(string, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            message.channel.send("```" + data + "```");
        });
    },
};
