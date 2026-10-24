import axios from "axios";

const rawUrl = import.meta.env.VITE_API_URL || "https://riyadvi-backend-api.onrender.com/api";
const API_BASE_URL = rawUrl.endsWith("/api") ? rawUrl : `${rawUrl.replace(/\/$/, "")}/api`;
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 15000
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);
