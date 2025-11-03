import Msg from "../../models/msg.ts";
import type {IrcEventHandler} from "../../client.ts";
import {MessageType} from "../../../shared/types/msg.ts";

export default <IrcEventHandler>function (irc, network) {
	const client = this;

	irc.on("info", function (data) {
		const lobby = network.getLobby();

		if (data.info) {
			const msg = new Msg({
				type: MessageType.MONOSPACE_BLOCK,
				command: "info",
				text: data.info,
			});
			lobby.pushMessage(client, msg, true);
		}
	});
};
