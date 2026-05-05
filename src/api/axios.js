/*import dependencies*/
import axios from "axios";

const instance  = axios.create({
    /* production mode*/
    baseURL: "https://arcentra-back.vercel.app/api",

    /* development mode*/
    // baseURL: "http://localhost:4000/api",
    withCredentials: true
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});




export default instance
