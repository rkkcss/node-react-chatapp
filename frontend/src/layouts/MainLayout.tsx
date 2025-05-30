import MainMenu from '../components/MainMenu'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <div className="flex h-dvh bg-gray-100 gap-4">
            <MainMenu />
            <Outlet />
        </div>
    )
}

export default MainLayout