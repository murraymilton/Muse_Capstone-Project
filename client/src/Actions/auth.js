import axios from "axios";

export const register = async (createUser) => {
  return await axios.post(`${process.env.REACT_APP_API}/register`, createUser);
};

export const login = async (createUser) => {
  return await axios.post(`${process.env.REACT_APP_API}/login`, createUser);
};
