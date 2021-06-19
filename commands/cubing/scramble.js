const Cube = require("cubejs");
const Discord = require("discord.js");

Cube.initSolver();

module.exports = {
    name: "scramble",
    description: "Creates a scramble sequence for a 3x3",
    usage: "",
    args: false,
    category: "cubing",
    execute(message) {
        let cube = Cube.random();
        let scramble = Cube.inverse(cube.solve());
        let s = scramble.replace(/\s+/g, "");
        let url = "http://cube.rider.biz/visualcube.png?size=150&alg=" + s;

        console.log(url);

        const embed = new Discord.MessageEmbed()
            .setColor("0088ff")
            .setTitle("3x3 Scramble")
            .addFields({ name: "Scramble", value: scramble })
            .setImage(url)
            .setTimestamp();

        message.channel.send(embed);
    },
};
