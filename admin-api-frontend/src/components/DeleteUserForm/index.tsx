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
    <>
      <div>
        <p>DeleteUserForm</p>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label>
              NetID:
              <Input value={netID} onChange={handleNetIDChange} />
            </label>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default DeleteUserForm;
