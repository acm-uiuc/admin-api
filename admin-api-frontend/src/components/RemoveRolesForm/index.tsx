import React, { useState } from "react";
import "../CommonStyles/styles.css";

const RemoveRolesForm = () => {
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
    if (netID !== "" && roles !== "") {
      console.log(netID);
      console.log(rolesSplit);
      console.log(permissionsSplit);
      // Do something with the netID, roles and permissions

      event.preventDefault();
      setRolesSplit([]);
      setNetID("");
      setRoles("");
    }
  };

  return (
    <>
      <div>
        <p>RemoveRolesForm</p>
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
export default RemoveRolesForm;
