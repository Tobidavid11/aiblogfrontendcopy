"use server";
import axios from "axios";
import {
  SignUpParams,
  SignUpResponse,
  SignInParams,
  SignInResponse,
  ForgotPasswordParams,
  ForgotPasswordResponse,
  UpdatePasswordParams,
  UpdatePasswordResponse,
  ErrorResponse,
} from "../types/auth";
import { cookies } from "next/headers";
import { authConfig } from "@/config/auth.config";

import { redirect } from "next/navigation";

const API_AUTH_URL = process.env.NEXT_PUBLIC_USER_AUTH_URL;

export const signupAuth = async (
  params: SignUpParams
): Promise<SignUpResponse> => {
  try {
    const response = await axios.post(`${API_AUTH_URL}auth/register`, params);
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

export const signInAuth = async (
  params: SignInParams
): Promise<SignInResponse> => {
  const payload = {
    email: params.email,
    password: params.password,
  };
  try {
    const response = await axios.post(`${API_AUTH_URL}auth/login`, payload);
    const { data } = response;

    if (data.statusCode === 200 && data.data) {
      const { accessToken, refreshToken, user } = data.data;

      const cookieStore = cookies();
      cookieStore.set(authConfig.accessTokenKey, accessToken, {
        ...authConfig.COOKIE_OPTIONS,
      });
      cookieStore.set(authConfig.refreshTokenKey, refreshToken, {
        ...authConfig.COOKIE_OPTIONS,
      });
      cookieStore.set(authConfig.userDataKey, JSON.stringify(user), {
        ...authConfig.COOKIE_OPTIONS,
      });

      // Return the full response data
      return {
        data: {
          user,
          accessToken,
          refreshToken,
        },
        status_code: response.status,
        message: "Login successful",
      };
    } else {
      throw new Error(data.message || "Unexpected response structure");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error response:", error.response);
      console.error("Axios error message:", error.message);
      console.error("Axios error config:", error.config);
      return {
        error:
          error.response?.data?.message || "An error occurred during sign in",
        status_code: error.response?.status || 500,
      };
    }
    console.error("Unexpected sign in error:", error);
    return {
      error: "An unexpected error occurred",
      status_code: 500,
    };
  }
};

export const validateOtp = async (email: string, otp: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_AUTH_URL}auth/otp/validate`, {
      email,
      otp,
    });
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "OTP validated successfully",
      };
    } else {
      return {
        success: false,
        message: response.data.message || "OTP validation failed",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to validate OTP",
      };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};

export const requestNewOtp = async (email: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_AUTH_URL}auth/otp/sent`, {
      email,
    });
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "New OTP has been sent to your email",
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to send new OTP",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to request new OTP",
      };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};

export const refreshToken = async () => {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${API_AUTH_URL}auth/refresh-token`, {
      refresh_token: refreshToken.value,
    });

    const { access_token, refresh_token } = response.data;
    cookieStore.set("accessToken", access_token, {
      ...authConfig.COOKIE_OPTIONS,
    });
    cookieStore.set("refreshToken", refresh_token, {
      ...authConfig.COOKIE_OPTIONS,
    });
    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    const cookieStore = cookies();
    cookieStore.delete(authConfig.accessTokenKey);
    cookieStore.delete(authConfig.refreshTokenKey);
    cookieStore.delete(authConfig.userDataKey);
    redirect("/auth/sign-in");
    throw error;
  }
};
// export const handleGoogleSignIn = async (): Promise<{ authUrl: string }> => {
//   try {
//     const response = await axios.get(`${API_AUTH_URL}auth/google`);
//     if (response.data.authUrl) {
//       return { authUrl: response.data.authUrl };
//     }
//     throw new Error("Google auth URL not found");
//   } catch (error) {
//     console.error("Error initiating Google sign in:", error);
//     throw error;
//   }
// };

// export const handleGoogleCallback = async (code: string) => {
//   try {
//     const response = await axios.post(`${API_AUTH_URL}auth/google/callback`, {
//       code,
//     });
//     if (response.data.user) {
//       // Handle successful sign in (e.g., store user data, redirect)
//       return response.data;
//     }
//   } catch (error) {
//     console.error("Error handling Google callback:", error);
//     throw error;
//   }
// };

// Function to handle Google Sign-In
export const handleGoogleSignIn = async (
  id_token: string
): Promise<
  | {
      User: { id: string; email: string; username: string; createdAt: string };
      accessToken: string;
      refreshToken: string;
    }
  | ErrorResponse
> => {
  try {
    const response = await axios.get(
      `${API_AUTH_URL}auth/google?id_token=${id_token}`
    );

    const { user, accessToken, refreshToken } = response.data.data;

    return {
      User: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return {
      message:
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.message
          ? error.response.data.message
          : "Something went wrong",
      status_code:
        axios.isAxiosError(error) && error.response
          ? error.response.status
          : undefined,
    };
  }
};

// Function to handle Google Callback
export const handleGoogleCallback = async (code: string) => {
  try {
    const response = await axios.get(`${API_AUTH_URL}auth/google/callback`, {
      params: { code },
    });

    if (response.data.user) {
      const { user, accessToken, refreshToken } = response.data;

      return {
        User: {
          id: user.id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
        },
        accessToken,
        refreshToken,
      };
    }

    throw new Error("User data not found in callback response");
  } catch (error) {
    console.error("Error handling Google callback:", error);
    return {
      message:
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.message
          ? error.response.data.message
          : "Something went wrong",
      status_code:
        axios.isAxiosError(error) && error.response
          ? error.response.status
          : undefined,
    };
  }
};

export const forgotPasswordAuth = async (
  params: ForgotPasswordParams
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post(
      `${API_AUTH_URL}auth/password/forgot`,
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

export const updatePasswordAuth = async (
  params: UpdatePasswordParams
): Promise<UpdatePasswordResponse> => {
  try {
    const response = await axios.post(
      `${API_AUTH_URL}auth/password/reset`,
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
