const Discord = require("discord.js");
const Canvas = require("canvas");

const X = 1;
const O = 2;

let boards = new Map();

module.exports = {
    name: "tictactoe",
    description: "Play TicTacToe!",
    usage: "",
    args: false,
    category: "fun",
    execute: async (message) => {
        if (boards.has(message.author)) {
            message.channel.send("You are currently playing a game!");
        } else {
            boards.set(message.author, [0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }

        const canvas = Canvas.createCanvas(100, 100);
        const ctx = canvas.getContext("2d");

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawBoard(canvas, boards.get(message.author));

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "tictactoe.png");

        await message.channel.send(attachment);
        message.channel.send("Enter your move:");

        const collector = new Discord.MessageCollector(
            message.channel,
            (m) => m.author.id === message.author.id,
            {}
        );

        collector.on("collect", async (msg) => {
            const board = boards.get(msg.author);

            board[parseInt(msg.content) - 1] = X;
            makeMove(board);

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawBoard(canvas, board);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "tictactoe.png");

            await msg.channel.send(attachment);
            msg.channel.send("Enter your move:");
        });
    },
};

function makeMove(board) {
    board[2] = O;
}

function drawBoard(canvas, board) {
    const ctx = canvas.getContext("2d");
    drawLine(ctx, canvas.width / 3, 0, canvas.width / 3, canvas.height);
    drawLine(ctx, (canvas.width / 3) * 2, 0, (canvas.width / 3) * 2, canvas.height);
    drawLine(ctx, 0, canvas.height / 3, canvas.width, canvas.height / 3);
    drawLine(ctx, 0, (canvas.height / 3) * 2, canvas.width, (canvas.height / 3) * 2);

    // text setup
    ctx.fillStyle = "#ffffff";
    ctx.font = "15px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // numbers
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + j * 3] === X) {
                drawX(ctx, (canvas.width / 6) * (i * 2 + 1), (canvas.height / 6) * (j * 2 + 1));
            } else if (board[i + j * 3] === Y) {
                drawO(ctx, (canvas.width / 6) * (i * 2 + 1), (canvas.height / 6) * (j * 2 + 1));
            } else {
                ctx.fillText(
                    i + j * 3 + 1,
                    (canvas.width / 6) * (i * 2 + 1),
                    (canvas.height / 6) * (j * 2 + 1)
                );
            }
        }
    }
}

function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
}

function drawX(ctx, x, y) {
    const size = 10;

    ctx.strokeStyle = "#22aaff";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.moveTo(x - size, y + size);
    ctx.lineTo(x + size, y - size);
    ctx.stroke();
}

function drawO(ctx, x, y) {
    const size = 10;

    ctx.strokeStyle = "#22aaff";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.stroke();
}
