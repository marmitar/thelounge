import type {PluginInputHandler} from "./index.ts";

import Msg from "../../models/msg.ts";
import {MessageType} from "../../../shared/types/msg.ts";
import {ChanType} from "../../../shared/types/chan.ts";

const commands = ["cycle", "rejoin"];

const input: PluginInputHandler = function ({irc}, chan) {
	if (chan.type !== ChanType.CHANNEL) {
		chan.pushMessage(
			this,
			new Msg({
				type: MessageType.ERROR,
				text: "You can only rejoin channels.",
			})
		);
		return;
	}

	irc.part(chan.name, "Rejoining");
	irc.join(chan.name);

	return true;
};

export default {
	commands,
	input,
};
