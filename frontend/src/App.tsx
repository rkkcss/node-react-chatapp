import { Route, Routes } from 'react-router'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import ChatLayout from './layouts/ChatLayout'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route index path="" element={<Login />}></Route>
          <Route index path="login" element={<Login />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<ChatLayout />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
