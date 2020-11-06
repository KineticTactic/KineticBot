module.exports = {
    name: "pause",
    description: "Pauses the currently playing track",
    args: false,
    category: "music",
    execute: async (message, args) => {
        if (message.member.voice.channel) {
            const connection = message.client.voice.connections.get(
                message.guild.id
            );
            connection.dispatcher.pause();
            message.channel.send("Paused");
        }
    },
};
