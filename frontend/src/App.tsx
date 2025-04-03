import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import MainLayout from './layouts/MainLayout'
import ChatLayout from './layouts/ChatLayout'
import ChatArea from './components/ChatArea'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route index path="" element={<Login />}></Route>
          <Route index path="login" element={<Login />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="c" element={<MainLayout />}>
              <Route path="chat" element={<ChatLayout />}>
                <Route path=":room" element={<ChatArea />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
