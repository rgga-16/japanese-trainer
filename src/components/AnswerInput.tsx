import { useEffect, useRef, useState } from "react";

interface AnswerInputProps {
  onSubmit: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

/** Controlled text input for typed Japanese answers, IME-safe. */
export default function AnswerInput({ onSubmit, disabled, placeholder }: AnswerInputProps) {
  const [value, setValue] = useState("");
  const composingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    inputRef.current?.focus();
  }, []);

  function submit() {
    if (disabled || value.trim() === "") return;
    onSubmit(value);
  }

  return (
    <div className="answer-input">
      <input
        ref={inputRef}
        type="text"
        lang="ja"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onCompositionStart={() => {
          composingRef.current = true;
        }}
        onCompositionEnd={() => {
          composingRef.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          if (composingRef.current || e.nativeEvent.isComposing) return;
          submit();
        }}
      />
      <button type="button" className="primary" onClick={submit} disabled={disabled}>
        答える
      </button>
    </div>
  );
}
