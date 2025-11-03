import {SharedChan} from "../../shared/types/chan";
import {SharedNetwork} from "../../shared/types/network";
import {SharedUser} from "../../shared/types/user";
import {SharedMention} from "../../shared/types/mention";
import {LinkPreview, SharedMsg} from "../../shared/types/msg";

export interface LoungeWindow extends Window {
	g_TheLoungeRemoveLoading?: () => void;
}

export type ClientUser = SharedUser;

// we will eventually need to put client specific fields here
// which are not shared with the server
export type ClientMessage = SharedMsg;

export type ClientChan = Omit<SharedChan, "messages"> & {
	moreHistoryAvailable: boolean;
	editTopic: boolean;
	messages: ClientMessage[];

	// these are added in store/initChannel
	pendingMessage: string;
	inputHistoryPosition: number;
	inputHistory: string[];
	historyLoading: boolean;
	scrolledToBottom: boolean;
	usersOutdated: boolean;

	users: ClientUser[];
};

export type InitClientChan = ClientChan & {
	// total messages is deleted after its use when init event is sent/handled
	totalMessages?: number;
};

// We omit channels so we can use ClientChan[] instead of Chan[]
export type ClientNetwork = Omit<SharedNetwork, "channels"> & {
	isJoinChannelShown: boolean;
	isCollapsed: boolean;
	channels: ClientChan[];
};

export type NetChan = {
	channel: ClientChan;
	network: ClientNetwork;
};

export type ClientMention = SharedMention & {
	localetime: string; // TODO: this needs to go the way of the dodo, nothing but a single component uses it
	channel: NetChan | null;
};

export type ClientLinkPreview = LinkPreview & {
	sourceLoaded?: boolean;
};

export interface BeforeInstallPromptEvent extends Event {
	/**
	 * Returns an array of DOMString items containing the platforms on which the event was dispatched.
	 * This is provided for user agents that want to present a choice of versions to the user such as,
	 * for example, "web" or "play" which would allow the user to chose between a web version or
	 * an Android version.
	 */
	readonly platforms: Array<string>;

	/**
	 * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
	 */
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed";
		platform: string;
	}>;

	/**
	 * Allows a developer to show the install prompt at a time of their own choosing.
	 * This method returns a Promise.
	 */
	prompt(): Promise<void>;
}
