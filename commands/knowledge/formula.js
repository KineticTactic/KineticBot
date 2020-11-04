const formulas = require("../../data/formulas.json");

module.exports = {
    name: "formula",
    description: "Returns the formula of the specified theory",
    args: true,
    category: "knowledge",
    execute(message, args) {
        message.channel.send(formulas[args[0]]);
    },
};
