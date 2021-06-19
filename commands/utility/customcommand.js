const versions = require("./allversions.json");

module.exports = {
    name: "customcommand",
    description: "Ping!",
    usage: "",
    args: false,
    category: "utility",
    execute(message) {
        const guild = message.guild;
        for (let version of versions) {
            // guild.channels
            //     .create(`Version: ${version.split().join("-")}`)
            //     .then((channel) => {
            //         let category = guild.channels.cache.find(
            //             (c) => c.name === "Minecraft" && c.type === "category"
            //         );

            //         if (!category) throw new Error("Category channel does not exist");
            //         channel.setParent(category.id);
            //     })
            //     .catch(console.error);
            message.channel.send(`Created Channel ${version.split(".").join("-")}`);
        }
    },
};
