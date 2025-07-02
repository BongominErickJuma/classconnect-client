import axios from "axios";

// Create axios instance with base config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Essential for cookies to be sent/received
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Standard error handling
    if (error.response) {
      console.log(error.response);
      const message = error.response.data?.message || "An error occurred";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(new Error("Network error - no response from server"));
    } else {
      return Promise.reject(new Error("Request setup error"));
    }
  }
);

// Auth Service
export const authService = {
  login: async (credentials) => {
    const response = await api.post("/users/login", credentials);

    return response;
  },
  signup: async (userData) => {
    return api.post("/users/signup", userData);
  },
  logout: async () => {
    // Server should clear the ecl_Jwt cookie
    return api.post("/users/logout");
  },
  getMe: async () => {
    return api.get("/users/me");
  },
};
