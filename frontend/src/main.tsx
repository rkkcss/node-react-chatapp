import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ConfigProvider } from 'antd'
import "./i18n.ts";

const SERVER_URL = import.meta.env.VITE_GRAPHQL_URL;

export const client = new ApolloClient({
  uri: SERVER_URL, // server URL here
  cache: new InMemoryCache(),
  credentials: "include",
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  </StrictMode>,
)
