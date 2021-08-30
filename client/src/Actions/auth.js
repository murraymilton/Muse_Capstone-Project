import axios from "axios";

export const register = async (createUser) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, createUser);

export const login = async (createUser) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, createUser);
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
