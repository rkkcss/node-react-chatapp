import React from 'react'
import ChatRooms from '../components/ChatRooms'
import { Outlet } from 'react-router'

type Props = {}

const ChatLayout = (props: Props) => {
    return (
        <>
            <ChatRooms />
            <Outlet />
        </>
    )
}

export default ChatLayout