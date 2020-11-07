module.exports = {
    name: "ping",
    description: "Ping!",
    usage: "",
    args: false,
    category: "utility",
    execute(message) {
        message.channel.send(
            `Latency is ${
                Date.now() - message.createdTimestamp
            }ms | API Latency is ${Math.round(message.client.ws.ping)}`
        );
    },
};
