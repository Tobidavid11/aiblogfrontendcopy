"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Back() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="rounded-full py-6 flex gap-4 bg-palegoldenrod items-center text-gray"
    >
      <ArrowLeft size={28} /> Back
    </Button>
  );
}
