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
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const assertUserAuthenticated = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const userDataCookie = cookieStore.get("userData");

  if (!accessToken || !userData) {
    throw new Error("User not authenticated");
  }

  try {
    const user = JSON.parse(userData) as User;
    // Verify token validity with backend
    const response = await axios.get(`${API_AUTH_URL}auth/verify`, {
      headers: { Authorization: `Bearer ${accessToken.value}` },
    });

    return {
      accessToken,
      userId: user.id,
      user,
    };
  } catch (error) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("userData");
    throw new Error("Invalid authentication");
  }
};

export const getAuthHeaders = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return {
    Authorization: `Bearer ${accessToken?.value || ""}`,
  };
};

export const isAuthenticated = async () => {
  const cookieStore = cookies();
  return !!cookieStore.get("accessToken");
};

export const logout = async () => {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userData");
  redirect("/auth/sign-in");
};
