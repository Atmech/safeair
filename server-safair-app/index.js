const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
    socket.on("sendLocation", (data) => {
        console.log(data);
        io.emit("location", data);
    });
});

server.listen(80, () => {
	console.log("listening on *:80");
});
