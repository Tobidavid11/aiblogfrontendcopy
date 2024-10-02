import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

const OtpInputComponent = ({
  otp,
  setOtp,
}: {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (element: { key: string }, index: number) => {
    if (element.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedOtp = pastedData.slice(0, 6).split("");

    if (
      pastedOtp.length === 6 &&
      pastedOtp.every((char) => /^[0-9]$/.test(char))
    ) {
      setOtp(pastedOtp);
      inputRefs.current[5]?.focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((data, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          name="otp"
          maxLength={1}
          value={data}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          onFocus={(e) => e.target.select()}
          className="w-9 h-9 md:w-14 md:h-14 text-center text-base md:text-x rounded-none focus:border-[#FDC316] focus:outline-none"
        />
      ))}
    </div>
  );
};

export default OtpInputComponent;
