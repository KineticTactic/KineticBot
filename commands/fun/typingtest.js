const Discord = require("discord.js");

module.exports = {
    name: "typingtest",
    description: "Typing test!",
    usage: "",
    args: false,
    category: "utility",
    execute(message) {
        const text = "The quick brown fox jumps over the lazy dog";
        let startTime;
        message.channel
            .send(`Type this as fast as you can: \n \`${text}\``)
            .then(() => (startTime = Date.now()));

        const collector = new Discord.MessageCollector(
            message.channel,
            (m) => m.author.id === message.author.id,
            { time: 30000 }
        );

        collector.on("collect", (message) => {
            if (message.content.toLowerCase() === text.toLowerCase()) {
                const timeTaken = (Date.now() - startTime) / 1000;
                const wpm =
                    Math.round(
                        (text.length / 5 / (timeTaken / 60) + Number.EPSILON) *
                            100
                    ) / 100;
                message.channel.send(
                    `Well Done! It took you ${timeTaken} seconds. Your typing speed is ${wpm} WPM.`
                );
            } else {
                message.channel.send("Oops! You made a typo.");
            }
            collector.stop();
        });
    },
};
