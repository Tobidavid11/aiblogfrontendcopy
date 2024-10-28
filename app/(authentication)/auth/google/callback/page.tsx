"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const authenticateGoogle = async () => {
      const code = searchParams.get("code");

      if (!code) {
        console.error("No authentication code received");
        toast({
          title: "Authentication Failed",
          description: "No authentication code received. Please try again.",
          variant: "destructive",
          className:
            "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
        });
        router.push("/auth/sign-in");
        return;
      }

      try {
        // Direct API call to handle the response
        const response = await axios.get(`${API_URL}auth/google/callback`, {
          params: { code },
          withCredentials: true,
        });

        const { data } = response;

        if (data.statusCode === 200 && data.data) {
          const { user, accessToken, refreshToken } = data.data;

          // Store the tokens and user data
          sessionStorage.setItem("userData", JSON.stringify(user));
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);

          toast({
            title: "Sign in successful",
            description: "Welcome back!",
            className:
              "bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 shadow-md",
          });

          router.push("/");
        } else {
          throw new Error(data.message || "Authentication failed");
        }
      } catch (error) {
        console.error("Failed to authenticate:", error);
        toast({
          title: "Authentication Error",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred. Please try again.",
          variant: "destructive",
          className:
            "bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow-md",
        });
        router.push("/auth/sign-in");
      }
    };

    authenticateGoogle();
  }, [router, searchParams, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">
          Completing Sign In
        </h2>
        <p className="text-gray-500 mt-2">
          Please wait while we authenticate your Google account...
        </p>
      </div>
    </div>
  );
}
