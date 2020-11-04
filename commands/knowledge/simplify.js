const math = require("mathjs");

module.exports = {
    name: "simplify",
    description: "Simplifies a mathematical expression",
    args: true,
    category: "knowledge",
    execute(message, args) {
        let expression = args.join(" ");
        let solution = math.simplify(expression);
        console.log(solution);
        message.channel.send(solution.toString());
    },
};
