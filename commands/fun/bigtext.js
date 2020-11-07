module.exports = {
    name: "bigtext",
    description: "Returns a bigger 'emojified' version of the string",
    usage: "<text>",
    args: true,
    category: "fun",
    execute(message, args) {
        let string = args.join(" ");
        string = string.toLowerCase();

        let bigString = "";
        for (let char of string) {
            if (char === " ") {
                bigString += "    ";
            } else {
                bigString += `:regional_indicator_${char}:`;
            }
        }
        message.channel.send(bigString);
    },
};
