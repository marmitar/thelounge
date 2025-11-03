import socket from "../socket.ts";
import {store} from "../store.ts";
import {ChanType} from "../../../shared/types/chan.ts";

socket.on("mute:changed", (response) => {
	const {target, status} = response;

	const netChan = store.getters.findChannel(target);

	if (netChan?.channel.type === ChanType.LOBBY) {
		for (const chan of netChan.network.channels) {
			if (chan.type !== ChanType.SPECIAL) {
				chan.muted = status;
			}
		}
	} else if (netChan) {
		netChan.channel.muted = status;
	}
});
