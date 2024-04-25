document.addEventListener("DOMContentLoaded", () => {
	const socket = io();

	const content = document.getElementById("content");
	const nameInput = document.getElementById("name");
	const messageInput = document.getElementById("field");
	const sendButton = document.getElementById("send");

	sendButton.addEventListener("click", () => {
		const name = nameInput.value.trim();
		const message = messageInput.value.trim();

		if (name !== "" && message !== "") {
			socket.emit("chat message", `${name}: ${message}`);
			messageInput.value = "";
		}
	});

	socket.on("chat message", (msg) => {
		const newMessage = document.createElement("div");
		newMessage.textContent = msg;
		content.appendChild(newMessage);
	});
});
