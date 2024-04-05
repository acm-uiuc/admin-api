import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import useFetchWithMsal from "../../hooks/useFetchWithMsal.jsx";
import { loginRequest } from "../../authConfig.js";

const CreateUserForm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [netID, setNetID] = useState<string>("");
  const [roles, setRoles] = useState<string>("");
  const [permissions, setPermissions] = useState<string>("");

  const { execute } = useFetchWithMsal(loginRequest);
  const handleCreateUser = async () => {
    try {
      execute(
        "PUT",
        `${BASE_URL}/default/api/v1/create_user?netid=${netID}&permStr=${permissions}&roleStr=${roles}`,
        null
      ).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    if (netID !== "" && roles !== "") {
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
