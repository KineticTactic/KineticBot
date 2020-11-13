module.exports = {
    name: "source",
    description: "Source Code!",
    usage: "",
    args: false,
    category: "utility",
    execute(message) {
        message.channel.send(
            `This bot is Open-Source! Go check out the source code: https://github.com/KineticTactic/KineticBot`
        );
    },
};
