import React, { useState } from "react";
import "../CommonStyles/styles.css";
import { Input, Button } from "@nextui-org/react";

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
    <div>
      <p>Create User</p>
      <form onSubmit={handleSubmit}>
        <div class="flex flex-col m-2">
          <div class="mb-2">
            <Input
              placeholder="NetID"
              value={netID}
              onChange={handleNetIDChange}
            />
          </div>
          <div class="mb-2">
            <Input
              placeholder="Roles"
              value={roles}
              onChange={handleRolesChange}
            />
          </div>
          <div class="mb-2">
            <Input
              placeholder="Permissions"
              value={permissions}
              onChange={handlePermissionsChange}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
export default CreateUserForm;
