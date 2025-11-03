import type {SharedMention} from "./mention.ts";
import type {ChanState, SharedChan} from "./chan.ts";
import type {SharedNetwork, SharedServerOptions, SharedNetworkChan} from "./network.ts";
import type {SharedMsg, LinkPreview} from "./msg.ts";
import type {SharedUser} from "./user.ts";
import type {SharedChangelogData} from "./changelog.ts";
import type {SharedConfiguration, LockedSharedConfiguration} from "./config.ts";
import type {SearchResponse, SearchQuery} from "./storage.ts";

export type Session = {
	current: boolean;
	active: number;
	lastUse: number;
	ip: string;
	agent: string;
	token: string;
};

export type EventHandler<T> = (data: T) => void;
export type NoPayloadEventHandler = EventHandler<void>;

export interface ServerToClientEvents {
	"auth:start": (serverHash: number) => void;
	"auth:failed": NoPayloadEventHandler;
	"auth:success": NoPayloadEventHandler;

	"upload:auth": (token: string) => void;

	changelog: EventHandler<SharedChangelogData>;
	"changelog:newversion": NoPayloadEventHandler;

	"channel:state": EventHandler<{chan: number; state: ChanState}>;

	"change-password": EventHandler<{success: boolean; error?: any}>;

	commands: EventHandler<string[]>;

	configuration: EventHandler<SharedConfiguration | LockedSharedConfiguration>;

	"push:issubscribed": EventHandler<boolean>;
	"push:unregister": NoPayloadEventHandler;

	"sessions:list": EventHandler<Session[]>;

	"mentions:list": EventHandler<SharedMention[]>;

	"setting:new": EventHandler<{name: string; value: any}>;
	"setting:all": EventHandler<{[key: string]: any}>;

	"history:clear": EventHandler<{target: number}>;

	"mute:changed": EventHandler<{target: number; status: boolean}>;

	names: EventHandler<{id: number; users: SharedUser[]}>;

	network: EventHandler<{network: SharedNetwork}>;
	"network:options": EventHandler<{network: string; serverOptions: SharedServerOptions}>;
	"network:status": EventHandler<{network: string; connected: boolean; secure: boolean}>;
	"network:info": EventHandler<{uuid: string}>;
	"network:name": EventHandler<{uuid: string; name: string}>;

	nick: EventHandler<{network: string; nick: string}>;

	open: (id: number) => void;

	part: EventHandler<{chan: number}>;

	"sign-out": NoPayloadEventHandler;

	"sync_sort:networks": EventHandler<{order: SharedNetwork["uuid"][]}>;
	"sync_sort:channels": EventHandler<{
		network: SharedNetwork["uuid"];
		order: SharedChan["id"][];
	}>;

	topic: EventHandler<{chan: number; topic: string}>;

	users: EventHandler<{chan: number}>;

	more: EventHandler<{chan: number; messages: SharedMsg[]; totalMessages: number}>;

	"msg:preview": EventHandler<{id: number; chan: number; preview: LinkPreview}>;
	"msg:special": EventHandler<{chan: number; data?: Record<string, any>}>;
	msg: EventHandler<{msg: SharedMsg; chan: number; highlight?: number; unread?: number}>;

	init: EventHandler<{active: number; networks: SharedNetwork[]; token?: string}>;

	"search:results": (response: SearchResponse) => void;

	quit: EventHandler<{network: string}>;

	error: (error: any) => void;

	connecting: NoPayloadEventHandler;

	join: EventHandler<{
		shouldOpen: boolean;
		index: number;
		network: string;
		chan: SharedNetworkChan;
	}>;
}

export type AuthPerformData =
	| Record<string, never> // funny way of saying an empty object
	| {user: string; password: string}
	| {
			user: string;
			token: string;
			lastMessage: number;
			openChannel: number | null;
			hasConfig: boolean;
	  };

export type ClientPushSubscription = {
	endpoint?: string;
	keys?: {
		p256dh?: string;
		auth?: string;
	};
};

export interface ClientToServerEvents {
	"auth:perform": EventHandler<AuthPerformData>;

	changelog: NoPayloadEventHandler;

	"change-password": EventHandler<{
		old_password: string;
		new_password: string;
		verify_password: string;
	}>;

	open: (channelId: number) => void;

	names: EventHandler<{target: number}>;

	input: EventHandler<{target: number; text: string}>;

	"upload:auth": NoPayloadEventHandler;
	"upload:ping": (token: string) => void;

	"mute:change": EventHandler<{target: number; setMutedTo: boolean}>;

	"push:register": EventHandler<ClientPushSubscription>;
	"push:unregister": NoPayloadEventHandler;

	"setting:get": NoPayloadEventHandler;
	"setting:set": EventHandler<{name: string; value: any}>;

	"sessions:get": NoPayloadEventHandler;

	"sort:networks": EventHandler<{order: SharedNetwork["uuid"][]}>;
	"sort:channels": EventHandler<{
		network: SharedNetwork["uuid"];
		order: SharedChan["id"][];
	}>;

	"mentions:dismiss": (msgId: number) => void;
	"mentions:dismiss_all": NoPayloadEventHandler;
	"mentions:get": NoPayloadEventHandler;

	more: EventHandler<{target: number; lastId: number; condensed: boolean}>;

	"msg:preview:toggle": EventHandler<{
		target: number;
		messageIds?: number[];
		msgId?: number;
		shown?: boolean | null;
		link?: string;
	}>;

	"network:get": (uuid: string) => void;
	// TODO typing
	"network:edit": (data: Record<string, any>) => void;
	"network:new": (data: Record<string, any>) => void;

	"sign-out": (token?: string) => void;

	"history:clear": EventHandler<{target: number}>;

	search: EventHandler<SearchQuery>;
}

export interface InterServerEvents {
	[EventName: string]: never;
}

export interface SocketData {
	[_: string]: never;
}
