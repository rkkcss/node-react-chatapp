import { Avatar, Button, Form, message, Select } from "antd"
import { useMemo, useState } from "react";
import { UserType } from "../types/UserType";
import debounce from 'lodash.debounce';
import { searchInUsersQuery } from "../queries/UserQueries";
import { createChatRoomQuery, searchChatRoomsByUserIdsQuery } from "../queries/ChatRoomQueries";
import { ChatRoomType } from "../types/ChatRoomType";
import TextArea from "antd/es/input/TextArea";
import { NavLink, useNavigate } from "react-router";
import { useChat } from "../contexts/ChatContext";

const NewChat = () => {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserType[]>([]);
    const [existingChatRoom, setExistingChatRoom] = useState<ChatRoomType | null>(null);
    const { addChat } = useChat();

    const debouncedSearch = useMemo(() => debounce((value: string) => {
        if (value) {
            searchInUsersQuery(value)
                .then((res) => {
                    setUsers(res.data);
                });
        }
    }, 300), []);

    const handleSearch = (value: string) => {
        debouncedSearch(value);
    };


    const handleChange = (value: string[]) => {
        setExistingChatRoom(null);
        setSelectedUsers(value);
        if (value.length === 0) return

        searchChatRoomsByUserIdsQuery(value.map(Number))
            .then((res) => {
                if (res.status === 200 && res.data != "") {
                    setExistingChatRoom(res.data);
                }
            });
    };

    const options = (users || []).map((user: UserType) => ({
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Avatar size="small" src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.firstName} ${user.lastName}`} />
                <span>{user.firstName} {user.lastName}</span>
            </div>
        ),
        value: user.id,
    }));

    const handleCreateChat = (data: { text: string }) => {
        if (selectedUsers.length === 0) return
        createChatRoomQuery({ text: data.text, userIds: selectedUsers.map(Number) })
            .then(res => {
                if (res.status === 201) {
                    message.success("Sikeresen létrehoztad a beszélgetést!");
                    addChat(res.data);

                    navigate(`/c/chat/${res.data.id}`);
                }
            })

    }

    return (

        <div className="my-4 p-3 rounded-xl flex-col bg-white mx-4 w-full shadow-md">

            <h1 className="text-2xl text-alto-950 font-bold">Új üzenet</h1>
            <p className="text-sm text-alto-700">Keresd meg a barátaidat és kezdj el beszélgetni!</p>

            <div className="flex flex-col gap-2 mt-4">
                <Select
                    mode="multiple"
                    showSearch
                    placeholder="Válaszd ki a felhasználót"
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={handleChange}
                    value={selectedUsers}
                    options={options}
                    style={{ width: '100%' }}
                    autoClearSearchValue={false}
                    dropdownRender={(menu) => (
                        <>
                            {menu}
                        </>
                    )}
                />
            </div>
            <div>
                {
                    existingChatRoom ? (
                        <>
                            <p className="text-sm text-alto-700 mt-6">Meglévő beszélgetés:</p>
                            <div className="flex items-center gap-2 mt-2">
                                <NavLink className="hover:bg-alto-50 p-2 rounded-lg flex items-center gap-2 w-full justify-start" to={`/c/chat/${existingChatRoom.id}`}>
                                    <Avatar size="small" src={`https://api.dicebear.com/9.x/initials/svg?seed=${existingChatRoom.name}`} />
                                    <span>{existingChatRoom.name}</span>
                                    <Button type="text" className="mr-0 ml-auto">Megnyitás</Button>
                                </NavLink>
                            </div>
                        </>
                    ) :
                        selectedUsers.length > 0 &&
                        <Form layout="vertical" onFinish={handleCreateChat} className="!mt-6">
                            <Form.Item name="text" label={<span className="text-alto-800">Irj üzenetet</span>} >
                                <TextArea placeholder="Aa" rows={2} />
                            </Form.Item>
                            <Button htmlType="submit" type="primary" className="mt-4" >
                                Beszélgetés indítása
                            </Button>
                        </Form>
                }
            </div>
            <div>
                {/* <TextArea placeholder="Aa" rows={2} />
                <Button type="primary" className="mt-4" onClick={() => { }}>
                    Beszélgetés indítása
                </Button> */}
            </div>
        </div>
    )
}

export default NewChat