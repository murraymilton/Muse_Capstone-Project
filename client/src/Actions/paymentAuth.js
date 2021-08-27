import axios from "axios";

export const accountCreate = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/account-creation`,
    {},
    {
      Headers: {
        Authorization: `Bearer${token}`,
      },
    }
  );
};

export default accountCreate;
