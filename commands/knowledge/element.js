const Discord = require("discord.js");
const math = require("mathjs");
const elements = require("../../data/elements.json")["elements"];

module.exports = {
    name: "element",
    description: "Returns information about the specified element",
    args: true,
    category: "knowledge",
    execute(message, args) {
        let elt = getElementInfo(args[0]);
        if (elt === null) {
            message.channel.send(
                "That is not an element from the periodic table!"
            );
            return;
        }
        const embed = new Discord.MessageEmbed()
            .setColor("#0088ff")
            .setTitle(elt.name)
            .setDescription(`Information about the element ${elt.name}`)
            .addFields(
                {
                    name: "Name",
                    value: `${elt.name} (${elt.symbol})`,
                },
                {
                    name: "Category",
                    value: titleCase(elt.category),
                },
                { name: "Atomic Number", value: elt.number },
                { name: "Atomic Mass", value: elt.atomic_mass },
                {
                    name: "Electronic Configuration",
                    value: `\`${elt.electron_configuration_semantic}\``,
                },
                { name: "Density", value: elt.density },
                { name: "Discovered by", value: elt.discovered_by }
            );
        message.channel.send(embed);
    },
};

function getElementInfo(element) {
    for (let elt of elements) {
        if (elt.name.toLowerCase() === element) {
            return elt;
        }
    }
    return null;
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
}
