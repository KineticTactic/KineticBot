const math = require("mathjs");

module.exports = {
    name: "evaluate",
    description: "Evaluates a mathematical expression",
    usage: "<expression>",
    args: true,
    category: "knowledge",
    execute(message, args) {
        let exp = args.join(" ");
        let sol = math.evaluate(exp);
        message.channel.send(sol.toString());
    },
};
