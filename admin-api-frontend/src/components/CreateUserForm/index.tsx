import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";

const CreateUserForm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [netID, setNetID] = useState<string>("");
  const [roles, setRoles] = useState<string>("");
  const [permissions, setPermissions] = useState<string>("");

  const handleCreateUser = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/default/api/v1/create_user`,
        null,
        {
          params: {
            netid: netID,
            permStr: permissions,
            roleStr: roles,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    if (netID !== "" && roles !== "") {
      // This handles the API call
      handleCreateUser();

      event.preventDefault();
      setNetID("");
      setRoles("");
      setPermissions("");
    }
  };

  return (
    <div>
      <p>Create User</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col m-2">
          <div className="mb-2">
            <Input
              placeholder="NetID"
              value={netID}
              onChange={(event) => setNetID(event.target.value)}
            />
          </div>
          <div className="mb-2">
            <Input
              placeholder="Roles"
              value={roles}
              onChange={(event) => setRoles(event.target.value)}
            />
          </div>
          <div className="mb-2">
            <Input
              placeholder="Permissions"
              value={permissions}
              onChange={(event) => setPermissions(event.target.value)}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
export default CreateUserForm;
