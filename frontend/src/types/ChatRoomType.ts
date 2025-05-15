import { MessageType } from "./MessageType";
import { ParticipantsType } from "./ParticipantType";

export type ChatRoomType = {
    id: number;
    name: string;
    participants: ParticipantsType[];
    lastMessage?: MessageType;
    isGroupChat: boolean;
}

export type CreateChatRoomQueryType = {
    userIds: number[];
    text: string;
}