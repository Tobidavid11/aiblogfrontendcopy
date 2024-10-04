"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon, CircleUserRound } from "lucide-react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

const signInFormSchema = z.object({
  email_or_username: z
    .union([
      z.string().email({ message: "Invalid email address" }),
      z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(30, { message: "Username cannot exceed 30 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message:
            "Username can only contain letters, numbers, and underscores",
        }),
    ])
    .refine((value) => value.trim() !== "", {
      message: "Email or username is required",
    }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
});

type FormData = z.infer<typeof signInFormSchema>;

const SignIn = () => {
  const [showPassword, setShowPasword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email_or_username: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPasword(!showPassword);
  };

  const handleFormSubmit = async (data: FormData) => {
    console.log("Form Data is: ", data);
  };

  return (
    <div className="shadow-[1.5rem] px-16 py-12 rounded-lg w-[30rem] sm:w-[40rem] bg-white dark:bg-[#262626] dark:text-white">
      <h2 className="font-bold text-2xl mb-6">Sign In</h2>
      <div className="flex w-full mb-4 flex-col gap-4">
        <div className="flex rounded-lg ">
          <div className="bg-white p-3 flex justify-center border border-[#FDC316] rounded-tl-lg rounded-bl-lg">
            <Image
              src="/images/googleicon.png"
              width={23}
              height={23}
              alt="icon"
            />
          </div>
          <Button className="py-3 bg-[#FDC316] hover:bg-[#FDC316]/70 w-full h-[46px] text-black rounded-tl-none rounded-bl-none font-semibold text-[1rem]">
            Sign in with Google
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-2 justify-between items-center mb-4">
        <hr className="border-[1px] border-gray-200 w-[30%]" />
        <span className="grow text-center">Or sign in with facebook</span>
        <hr className="border-[1px] border-gray-200 w-[30%]" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email_or_username"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel
                    htmlFor="email_or_username"
                    className="block text-sm font-medium mb-1"
                  >
                    Email or Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email_or_username"
                      type="text"
                      {...field}
                      placeholder="Enter your email or username"
                      className="w-full h-12 rounded-lg"
                    />
                  </FormControl>
                  <CircleUserRound className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  {form.formState.errors && (
                    <FormMessage className="text-[#FDC316]">
                      {form.formState.errors.email_or_username?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel
                    htmlFor="password"
                    className="block text-sm font-medium mb-1"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full h-12 rounded-lg pr-10"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="link"
                    size={"icon"}
                    className="absolute right-3 top-12 transform -translate-y-1/2 bg-transparent"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="text-gray-400 w-5 h-5" />
                    ) : (
                      <EyeIcon className="text-gray-400 w-5 h-5" />
                    )}
                  </Button>
                  {form.formState.errors && (
                    <FormMessage className="text-[#FDC316]">
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="flex items-center mb-6 ">
              <Checkbox
                id="keep-signed-in"
                className="rounded-sm border-gray-500"
              />
              <label
                htmlFor="keep-signed-in"
                className="ml-2 text-sm text-gray-500"
              >
                Keep me signed in
              </label>
            </div>
            <Button
              className="py-3 bg-[#FDC316] hover:bg-[#FDC316]/70 w-full h-[46px] text-black rounded-lg font-semibold text-[1rem]"
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting ? "Loading..." : "Sign in"}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-base text-center text-gray-500 mt-4 mb-8 ">
        By clicking Sign in, you agree to our{" "}
        <Link href="#" className="text-black">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-black">
          Privacy <br />
          Policy
        </Link>
        .
      </p>
      <hr className="border-[1px] border-gray-200 w-full" />
      <div className="flex justify-between text-base mt-6">
        <Link href="#" className="hover:underline">
          Forgot Password?
        </Link>
        <div>
          New to dRollo?{" "}
          <Link href="/signup" className="text-[#FBBC05] hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
