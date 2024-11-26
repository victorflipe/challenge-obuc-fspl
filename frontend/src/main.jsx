import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Auth0Provider
      domain=''
      clientId=''
      authorizationParams={{ redirect_uri: window.location.origin }}>
    </Auth0Provider> */}
      <App />
  </StrictMode>,
)
