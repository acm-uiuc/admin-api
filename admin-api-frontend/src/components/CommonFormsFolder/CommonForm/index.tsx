import React, { useState } from "react";

interface CommonFormProps {
  name: String;
  backendFunction: () => void;
}

const CommonForm: React.FC<CommonFormProps> = ({ name, backendFunction }) => {
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
export default CommonForm;
