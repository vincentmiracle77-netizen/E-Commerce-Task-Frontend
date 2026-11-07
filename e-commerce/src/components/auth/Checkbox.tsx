import type { InputHTMLAttributes, ReactNode } from "react";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  children: ReactNode;
}

export default function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
      <input
        type="checkbox"
        className="h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-gray-400 accent-brand-900"
        {...props}
      />
      <span>{children}</span>
    </label>
  );
}
