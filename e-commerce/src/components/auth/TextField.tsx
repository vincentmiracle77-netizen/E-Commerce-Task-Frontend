"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/ui/Icons";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  icon: ReactNode;
  error?: string;
}

export default function TextField({
  label,
  icon,
  error,
  type = "text",
  className = "",
  ...props
}: TextFieldProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-foreground">
        {label}
      </label>
      <div
        className={`flex h-12 items-center gap-3 rounded-xl border bg-white px-4 text-gray-500 transition-colors focus-within:border-brand-900 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <span className="shrink-0">{icon}</span>
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-gray-400 ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="shrink-0 cursor-pointer text-gray-500 hover:text-foreground"
          >
            {visible ? (
              <EyeOffIcon width={20} height={20} />
            ) : (
              <EyeIcon width={20} height={20} />
            )}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
