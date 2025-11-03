import type {MessageType, UserInMessage} from "./msg.ts";

export type SharedMention = {
	chanId: number;
	msgId: number;
	type: MessageType;
	time: Date;
	text: string;
	from: UserInMessage;
};
