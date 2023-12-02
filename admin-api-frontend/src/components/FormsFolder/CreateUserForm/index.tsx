import React from "react";
import CommonFormWithRoles from "../../CommonFormsFolder/CommonFormWithRoles/index.tsx";

const CreateUserForm = () => {
  return (
    <CommonFormWithRoles name="CreateUserForm" backendFunction={console.log} />
  );
};
export default CreateUserForm;
