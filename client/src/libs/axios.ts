import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, // Cho phép gửi cookie trong các yêu cầu
}); 