export default function Input({
  type = "text",
  placeholder,
  hasError,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-150
        placeholder:text-white/20 bg-black/30"
      style={{
        border: hasError ? "0.5px solid rgba(255,100,100,0.45)" : "",
        color: "rgba(210,240,215,0.9)",
        caretColor: "rgba(130,220,150,0.8)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.border = hasError
          ? "0.5px solid rgba(255,100,100,0.6)"
          : "";
      }}
      onBlur={(e) => {
        e.currentTarget.style.border = hasError
          ? "0.5px solid rgba(255,100,100,0.45)"
          : "0.5px solid rgba(120,180,130,0.15)";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
      {...rest}
    />
  );
}
