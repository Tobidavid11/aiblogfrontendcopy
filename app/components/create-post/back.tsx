"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Back() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="rounded-full p-2 sm:px-4 border-[.4px] border-transparent md:py-6 flex gap-4 bg-palegoldenrod items-center text-gray"
    >
      <ArrowLeft className="!text-xs" />
      <span className="hidden md:flex">Back</span>
    </Button>
  );
}
