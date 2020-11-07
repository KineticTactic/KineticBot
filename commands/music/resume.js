module.exports = {
    name: "resume",
    description: "Resumes the paused track",
    usage: "",
    args: false,
    category: "music",
    execute: async (message) => {
        if (message.member.voice.channel) {
            const connection = message.client.voice.connections.get(
                message.guild.id
            );
            connection.dispatcher.resume();
            message.channel.send("Resuming");
        }
    },
};
