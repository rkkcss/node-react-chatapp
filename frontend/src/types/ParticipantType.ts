import { ChatRoomType } from "./ChatRoomType";
import { MessageType } from "./MessageType";
import { UserType } from "./UserType";


export type ParticipantsType = {
    id: number;
    user: UserType;
    chat: ChatRoomType;
    unreadMessageCount: number;
    isAdmin: boolean;
    lastSeenMessage: MessageType | null;
}