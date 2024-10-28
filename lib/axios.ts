import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refreshToken } from "./auth";

const getClientSideCookie = (name: string) => {
  const value = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return value ? value.pop() : "";
};

const isClient = typeof window !== "undefined";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_AUTH_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!isClient) {
      try {
        const cookieStore = cookies();
        const token = cookieStore.get("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token.value}`;
        }
      } catch (error) {
        console.error("Error accessing cookies on server:", error);
      }
    }
    // For client-side requests
    else {
      const token = getClientSideCookie("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (isClient && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          // Create API route to handle logout
          await fetch("/api/auth/logout", { method: "POST" });
          window.location.href = "/auth/sign-in";
        } else {
          redirect("/auth/sign-in");
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
