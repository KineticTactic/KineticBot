const ytdl = require("ytdl-core-discord");
const yts = require("yt-search");

module.exports = {
    name: "play",
    description: "Plays music!",
    args: false,
    category: "music",
    execute: async (message, args) => {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();

            const videos = await yts(args[0]);
            const url = videos.all[0].url;

            const dispatcher = connection.play(await ytdl(url), {
                type: "opus",
            });

            message.channel.send(`Now Playing: ${url}`);

            dispatcher.on("start", () => {
                console.log("audio.mp3 is now playing!");
            });

            dispatcher.on("finish", () => {
                console.log("audio.mp3 has finished playing!");
            });

            dispatcher.on("error", console.error);
        }
    },
};
