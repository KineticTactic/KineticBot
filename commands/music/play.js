const ytdl = require("ytdl-core-discord");
const yts = require("yt-search");

module.exports = {
    name: "play",
    description: "Plays music!",
    usage: "<url or keyword>",
    args: true,
    category: "music",
    execute: async (message, args) => {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();

            let url;

            if (validURL(args[0])) {
                url = args[0];
            } else {
                const videos = await yts(args.join(" "));
                url = videos.videos[0].url;
            }

            console.log(url);

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

function validURL(str) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
}
