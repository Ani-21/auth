import axios from "axios";
const BASE_URl = "http://localhost:8000";

export default axios.create({
  baseURL: BASE_URl,
});

// here interceptors will be attached, that will attach jwt tokens
export const axiosPrivate = axios.create({
  baseURL: BASE_URl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
