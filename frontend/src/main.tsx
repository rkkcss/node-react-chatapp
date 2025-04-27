import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ConfigProvider } from 'antd'
import "./i18n.ts";
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeight: 32,
            paddingContentHorizontal: 18,
            fontWeight: '600',
            fontSize: 15
          }
        },
        token: {
          borderRadius: 6,
          colorPrimary: "#1436e1"
        }
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
)
