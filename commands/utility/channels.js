module.exports = {
    name: "channels",
    description: "Returns the number of channels (excluding categories)",
    args: false,
    category: "utility",
    execute(message, args) {
        message.channel.send(
            message.guild.channels.cache.filter((c) => c.type !== "category")
                .size
        );
    },
};
