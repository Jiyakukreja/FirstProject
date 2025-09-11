import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/UserContext.jsx';
import CaptainProvider from './context/CaptainContext.jsx';
import SocketProvider from './context/SocketContext.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <UserProvider>
      <CaptainProvider>   
        <SocketProvider>  
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </CaptainProvider>
    </UserProvider>
  </StrictMode>
);
