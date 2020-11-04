module.exports = {
    name: "ping",
    description: "Ping!",
    args: false,
    category: "utility",
    execute(message, args) {
        message.channel.send(
            `Latency is ${
                Date.now() - message.createdTimestamp
            }ms | API Latency is ${Math.round(message.client.ws.ping)}`
        );
    },
};
