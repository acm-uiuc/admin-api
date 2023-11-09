import React, { useState } from "react";
import "./styles.css";

const AddRolesForm = () => {
  const [netID, setNetID] = useState<string>("");
  const [roles, setRoles] = useState<string>("");
  const [rolesSplit, setRolesSplit] = useState<string[]>([]);

  const handleNetIDChange = (event) => {
    setNetID(event.target.value);
  };

  const handleRolesChange = (event) => {
    setRoles(event.target.value);
    setRolesSplit(event.target.value.split(","));
  };

  const handleSubmit = (event) => {
    console.log(netID);
    console.log(rolesSplit);
    // Do something with the netID and roles

    event.preventDefault();
    setRolesSplit([]);
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
