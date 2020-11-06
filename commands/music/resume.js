module.exports = {
    name: "resume",
    description: "Resumes the paused track",
    args: false,
    category: "music",
    execute: async (message, args) => {
        if (message.member.voice.channel) {
            const connection = message.client.voice.connections.get(
                message.guild.id
            );
            connection.dispatcher.resume();
            message.channel.send("Resuming");
        }
    },
};
