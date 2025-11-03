import type {IrcEventHandler} from "../../client.ts";

import Msg from "../../models/msg.ts";
import {MessageType} from "../../../shared/types/msg.ts";

export default <IrcEventHandler>function (irc, network) {
	const client = this;

	irc.on("loggedin", (data) => {
		const lobby = network.getLobby();

		const msg = new Msg({
			type: MessageType.LOGIN,
			text: "Logged in as: " + data.account,
		});
		lobby.pushMessage(client, msg, true);
	});

	irc.on("loggedout", () => {
		const lobby = network.getLobby();

		const msg = new Msg({
			type: MessageType.LOGOUT,
			text: "Logged out",
		});
		lobby.pushMessage(client, msg, true);
	});
};
