import {
  useRef,
  useState,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
} from "react";

interface CodeInputProps {
  length?: number;
  onComplete?: (code: string) => void | Promise<void>;
}

export default function CodeInput({ length = 6, onComplete }: CodeInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const triggerCompleteIfDone = (nextValues: string[]) => {
    const code = nextValues.join("");
    if (code.length === length && !nextValues.includes("")) {
      onComplete?.(code);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const raw = e.target.value;
    const digit = raw.replace(/[^0-9]/g, "").slice(-1);

    const nextValues = [...values];
    nextValues[index] = digit;
    setValues(nextValues);

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    triggerCompleteIfDone(nextValues);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (values[index]) {
        const nextValues = [...values];
        nextValues[index] = "";
        setValues(nextValues);
      } else if (index > 0) {
        const nextValues = [...values];
        nextValues[index - 1] = "";
        setValues(nextValues);
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);
    if (!pasted) return;

    const nextValues = Array(length).fill("");
    for (let i = 0; i < pasted.length; i++) {
      nextValues[i] = pasted[i];
    }
    setValues(nextValues);

    const lastFilledIndex = Math.min(pasted.length, length - 1);
    focusInput(lastFilledIndex);

    triggerCompleteIfDone(nextValues);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="h-12 w-11 sm:h-14 sm:w-12 rounded-lg border border-neutral-600 bg-black/40 text-center text-xl font-semibold text-white shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
        />
      ))}
    </div>
  );
}
