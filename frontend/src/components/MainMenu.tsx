import { Button, Dropdown, message } from 'antd'
import { MenuItemType } from 'antd/es/menu/interface'
import { IoChatbubbleOutline, IoLogInOutline } from 'react-icons/io5'
import { LuUser } from 'react-icons/lu'
import { TbSettings } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

type SidebarItem = {
    label: string;
    key: string;
    icon: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    className?: string;
};

const MainMenu = () => {
    const { logout } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const userItems: MenuItemType[] = [
        {
            key: "logout",
            icon: <IoLogInOutline size={20} />,
            label: "Logout",
            disabled: false,
            onClick: () => { logout() },
            className: ``
        }
    ]

    const menuItems: SidebarItem[] = [
        {
            label: "",
            key: "chat",
            icon: <IoChatbubbleOutline size={25} className="!text-neutral-900" />,
            onClick: () => navigate("/c/chat"),
            className: location.pathname.includes("/c/chat") ? "bg-gray-200 rounded-lg outline outline-1 outline-gray-300" : ""
        },
        {
            label: "",
            icon: <TbSettings size={25} className="!text-neutral-900" />,
            key: "settings",
            onClick: () => message.info("Settings coming soon!"),
            className: location.pathname.includes("/c/settings") ? "bg-neutral-200 rounded-lg" : "",
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