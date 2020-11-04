const emojiArray = [
    "🇦",
    "🇧",
    "🇨",
    "🇩",
    "🇪",
    "🇫",
    "🇬",
    "🇭",
    "🇮",
    "🇯",
    "🇰",
];

module.exports = {
    name: "poll",
    description: "Starts a poll",
    args: true,
    category: "fun",
    execute(message, args) {
        let msg = "";
        let optionStartIndex;

        args[0] = args[0].substring(1);
        for (let i = 0; i < args.length; i++) {
            console.log(i);
            if (args[i].includes('"') && i !== 0) {
                args[i] = args[i].slice(0, -1);
                msg += args[i];
                msg += "\n";
                optionStartIndex = i + 1;
                break;
            }
            msg += args[i];
            msg += " ";
        }

        if (args.length - optionStartIndex > 1) {
            for (let i = 1; i < args.length; i++) {
                // console.log(i);
                msg += `:regional_indicator_${String.fromCharCode(
                    97 + i - 1
                )}: : ${args[i]}\n`;
            }
            message.channel.send(msg).then((sentMessage) => {
                for (let i = 0; i < args.length - 1; i++) {
                    sentMessage.react(emojiArray[i]);
                }
            });
        } else {
            message.channel.send(msg).then((sentMessage) => {
                sentMessage.react("👍");
                sentMessage.react("👎");
            });
        }

        message.delete({ timeout: 1 });
    },
};
