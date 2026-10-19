import { Eye, EyeClosed, ShowerHead } from "lucide-react";
import React, { useState } from "react";

function PasswordField({
  placeholder,
  hasError,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
}) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  return (
    <div
      className="w-full rounded-xl px-4 py-2.5 transition-all duration-150 bg-black/30 flex justify-between"
      style={{
        border: hasError ? "0.5px solid rgba(255,100,100,0.45)" : "",
      }}
    >
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder={placeholder}
        className="w-full text-sm outline-none placeholder:text-white/20"
        style={{
          color: "rgba(210,240,215,0.9)",
          caretColor: "rgba(130,220,150,0.8)",
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = hasError
            ? "0.5px solid rgba(255,100,100,0.45)"
            : "0.5px solid rgba(120,180,130,0.15)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }}
        {...rest}
      />
      {passwordVisible ? (
        <EyeClosed
          className="w-5 h-5 text-neutral-500 cursor-pointer"
          onClick={() => setPasswordVisible((prev) => !prev)}
        />
      ) : (
        <Eye
          className="w-5 h-5 text-neutral-500 cursor-pointer"
          onClick={() => setPasswordVisible((prev) => !prev)}
        />
      )}
    </div>
  );
}

export default PasswordField;
