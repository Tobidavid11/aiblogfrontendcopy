// export const assertUserAuthenticated = async () => {
// 	// Auth Guy do some auth stuff here and return user object
// 	return {
// 		accessToken:
// 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwiZW1haWwiOiJ2aWN0b3JhZGViYXlvNzY1QGdtYWlsLmNvbSIsImlhdCI6MTcyOTEwMjkyMX0.iijcZKZbaAEIZLYJzqJlsmqMFmYXuWlUl7hL3nE5LVc",
// 		userId: 5,
// 	};
// };
import { User } from "@/types/auth";
import axiosInstance from "./axios";

export const assertUserAuthenticated = async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const userData = sessionStorage.getItem("userData");

  if (!accessToken || !userData) {
    throw new Error("User not authenticated");
  }

  try {
    // Verify token validity with backend
    const response = await axiosInstance.get("/auth/verify");
    const user = JSON.parse(userData) as User;

    return {
      accessToken,
      userId: user.id,
      user,
    };
  } catch (error) {
    sessionStorage.clear();
    throw new Error("Invalid authentication");
  }
};

export const getAuthHeaders = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem("accessToken");
};

export const logout = () => {
  sessionStorage.clear();
  window.location.href = "/sign-in";
};
