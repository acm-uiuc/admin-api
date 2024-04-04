import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import useFetchWithMsal from "../../hooks/useFetchWithMsal.jsx";
import { loginRequest } from "../../authConfig.js";

const RemoveRolesForm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [netID, setNetID] = useState<string>("");
  const [roles, setRoles] = useState<string>("");

  const { execute } = useFetchWithMsal(loginRequest);

  // This does not actually remove the roles, it just adds. We need to make a
  // New lambda function for this endpoint
  const handleRemoveRolesThroughUpdate = async () => {
    try {
      execute(
        "PUT",
        `${BASE_URL}/default/api/v1/update_user?netid=${netID}&newRoles=${roles}`,
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
      event.preventDefault();
      handleRemoveRolesThroughUpdate();
      setNetID("");
      setRoles("");
    }
  };

  return (
    <div>
      <p>Remove Roles</p>
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
export default RemoveRolesForm;
