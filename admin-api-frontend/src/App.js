import "./App.css";
import GetUserInfoForm from "./components/GetUserInfoForm/index.tsx";
import AddRolesForm from "./components/AddRolesForm/index.tsx";
import RemoveRolesForm from "./components/RemoveRolesForm/index.tsx";
import CreateUserForm from "./components/CreateUserForm/index.tsx";
import DeleteUserForm from "./components/DeleteUserForm/index.tsx";
import { MsalProvider } from '@azure/msal-react';
import { NextUIProvider } from "@nextui-org/react";
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { EventType, InteractionType } from '@azure/msal-browser';
import { loginRequest } from "./authConfig";


const App = ({ instance }) => {
  const authRequest = {
    ...loginRequest,
  };
  let acct = instance.getActiveAccount();
  if (!acct) {
    console.error("Ah fuck!")
    return null;
  }
  instance.addEventCallback((event) => { if (event.eventType === EventType.SSO_SILENT_FAILURE && event.error?.errorCode === 'monitor_window_timeout') { instance.acquireTokenRedirect({ ...loginRequest, }); } });
  console.log(acct);
  return (
    <MsalProvider instance={instance}>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={authRequest}>
        <NextUIProvider>
          <div className="App">
            <header className="App-header">
              <p>ACM Admin API</p>
              <p>Welcome {acct["name"]}!</p>
              <p>Roles and permissions should be comma separated </p>
              <div className="Form-container">
                <DeleteUserForm />
                <GetUserInfoForm />
                <RemoveRolesForm />
                <AddRolesForm />
                <CreateUserForm />
              </div>
            </header>
          </div>
        </NextUIProvider>
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
};

export default App;
