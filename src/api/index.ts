import axios from "axios";

export const getToken = () => {
  const storageToken = localStorage.getItem("token");

  if (storageToken) {
    const token = JSON.parse(storageToken);
    return token;
  }
};

export const getUserRole = () => {
  const storageUser = localStorage.getItem("user");

  if (storageUser) {
    const user = JSON.parse(storageUser);
    return user.role;
  }
};

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});
