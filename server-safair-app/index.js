const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", (socket) => {
    socket.on("sendLocation", (data) => {
        console.log(data);
        io.emit("location", data);
    });
});

server.listen(3001, () => {
	console.log("listening on *:3001");
});
