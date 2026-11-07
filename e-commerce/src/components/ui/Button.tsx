import type { ButtonHTMLAttributes } from "react";

type Variant = "solid" | "outline";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  solid: "bg-brand-900 text-white hover:bg-brand-800 border border-brand-900",
  outline:
    "bg-white text-foreground border border-gray-300 hover:bg-brand-900 hover:border-brand-900 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-4 text-[11px]",
  md: "h-10 px-6 text-sm",
};

export default function Button({
  variant = "solid",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center rounded-full font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
