import "./App.css";
import GetUserInfoForm from "./components/GetUserInfoForm/index.tsx";
import AddRolesForm from "./components/AddRolesForm/index.tsx";
import RemoveRolesForm from "./components/RemoveRolesForm/index.tsx";
import CreateUserForm from "./components/CreateUserForm/index.tsx";
import DeleteUserForm from "./components/DeleteUserForm/index.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>ACM Admin API </p>
        <div className="Form-container">
          <CreateUserForm />
          <DeleteUserForm />
          <GetUserInfoForm />
          <RemoveRolesForm />
          <AddRolesForm />
        </div>
      </header>
    </div>
  );
}

export default App;
