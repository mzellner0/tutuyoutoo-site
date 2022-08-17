import axios from "axios";
import app from "@/main";

const instance = axios.create({
  baseURL: "https://api.tutuyoutoo.com",
  // baseURL: "http://localhost:3000",
  // headers: {
  //   Authorization: 'Bearer ' + localStorage.getItem("jwt")
  // },
  // headers: { ...axios.defaults.headers, Cache: cacheControl },
});

instance.interceptors.request.use(async (config) => {
  // config.headers = {
  //   Authorization: 'Bearer ' + token
  // };
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default instance; 
