import { ChatRoomType } from "./ChatRoomType";
import { UserType } from "./UserType";


export type Participants = {
    id: string;
    user: UserType;
    chat: ChatRoomType;
}