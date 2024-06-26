const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("page");
});

io.on("connection", (socket) => {
	console.log("A user connected");

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

module.exports = io;

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
