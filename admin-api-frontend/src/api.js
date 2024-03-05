import axios from "axios";
import BASE_URL from "./.env";

export default axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
});
// const [error, setError] = useState(false);
// const [updated, setUpdated] = useState(false);
//is this how you do it
export function create_user() {
  const [netid, setNetID] = useState('');
  const [roleStr, setRoleStr] = useState('');
  const [permStr, setPremStr] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState(false);

  const createUser = async (netid, roleStr, permStr) => {
    try {
      const response = await axios.post(`${baseURL}/create_user`, {
        netid: netid,
        roleStr: roleStr,
        permStr: permStr,
      });
      setAccepted(true);
      console.log('User created:', response.data);
    } catch (error) {
      setError(true);
      console.error('Error creating user:', error);
    }
  };
  
  return(

  )

}

//To update a given resource, make a PUT request.