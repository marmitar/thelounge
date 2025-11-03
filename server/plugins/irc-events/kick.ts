import type {IrcEventHandler} from "../../client.ts";

import Msg from "../../models/msg.ts";
import {MessageType} from "../../../shared/types/msg.ts";
import {ChanState} from "../../../shared/types/chan.ts";

export default <IrcEventHandler>function (irc, network) {
	const client = this;

	irc.on("kick", function (data) {
		const chan = network.getChannel(data.channel!);

		if (typeof chan === "undefined") {
			return;
		}

		const user = chan.getUser(data.kicked!);
		const msg = new Msg({
			type: MessageType.KICK,
			time: data.time,
			from: chan.getUser(data.nick),
			target: user,
			text: data.message || "",
			highlight: data.kicked === irc.user.nick,
			self: data.nick === irc.user.nick,
		});
		chan.pushMessage(client, msg);

		if (data.kicked === irc.user.nick) {
			chan.users = new Map();
			chan.state = ChanState.PARTED;

			client.emit("channel:state", {
				chan: chan.id,
				state: chan.state,
			});
		} else {
			chan.removeUser(user);
		}
	});
};
