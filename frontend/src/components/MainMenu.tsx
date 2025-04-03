import { Button, Dropdown } from 'antd'
import { MenuItemType } from 'antd/es/menu/interface'
import { IoChatbubbleOutline, IoLogInOutline } from 'react-icons/io5'
import { LuUser } from 'react-icons/lu'
import { TbSettings } from 'react-icons/tb'

const MainMenu = () => {
    const userItems: MenuItemType[] = [
        {
            key: "logout",
            icon: <IoLogInOutline size={20} />,
            label: "Logout",
            disabled: false,
            onClick: () => { console.log("logged out") }
        }
    ]

    return (
        <div className="px-3 py-3">
            <ul className="flex flex-col gap-2 h-full">
                <li>
                    <Button icon={<IoChatbubbleOutline size={25} />} type="text" size="large"></Button>
                </li>
                <li>
                    <Button icon={<TbSettings size={25} />} type="text" size="large"></Button>
                </li>
                <li className="mt-auto mb-0">
                    <Dropdown menu={{ items: userItems }} trigger={["click"]}>
                        <Button onClick={(e) => e.preventDefault()} icon={<LuUser size={25} />} type="text" size="large"></Button>
                    </Dropdown>
                </li>
            </ul>
        </div>
    )
}

export default MainMenu