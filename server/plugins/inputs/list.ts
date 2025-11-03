import type {PluginInputHandler} from "./index.ts";

const commands = ["list"];

const input: PluginInputHandler = function (network, chan, cmd, args) {
	network.chanCache = [];
	network.irc.list(...args);
	return true;
};

export default {
	commands,
	input,
};
