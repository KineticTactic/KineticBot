module.exports = {
    name: "bubblewrap",
    description: "Bubble Wrap!",
    args: false,
    category: "fun",
    execute(message, args) {
        let size = 7;
        if (args[0]) {
            size = args[0];
        }
        const pop = "||pop||";
        let bubbleStr = "";
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                bubbleStr += pop;
                bubbleStr += " ";
            }
            bubbleStr += "\n";
        }
        if (bubbleStr.length > 2000) {
            message.channel.send("Too big!");
            return;
        }
        message.channel.send(bubbleStr);
    },
};
