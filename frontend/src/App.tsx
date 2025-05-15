import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import ChatLayout from './layouts/ChatLayout'
import ChatArea from './components/ChatArea'
import NewChat from './pages/NewChat'

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/hu";
import "dayjs/locale/en";
import { useTranslation } from 'react-i18next'
import { SocketProvider } from './contexts/SocketContext'
import Registration from './pages/Registration'
import { ChatProvider } from './contexts/ChatContext'

dayjs.extend(relativeTime);

function App() {
  const { i18n } = useTranslation();
  dayjs.locale(i18n.language)

  return (
    <>
      <AuthProvider>
        <SocketProvider>
          <ChatProvider>
            <Routes>
              <Route index path="" element={<Login />}></Route>
              <Route index path="login" element={<Login />}></Route>
              <Route index path="registration" element={<Registration />}></Route>
              <Route element={<ProtectedRoute />}>
                <Route path="c" element={<MainLayout />}>
                  <Route path="chat" element={<ChatLayout />}>
                    <Route path=":roomId" element={<ChatArea />} />
                    <Route path="new" element={<NewChat />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </ChatProvider>
        </SocketProvider>
      </AuthProvider>
    </>
  )
}

export default App
