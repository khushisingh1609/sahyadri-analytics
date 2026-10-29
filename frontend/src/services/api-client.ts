import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// This pulls the backend URL from your .env.local file
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept outgoing requests to attach the auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // In a real app, you might use next-auth, cookies, or localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("hms_token") : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Intercept incoming responses to handle global errors (like expired tokens)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - force logout
      if (typeof window !== "undefined") {
        localStorage.removeItem("hms_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);