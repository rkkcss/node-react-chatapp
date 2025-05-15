import { Alert, Button, Form, Input, Modal, notification } from 'antd'
import { useEffect } from 'react'
import { updateChatRoomNameQuery } from '../../queries/ChatRoomQueries'
import { useParams } from 'react-router'
import { useChat } from '../../contexts/ChatContext'

type ChatNameChangeModalProps = {
    open: boolean
    onClose: () => void
    chatName: string
}

const ChatNameChangeModal = ({ chatName, open, onClose }: ChatNameChangeModalProps) => {
    const { roomId } = useParams();
    const [form] = Form.useForm();
    const { setChatRoomName } = useChat();

    const handleSubmit = (values: { name: string }) => {
        updateChatRoomNameQuery(Number(roomId), values.name)
            .then((res) => {
                setChatRoomName(Number(roomId), res.data.name);
                notification.success({ message: "Chat neve sikeresen megváltoztatva", placement: "bottom" });
            })
    }

    useEffect(() => {
        if (open) {
            form.setFieldsValue({ name: chatName });
        }
    }, [chatName, open, form]);

    return (
        <Modal open={open} onCancel={onClose} title={"Chat nevének megváltoztatása"} footer={null} >

            <Alert message="A csoportos chat nevének megváltoztatásával mindenki számára megváltozik a név." type="info" showIcon className="!my-3" />
            <Form layout="vertical"
                onFinish={handleSubmit}
                form={form}
            >
                <Form.Item label="Chat neve" name="name">
                    <Input size="large"
                        type="text"
                        defaultValue={chatName}
                        className="border border-alto-200 rounded-lg p-2 w-full"
                    />
                </Form.Item>
                <div className="flex gap-2">
                    <Button htmlType="submit" type="primary">
                        Mentés
                    </Button>
                    <Button htmlType="button" type="default">
                        Mégsem
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default ChatNameChangeModal