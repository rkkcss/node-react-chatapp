import { ChatRoom } from "./ChatRoomType";
import { User } from "./UserType";

export type Participants = {
    id: string;
    user: User;
    chat: ChatRoom;
}