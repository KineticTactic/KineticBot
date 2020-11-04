const cubeScrambler = require("cube-scrambler")();

module.exports = {
    name: "scramble",
    description: "Creates a scramble sequence for a 3x3",
    args: false,
    category: "fun",
    execute(message, args) {
        let scramble = cubeScrambler.scramble();
        let scrambleStr = scramble.join(" ");
        message.channel.send(scrambleStr);
    },
};
