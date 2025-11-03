import socket from "../socket.ts";
import {store} from "../store.ts";
import {switchToChannel} from "../router.ts";
import type {ClientChan} from "../types.ts";
import {toClientChan} from "../chan.ts";
import {ChanType} from "../../../shared/types/chan.ts";

socket.on("join", function (data) {
	const network = store.getters.findNetwork(data.network);

	if (!network) {
		return;
	}

	const clientChan: ClientChan = toClientChan(data.chan);
	network.channels.splice(data.index || -1, 0, clientChan);

	// Queries do not automatically focus, unless the user did a whois
	if (data.chan.type === ChanType.QUERY && !data.shouldOpen) {
		return;
	}

	const chan = store.getters.findChannel(data.chan.id);

	if (chan) {
		switchToChannel(chan.channel);
	} else {
		// eslint-disable-next-line no-console
		console.error("Could not find channel", data.chan.id);
	}
});
