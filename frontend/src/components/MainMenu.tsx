import { Button, Dropdown } from 'antd'
import { MenuItemType } from 'antd/es/menu/interface'
import { IoChatbubbleOutline, IoLogInOutline } from 'react-icons/io5'
import { LuUser } from 'react-icons/lu'
import { TbSettings } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router'

const MainMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.pathname.split('/'))
    const userItems: MenuItemType[] = [
        {
            key: "logout",
            icon: <IoLogInOutline size={20} />,
            label: "Logout",
            disabled: false,
            onClick: () => { console.log("logged out") },
            className: ``
        }
    ]

    const menuItems: MenuItemType[] = [
        {
            label: "",
            key: "chat",
            icon: <IoChatbubbleOutline size={25} />,
            onClick: () => navigate("/c/chat"),
            className: location.pathname.includes("/c/chat") ? "bg-gray-300 rounded-lg" : ""
        },
        {
            label: "",
            icon: <TbSettings size={25} />,
            key: "settings",
            onClick: () => navigate("/c/settings"),
            className: location.pathname.includes("/c/settings") ? "bg-alto-200 rounded-lg" : ""
        }
    ]

    return (
        <div className="px-3 py-3">
            <ul className="flex flex-col gap-2 h-full">
                {
                    menuItems.map((item, index) => (
                        <li key={index} className={item.className}>
                            <Button icon={item.icon} type="text" size="large" onClick={item.onClick} />
                        </li>
                    ))
                }
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