import { ChatRoomType } from "./ChatRoomType"
import { UserType } from "./UserType"

export type MessageType = {
    id: number,
    text: string,
    createdAt: string,
    sender: UserType
    chat: ChatRoomType
} 