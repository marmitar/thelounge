import socket from "../socket.ts";
import {store} from "../store.ts";
import type {ClientMention} from "../types.ts";
import type {SharedMention} from "../../../shared/types/mention.ts";

socket.on("mentions:list", function (data) {
	store.commit("mentions", data.map(sharedToClientMention));
});

function sharedToClientMention(shared: SharedMention): ClientMention {
	const mention: ClientMention = {
		...shared,
		localetime: "", // TODO: can't be right
		channel: null,
	};
	return mention;
}
