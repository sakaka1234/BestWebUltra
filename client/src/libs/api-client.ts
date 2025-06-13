import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
