module.exports = {
    name: "uptime",
    description: "Returns the amount of time the bot has been running for",
    args: false,
    category: "utility",
    execute(message, args) {
        let uptime = message.client.uptime;

        let totalSeconds = uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        message.channel.send(
            `Uptime: ${days !== 0 ? `${days} days, ` : ""}${
                hours !== 0 ? `${hours} hours, ` : ""
            }${minutes !== 0 ? `${minutes} minutes, ` : ""}${seconds} seconds`
        );
    },
};
