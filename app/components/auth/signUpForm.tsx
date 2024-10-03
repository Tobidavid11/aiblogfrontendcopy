"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../schemas/index";
import Image from "next/image";
import { Mail, CircleUserRound, Eye, EyeOff } from "lucide-react";
import Google from "../../../public/assets/icons/iconGoogle.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
    sessionStorage.setItem("userEmail", data.email);
    router.push("/auth/otp-verification");
  };

  const handleGoogleSubmit = () => {
    // Handle form submission
    router.push("/");
  };

  const handleFacebookSubmit = () => {
    // Handle form submission
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-sm text-gray-500 mb-2">START FOR FREE</h2>
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        <div className="flex mb4">
          <div className="w-12 h-12 bg-transparent border border-yellow-400 rounded-l-lg flex items-center justify-center">
            <Image src={Google} alt="Google Icon" width={24} height={24} />
          </div>

          <button
            className="w-full bg-yellow-400 text-black py-3 rounded-r-lg mb-4 flex items-center justify-center"
            onClick={handleGoogleSubmit}
          >
            Sign up with Google
          </button>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <Link
            href="/"
            onClick={handleFacebookSubmit}
            className="mx-4 text-sm text-[#171717]"
          >
            Or sign up with facebook
          </Link>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <input
                {...register("username")}
                type="text"
                id="username"
                placeholder="Create username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <CircleUserRound
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message as React.ReactNode}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Mail
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message as React.ReactNode}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Create password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message as React.ReactNode}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg mb-4"
          >
            Create Account
          </button>
        </form>

        <p className=" text-sm">
          Already have an account?{" "}
          <a href="/auth/sign-in" className="text-yellow-500 hover:underline">
            Sign in
          </a>
        </p>
        <div className="flex-grow mt-5 h-px bg-gray-200"></div>
        <p className="text-center text-xs mt-6 text-gray-500">
          By clicking Signup, you agree to our{" "}
          <a href="#" className="text-black hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-black hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
