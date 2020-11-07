module.exports = {
    name: "disconnect",
    description: "Disconnects from the connected voice channel",
    usage: "",
    args: false,
    category: "music",
    execute: async (message) => {
        if (message.member.voice.channel) {
            const connection = message.client.voice.connections.get(
                message.guild.id
            );
            connection.disconnect();
            message.channel.send("Disconnected");
        }
    },
};
