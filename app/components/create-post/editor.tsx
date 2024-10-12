"use client";
import { cn } from "@/lib/utils";
import MinimalTiptapOne from "../minimal-tiptap/minimal-tiptap-one";
import { Input } from "@/components/ui/input";

export default function PostEditor() {
  return (
    <div className="w-full relative shadow-[-2px_2px_12px_-2px_rgba(16,_24,_40,_0.06),_2px_-2px_16px_-1px_rgba(16,_24,_40,_0.06)] rounded-2xl bg-modals-and-dropdown border-neutral-100 border h-[743px] flex flex-col items-start justify-start p-6 gap-8 text-left text-base text-gray font-dm-sans">
      <Input
        placeholder="Title"
        className="text-2xl !border-none !outline-none font-bold text-neutral-400 absolute top-8 left-8"
      />
      <MinimalTiptapOne
        throttleDelay={1000}
        className={cn(
          "h-full min-h-0 w-full rounded-xl border border-neutral-100 bg-neutral-50 shadow-none pt-10",
          " focus:border-neutral-100 active:border-neutral-100",
        )}
        editorContentClassName="overflow-auto h-full"
        output="html"
        placeholder="Start writing ..."
        editable={true}
        editorClassName="!focus:outline-none px-5 py-4 h-full"
      />
    </div>
  );
}
