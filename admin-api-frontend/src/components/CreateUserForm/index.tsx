import React, { useState } from "react";
import "../CommonStyles/styles.css";

const CreateUserForm = () => {
  const [netID, setNetID] = useState<string>("");
  const [roles, setRoles] = useState<string>("");
  const [rolesSplit, setRolesSplit] = useState<string[]>([]);

  const [permissions, setPermissions] = useState<string>("");
  const [permissionsSplit, setPermissionsSplit] = useState<string[]>([]);

  const handleNetIDChange = (event) => {
    setNetID(event.target.value);
  };

  const handleRolesChange = (event) => {
    setRoles(event.target.value);
    setRolesSplit(event.target.value.split(","));
  };

  const handlePermissionsChange = (event) => {
    setPermissions(event.target.value);
    setPermissionsSplit(event.target.value.split(","));
  };

  const handleSubmit = (event) => {
    if (netID !== "" && roles !== "") {
      console.log(netID);
      console.log(rolesSplit);
      console.log(permissionsSplit);
      // Do something with the netID, roles and permissions

      event.preventDefault();
      setRolesSplit([]);
      setPermissionsSplit([]);
      setNetID("");
      setRoles("");
      setPermissions("");
    }
  };

  return (
    <>
      <div>
        <p>CreateUserForm</p>
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
            <label>
              Perms:
              <textarea
                value={permissions}
                onChange={handlePermissionsChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateUserForm;
