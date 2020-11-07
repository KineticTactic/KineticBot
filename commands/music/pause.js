module.exports = {
    name: "pause",
    description: "Pauses the currently playing track",
    usage: "",
    args: false,
    category: "music",
    execute: async (message) => {
        if (message.member.voice.channel) {
            const connection = message.client.voice.connections.get(
                message.guild.id
            );
            connection.dispatcher.pause();
            message.channel.send("Paused");
        }
    },
};
