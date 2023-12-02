import React, { useState } from "react";

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
              <textarea value={netID} onChange={handleNetIDChange} />
            </label>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};
export default DeleteUserForm;
