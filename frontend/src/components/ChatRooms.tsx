import { Input } from 'antd'
import { TbZoom } from 'react-icons/tb'
import ChatRoom from './ChatRoom'

const ChatRooms = () => {
    return (
        <div className="my-4 max-w-[480px] min-w-[300px] rounded-xl border border-alto-200 flex flex-col bg-white">
            <div className="p-3">
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Beszélgetések</h2>
                <Input placeholder="Keresés a beszélgetések között..." prefix={<TbZoom />} />
            </div>
            <div className="mt-4 overflow-y-auto overscroll-contain h-full pl-2.5 pr-1">

                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
                <ChatRoom />
            </div>
        </div>
    )
}

export default ChatRooms