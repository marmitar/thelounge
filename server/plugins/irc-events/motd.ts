import type {IrcEventHandler} from "../../client.ts";

import Msg from "../../models/msg.ts";
import {MessageType} from "../../../shared/types/msg.ts";

export default <IrcEventHandler>function (irc, network) {
	const client = this;

	irc.on("motd", function (data) {
		const lobby = network.getLobby();

		if (data.motd) {
			const msg = new Msg({
				type: MessageType.MONOSPACE_BLOCK,
				command: "motd",
				text: data.motd,
			});
			lobby.pushMessage(client, msg);
		}

		if (data.error) {
			const msg = new Msg({
				type: MessageType.MONOSPACE_BLOCK,
				command: "motd",
				text: data.error,
			});
			lobby.pushMessage(client, msg);
		}
	});
};
