import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

const DeleteUserForm = () => {
  const [netID, setNetID] = useState<string>("");

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/default/api/v1/delete_user`,
        null,
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
      handleDeleteUser();
      setNetID("");
    }
  };

  return (
    <div>
      <p>Delete User</p>
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
export default DeleteUserForm;
