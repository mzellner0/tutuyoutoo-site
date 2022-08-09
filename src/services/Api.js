import axios from "axios";
import app from "@/main";

const instance = axios.create({
  baseURL: "https://api.tutuyoutoo.com",
  // baseURL: "http://localhost:3000",
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem("jwt")
  },
  // headers: { ...axios.defaults.headers, Cache: cacheControl },
});

const onUploadProgress = (event) => {
  const percentCompleted = Math.floor((event.loaded * 100) / event.total);
  app.$store.dispatch('loader/updatePercentage', percentCompleted);
};

instance.interceptors.request.use(async (config) => {
  const token = app.$store.getters['tokens/token'];
  config.onUploadProgress = onUploadProgress;
  config.headers = {
    Authorization: 'Bearer ' + token
  };
  app.$store.dispatch('loader/updateLoading', true);
  return config;
}, (error) => {
  app.$store.dispatch('loader/updateLoading', false);
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  app.$store.dispatch('loader/updateLoading', false);
  return response;
}, (error) => {
  app.$store.dispatch('loader/updateLoading', false);
  return Promise.reject(error);
});

export default instance;