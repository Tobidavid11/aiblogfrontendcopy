"use server";
import axios from "axios";
import {
  SignUpParams,
  SignUpResponse,
  ForgotPasswordParams,
  ForgotPasswordResponse,
} from "../types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const signupAuth = async (
  params: SignUpParams
): Promise<SignUpResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}auth/register`, params);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error:
          error.response?.data?.message || "An error occurred during signup",
        status_code: error.response?.status || 500,
      };
    }
    return {
      error: "An unexpected error occurred",
      status_code: 500,
    };
  }
};

export const forgotPasswordAuth = async (
  params: ForgotPasswordParams
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}auth/password/forgot`,
      params
    );
    return {
      message: response.data.message,
      status_code: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error:
          error.response?.data?.message ||
          "An error occurred while processing your request",
        status_code: error.response?.status || 500,
      };
    }
    return {
      error: "An unexpected error occurred",
      status_code: 500,
    };
  }
};
