import React, { useState } from "react";
import "./styles.css";

const AddRolesForm = () => {
  const [netID, setNetID] = useState("");
  const [roles, setRoles] = useState("");

  const handleNetIDChange = (event) => {
    setNetID(event.target.value);
  };

  const handleRolesChange = (event) => {
    setRoles(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log(netID);
    console.log(roles);
    // Do something with the netID and roles

    event.preventDefault();
    setNetID("");
    setRoles("");
  };

  return (
    <>
      <div>
        <p>AddRolesForm</p>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label>
              NetID:
              <textarea value={netID} onChange={handleNetIDChange} />
            </label>
            <label>
              Roles:
              <textarea value={roles} onChange={handleRolesChange} />
            </label>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};
export default AddRolesForm;
