import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: "https://bestwebultra.onrender.com/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
