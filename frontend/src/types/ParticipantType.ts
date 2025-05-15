import { ChatRoomType } from "./ChatRoomType";
import { UserType } from "./UserType";


export type ParticipantsType = {
    id: string;
    user: UserType;
    chat: ChatRoomType;
    unreadMessageCount: number;
    isAdmin: boolean;
}