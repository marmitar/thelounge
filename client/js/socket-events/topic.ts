import socket from "../socket.ts";
import {store} from "../store.ts";

socket.on("topic", function (data) {
	const channel = store.getters.findChannel(data.chan);

	if (channel) {
		channel.channel.topic = data.topic;
	}
});
