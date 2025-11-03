import Msg from "../../models/msg.ts";
import type {IrcEventHandler} from "../../client.ts";
import {MessageType} from "../../../shared/types/msg.ts";

export default <IrcEventHandler>function (irc, network) {
	const client = this;

	irc.on("help", function (data) {
		const lobby = network.getLobby();

		if (data.help) {
			const msg = new Msg({
				type: MessageType.MONOSPACE_BLOCK,
				command: "help",
				text: data.help,
			});
			lobby.pushMessage(client, msg, true);
		}
	});
};
