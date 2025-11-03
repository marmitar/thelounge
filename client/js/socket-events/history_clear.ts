import socket from "../socket.ts";
import {store} from "../store.ts";

socket.on("history:clear", function (data) {
	const netChan = store.getters.findChannel(data.target);

	if (netChan?.channel) {
		netChan.channel.messages = [];
		netChan.channel.unread = 0;
		netChan.channel.highlight = 0;
		netChan.channel.firstUnread = 0;
		netChan.channel.moreHistoryAvailable = false;
	}
});
