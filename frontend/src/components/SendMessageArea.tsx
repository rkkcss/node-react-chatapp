import { Button, Input } from 'antd'
import { KeyboardEvent, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { useSocket } from '../contexts/SocketContext'

type SendMessageAreaProps = {
    roomId: number

}

const SendMessageArea = ({ roomId }: SendMessageAreaProps) => {
    const [message, setMessage] = useState<string>("");
    const { socket } = useSocket();

    const handleSendMessage = (e?: KeyboardEvent) => {
        if (e?.key !== "Enter" || message === "") {
            return
        }

        if (socket) {
            socket.send(`/app/chat.sendMessage/${roomId}`, JSON.stringify({ text: message }));
        }
        setMessage("");
    }


    return (
        <>
            <Input placeholder="Aa..." className="!rounded-4xl" value={message}
                onKeyDown={(e: KeyboardEvent) => handleSendMessage(e)}
                onChange={(e) => { setMessage(e.target.value) }}
            />
            <Button icon={<FiSend />} shape="round" type="text" onClick={() => handleSendMessage()} />
        </>
    )
}

export default SendMessageArea