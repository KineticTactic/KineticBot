module.exports = {
    name: "channels",
    description: "Returns the number of channels (excluding categories)",
    usage: "",
    args: false,
    category: "utility",
    execute(message) {
        message.channel.send(
            message.guild.channels.cache.filter((c) => c.type !== "category")
                .size
        );
    },
};
