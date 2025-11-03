import socket from "../socket.ts";
import {store} from "../store.ts";

socket.on("users", function (data) {
	if (store.state.activeChannel && store.state.activeChannel.channel.id === data.chan) {
		return socket.emit("names", {
			target: data.chan,
		});
	}

	const channel = store.getters.findChannel(data.chan);

	if (channel) {
		channel.channel.usersOutdated = true;
	}
});
