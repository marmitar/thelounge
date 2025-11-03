import constants from "../constants.ts";
import socket from "../socket.ts";

socket.on("commands", function (commands) {
	if (commands) {
		constants.commands = commands;
	}
});
