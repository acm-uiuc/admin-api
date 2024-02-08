import "./App.css";
import GetUserInfoForm from "./components/FormsFolder/GetUserInfoForm/index.tsx";
import AddRolesForm from "./components/FormsFolder/AddRolesForm/index.tsx";
import RemoveRolesForm from "./components/FormsFolder/RemoveRolesForm/index.tsx";
import CreateUserForm from "./components/FormsFolder/CreateUserForm/index.tsx";
import DeleteUserForm from "./components/FormsFolder/DeleteUserForm/index.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>ACM Admin API </p>
        <p>also roles should be comma separated </p>
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
