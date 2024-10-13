// import { Card, CardContent } from "@/components/ui/card";
// import React from "react";

// export default function () {
//   return (
//     <div>
//       <Card>
//         <CardContent>Explain your task here</CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InstructionField() {
  const [text, setText] = useState("");

  const formatText = (command: string) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    if (!selectedText) return; // Make sure something is selected

    let formattedText = "";
    switch (command) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "underline":
        formattedText = `__${selectedText}__`;
        break;
      case "bullet":
        formattedText = `\n- ${selectedText}`;
        break;
      case "number":
        formattedText = `\n1. ${selectedText}`;
        break;
      case "link":
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        formattedText = selectedText;
    }

    const newText =
      text.substring(0, start) + formattedText + text.substring(end);
    setText(newText);

    // Update the cursor position after text is formatted
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formattedText.length,
        start + formattedText.length
      );
    }, 0);
  };

  return (
    <>
      <Card className='rounded-xl'>
        <CardContent>
          <div className='w-full max-w-2xl mx-auto'>
            <div className='rounded-xl'>
              <div className='p-2'>
                <textarea
                  placeholder='Enter your response...'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className='w-full min-h-[20px] p-2 text-gray-700 border-0 focus:ring-0 focus:outline-none resize-none'
                />
              </div>
              <div className='flex items-center justify-end space-x-2 px-2 py-1 border-t border-[#E5E5E5]'>
                {[
                  { icon: Bold, label: "Bold", command: "bold" },
                  { icon: Italic, label: "Italic", command: "italic" },
                  { icon: Underline, label: "Underline", command: "underline" },
                  { icon: List, label: "Bullet List", command: "bullet" },
                  {
                    icon: ListOrdered,
                    label: "Numbered List",
                    command: "number",
                  },
                  { icon: Link, label: "Insert Link", command: "link" },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => formatText(item.command)}
                    className='p-1  text-gray-500 hover:text-gray-700 focus:outline-none'
                  >
                    <item.icon className='h-4 w-4' />
                    <span className='sr-only'>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
