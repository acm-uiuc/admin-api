import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PublicClientApplication, EventType } from '@azure/msal-browser';

import { msalConfig, loginRequest } from './authConfig.js';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.addEventCallback((event) => { if (event.eventType === EventType.SSO_SILENT_FAILURE && event.error?.errorCode === 'monitor_window_timeout') { msalInstance.acquireTokenRedirect({ ...loginRequest, }); } });

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Optional - This will update account state if a user signs in from another tab or window
msalInstance.enableAccountStorageEvents();

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

if (!msalInstance.getActiveAccount()) {
    await msalInstance.initialize();
    msalInstance.loginPopup(loginRequest).then(response => {
        root.render(
            <BrowserRouter>
                <App instance={msalInstance} />
            </BrowserRouter>
        );
    });
} else {
    root.render(
        <BrowserRouter>
            <App instance={msalInstance} />
        </BrowserRouter>
    );
}