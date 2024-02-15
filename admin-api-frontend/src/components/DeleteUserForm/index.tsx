import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

const DeleteUserForm = () => {
  const [netID, setNetID] = useState<string>("");

  const handleNetIDChange = (event) => {
    setNetID(event.target.value);
  };

  const handleSubmit = (event) => {
    if (netID !== "") {
      console.log(netID);
      // Do something with the netID

      event.preventDefault();
      setNetID("");
    }
  };

  return (
    <div>
      <p>Delete User</p>
      <form onSubmit={handleSubmit}>
        <div class="flex flex-col m-2">
          <div class="mb-2">
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
