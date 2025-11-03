import socket from "../socket.ts";
import {store} from "../store.ts";

socket.on("names", function (data) {
	const netChan = store.getters.findChannel(data.id);

	if (netChan) {
		netChan.channel.users = data.users;
	}
});
