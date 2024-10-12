"use client";
import { cn } from "@/lib/utils";
import MinimalTiptapOne from "../minimal-tiptap/minimal-tiptap-one";

export default function PostEditor() {
  return (
    <MinimalTiptapOne
      throttleDelay={1000}
      className={cn("h-full min-h-0 w-full rounded-xl")}
      editorContentClassName="overflow-auto h-full"
      output="html"
      placeholder="Comment here..."
      editable={true}
      editorClassName="focus:outline-none px-5 py-4 h-full"
    />
  );
}
