import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";

const GetUserInfoForm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [netID, setNetID] = useState<string>("");

  const handleGetUser = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/default/api/v1/get_user`,
        {
          params: {
            netid: netID,
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

  const handleSubmit = (event) => {
    if (netID !== "") {
      console.log(netID);
      // Do something with the netID

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
              onChange={handleNetIDChange}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
export default GetUserInfoForm;
