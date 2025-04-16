import ChatRooms from '../components/ChatRooms'
import { Outlet } from 'react-router'

const ChatLayout = () => {
    return (
        <>
            <ChatRooms />
            <Outlet />
        </>
    )
}

export default ChatLayout