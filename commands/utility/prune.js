module.exports = {
    name: "prune",
    description: "Removes the specified no. messages",
    usage: "<numberOfMessages>",
    args: true,
    category: "utility",
    execute(message, args) {
        if (message.author.id === "733608333575192606")
            message.channel.bulkDelete(parseInt(args[0]), true);
    },
};
