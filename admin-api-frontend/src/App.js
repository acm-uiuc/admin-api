import "./App.css";
import GetUserInfoForm from "./components/GetUserInfoForm/index.tsx";
import AddRolesForm from "./components/AddRolesForm/index.tsx";
import RemoveRolesForm from "./components/RemoveRolesForm/index.tsx";
import CreateUserForm from "./components/CreateUserForm/index.tsx";
import DeleteUserForm from "./components/DeleteUserForm/index.tsx";

import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <div className="App">
        <header className="App-header">
          <p>ACM Admin API </p>
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
  );
}

export default App;
