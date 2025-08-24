import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/Store'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = "dev-3be6tswb5p4jq5un.us.auth0.com"
const clientId = "YQD07GjgnpuM1mSgj26pFPrmDAIFqMIf"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{ redirect_uri: window.location.origin }}
        >
          <App />
        </Auth0Provider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)







