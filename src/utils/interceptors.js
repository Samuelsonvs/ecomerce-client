import axios from "axios";

const instance = axios.create({});

const userInstance = axios.create({});
userInstance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "userInfo"
)}`;

const adminInstance = axios.create({});
adminInstance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "adminInfo"
)}`;

export {
  instance as Axios,
  userInstance as UserAxios,
  adminInstance as AdminAxios,
};
