import axios from "axios";
// import { useState } from "react";

export default axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
});
