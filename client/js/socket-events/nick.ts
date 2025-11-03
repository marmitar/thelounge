import socket from "../socket.ts";
import {store} from "../store.ts";

socket.on("nick", function (data) {
	const network = store.getters.findNetwork(data.network);

	if (network) {
		network.nick = data.nick;
	}
});
