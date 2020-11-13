let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

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
            } else if (!isNaN(parseInt(char))) {
                bigString += `:${numbers[parseInt(char)]}:`;
            } else if (char === "!") {
                bigString += ":exclamation:";
            } else if (char === "?") {
                bigString += ":question:";
            } else {
                bigString += `:regional_indicator_${char}:`;
            }
        }
        message.channel.send(bigString);
    },
};
