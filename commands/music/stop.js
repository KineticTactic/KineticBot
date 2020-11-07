module.exports = {
    name: "stop",
    description: "Stops playing music",
    usage: "",
    args: false,
    category: "music",
    execute: async (message) => {
        if (message.member.voice.channel) {
            const connection = message.client.voice.connections.get(
                message.guild.id
            );
            connection.dispatcher.destroy();
            message.channel.send("Stopped Playing");
        }
    },
};
