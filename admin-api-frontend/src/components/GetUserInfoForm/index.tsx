import React, { useState } from "react";

const GetUserInfoForm = () => {
  const [netID, setNetID] = useState<string>("");
  const [userInfo, setUserInfo] = useState<string>("info");

  const handleNetIDChange = (event) => {
    setNetID(event.target.value);
  };

  const handleSubmit = (event) => {
    if (netID !== "") {
      console.log(netID);
      // Do something with the netID to get UserInfo
      // Display user info by setting userInfo

      setUserInfo(netID + " information: ");

      event.preventDefault();
      setNetID("");
    }
  };

  return (
    <>
      <div>
        <p>GetUserInfoForm</p>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label>
              NetID:
              <textarea value={netID} onChange={handleNetIDChange} />
            </label>
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div>{userInfo}</div>
      </div>
    </>
  );
};
export default GetUserInfoForm;
