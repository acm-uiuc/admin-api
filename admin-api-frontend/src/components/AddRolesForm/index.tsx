import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";

const AddRolesForm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [netID, setNetID] = useState<string>("");
  const [roles, setRoles] = useState<string>("");
  const [rolesSplit, setRolesSplit] = useState<string[]>([]);

  const handleAddRolesThroughUpdate = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/default/api/v1/update_user`,
        null,
        {
          params: {
            netid: netID,
            newPerms: permissions,
            newRoles: roles,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      handleAddRolesThroughUpdate();
      setRolesSplit([]);
      setNetID("");
      setRoles("");
    }
  };

  return (
    <div>
      <p>Add Roles</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col m-2">
          <div className="mb-2">
            <Input
              placeholder="NetID"
              value={netID}
              onChange={handleNetIDChange}
            />
          </div>
          <div className="mb-2">
            <Input
              placeholder="Roles"
              value={roles}
              onChange={handleRolesChange}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
export default AddRolesForm;
