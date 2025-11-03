import socket from "../socket.ts";
import {store} from "../store.ts";
import {switchToChannel} from "../router.ts";

socket.on("msg:special", function (data) {
	const netChan = store.getters.findChannel(data.chan);

	if (!netChan) {
		return;
	}

	netChan.channel.data = data.data;
	switchToChannel(netChan.channel);
});
