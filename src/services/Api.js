import axios from "axios";
import app from "@/main";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_API,
  headers: {
    Authorization: 'Bearer ' + sessionStorage.getItem("tk")
  },
});

const onUploadProgress = (event) => {
  const percentCompleted = Math.floor((event.loaded * 100) / event.total);
  app.$store.dispatch('loader/updatePercentage', percentCompleted);
};

instance.interceptors.request.use(async (config) => {
  config.onUploadProgress = onUploadProgress;
  config.headers = {
    Authorization: 'Bearer ' + sessionStorage.getItem("tk")
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