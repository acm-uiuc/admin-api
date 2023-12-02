import React, { useState } from "react";

const CreateUserForm = () => {
  const [netID, setNetID] = useState<string>("");

  const handleNetIDChange = (event) => {
    setNetID(event.target.value);
  };

  const handleSubmit = (event) => {
    if (netID !== "") {
      console.log(netID);
      // Do something with the netID to create a new user

      event.preventDefault();
      setNetID("");
    }
  };

  return (
    <>
      <div>
        <p>CreateUserForm</p>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label>
              NetID:
              <textarea value={netID} onChange={handleNetIDChange} />
            </label>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateUserForm;
