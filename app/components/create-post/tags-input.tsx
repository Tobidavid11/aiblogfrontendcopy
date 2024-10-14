// "use client";
// import React, { useState, useRef, KeyboardEvent } from "react";
// import { X } from "lucide-react";
// import { Input } from "@/components/ui/input";
//
// interface Tag {
//   id: string;
//   text: string;
// }
//
// export default function TagsInput() {
//   const [tags, setTags] = useState<Tag[]>([]);
//   const [input, setInput] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };
//
//   const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && input.trim()) {
//       e.preventDefault();
//       addTag(input.trim());
//     } else if (e.key === "Backspace" && !input && tags.length > 0) {
//       removeTag(tags[tags.length - 1].id);
//     }
//   };
//
//   const addTag = (text: string) => {
//     const newTag: Tag = { id: Date.now().toString(), text };
//     setTags([...tags, newTag]);
//     setInput("");
//   };
//
//   const removeTag = (id: string) => {
//     setTags(tags.filter((tag) => tag.id !== id));
//   };
//
//   return (
//     <div className="w-full max-w-md">
//       <div
//         className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md bg-white"
//         onClick={() => inputRef.current?.focus()}
//       >
//         {tags.map((tag) => (
//           <span
//             key={tag.id}
//             className="flex items-center gap-1 px-2 py-1 text-sm bg-[#f7f7f8] rounded-md font-medium"
//           >
//             {tag.text}
//             <button
//               onClick={() => removeTag(tag.id)}
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               <X size={14} />
//             </button>
//           </span>
//         ))}
//         <Input
//           ref={inputRef}
//           type="text"
//           value={input}
//           onChange={handleInputChange}
//           onKeyDown={handleInputKeyDown}
//           className="border border-neutral-200 rounded-sm border-none w-[1rem] flex-grow"
//           placeholder={
//             tags.length === 0 ? "Type and press Enter to add tags" : ""
//           }
//         />
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Tag {
  id: string;
  text: string;
}

interface TagsInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TagsInput({ value, onChange }: TagsInputProps) {
  const [tags, setTags] = useState<Tag[]>(
    value ? value.split(",").map((tag) => ({ id: tag, text: tag })) : [],
  );
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      addTag(input.trim());
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1].id);
    }
  };

  const addTag = (text: string) => {
    const newTag: Tag = { id: Date.now().toString(), text };
    const newTags = [...tags, newTag];
    setTags(newTags);
    setInput("");
    onChange(newTags.map((tag) => tag.text).join(","));
  };

  const removeTag = (id: string) => {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
    onChange(newTags.map((tag) => tag.text).join(","));
  };

  return (
    <div
      className="flex flex-wrap items-center gap-2 p-2 border border-input rounded-md bg-background"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <Badge key={tag.id} variant="secondary" className="text-sm">
          {tag.text}
          <button
            type="button"
            onClick={() => removeTag(tag.id)}
            className="ml-1 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <X size={14} />
            <span className="sr-only">Remove {tag.text} tag</span>
          </button>
        </Badge>
      ))}
      {/* <Input */}
      {/*   ref={inputRef} */}
      {/*   type="text" */}
      {/*   value={input} */}
      {/*   onChange={handleInputChange} */}
      {/*   onKeyDown={handleInputKeyDown} */}
      {/*   className="flex-grow !border-0 !ring-0 !outline-none min-w-[50px] p-0 text-sm" */}
      {/*   placeholder={ */}
      {/*     tags.length === 0 ? "Type and press Enter to add tags" : "" */}
      {/*   } */}
      {/* /> */}
      <Input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="border border-neutral-200 rounded-sm border-none w-[1rem] flex-grow"
        placeholder={
          tags.length === 0 ? "Type and press Enter to add tags" : ""
        }
      />
      {/*       <Input */}
      {/*   ref={inputRef} */}
      {/*   type="text" */}
      {/*   value={input} */}
      {/*   onChange={handleInputChange} */}
      {/*   onKeyDown={handleInputKeyDown} */}
      {/*   className="flex-grow !border-0 !ring-0 !outline-none min-w-[50px] p-0 text-sm" */}
      {/*   placeholder={ */}
      {/*     tags.length === 0 ? "Type and press Enter to add tags" : "" */}
      {/*   } */}
      {/* /> */}
    </div>
  );
}
