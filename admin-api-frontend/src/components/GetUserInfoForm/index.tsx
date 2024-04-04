import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import useFetchWithMsal from "../../hooks/useFetchWithMsal.jsx";
import { loginRequest } from "../../authConfig.js";

const GetUserInfoForm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [netID, setNetID] = useState<string>("");

  const { execute } = useFetchWithMsal(loginRequest);

  const handleGetUser = async () => {
    try {
      execute(
        "GET",
        `${BASE_URL}/default/api/v1/get_user?netid=${netID}`,
        null
      ).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    if (netID !== "") {
      event.preventDefault();
      handleGetUser();
      setNetID("");
    }
  };

  return (
    <div>
      <p>Get User</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col m-2">
          <div className="mb-2">
            <Input
              placeholder="NetID"
              value={netID}
              onChange={(event) => setNetID(event.target.value)}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
export default GetUserInfoForm;
