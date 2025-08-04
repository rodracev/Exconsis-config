// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
    if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
            event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
            event.eventType === EventType.SSO_SILENT_SUCCESS) &&
        event.payload?.account
    ) {
        msalInstance.setActiveAccount(event.payload.account);
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MsalProvider>
    </React.StrictMode>
);

export { msalInstance };