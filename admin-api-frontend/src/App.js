import logo from "./logo.svg";
import "./App.css";
import GetUserInfoForm from "./components/GetUserInfoForm/index.tsx";
import AddRolesForm from "./components/AddRolesForm/index.tsx";
import RemoveRolesForm from "./components/RemoveRolesForm/index.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>ACM Admin API</p>
        <div className="Form-container">
          <GetUserInfoForm />
          <AddRolesForm />
          <RemoveRolesForm />
        </div>
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
