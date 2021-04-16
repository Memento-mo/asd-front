import axios, { AxiosInstance } from "axios";
import $store from "../store/index";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
  },
});

api.interceptors.request.use((response) => {
  response.headers.Authorization = $store.getters["accounts/token"];

  return response;
});

export const useAxios = (): AxiosInstance => {
  return api;
};
