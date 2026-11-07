"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  align?: "left" | "right";
  prefix?: string;
}

export default function FilterDropdown({
  label,
  options,
  value,
  onChange,
  align = "left",
  prefix,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-[11px] font-medium transition-colors ${
          selected
            ? "border-brand-900 bg-brand-900 text-white"
            : "border-gray-200 bg-white text-foreground hover:border-brand-900"
        }`}
      >
        {prefix}
        {selected ? selected.label : label}
        <ChevronDownIcon width={12} height={12} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className={`absolute top-9 z-20 min-w-40 rounded-md border border-gray-100 bg-white py-1 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {value !== null && (
            <li>
              <button
                type="button"
                className="w-full cursor-pointer px-3 py-1.5 text-left text-[11px] text-muted hover:bg-surface"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
              >
                Clear
              </button>
            </li>
          )}
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                className={`w-full cursor-pointer px-3 py-1.5 text-left text-[11px] hover:bg-surface ${
                  option.value === value ? "font-semibold text-brand-800" : ""
                }`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
