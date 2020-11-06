module.exports = {
    name: "stop",
    description: "Stops playing music",
    args: false,
    category: "music",
    execute: async (message, args) => {
        if (message.member.voice.channel) {
            const connection = message.client.voice.connections.get(
                message.guild.id
            );
            connection.dispatcher.destroy();
            message.channel.send("Stopped Playing");
        }
    },
};
