"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { CheckIcon, CloseIcon, TagIcon } from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";

export default function PromoCode() {
  const { promoCode, applyPromo, clearPromo } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const inputId = useId();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const applied = applyPromo(code);
    setError(!applied);
    if (applied) setCode("");
  };

  if (promoCode) {
    return (
      <div className="flex items-center justify-between rounded-md border border-brand-500/40 bg-brand-500/10 px-3 py-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-800">
          <CheckIcon width={13} height={13} />
          {promoCode} applied
        </span>
        <button
          type="button"
          onClick={clearPromo}
          aria-label="Remove promo code"
          className="flex cursor-pointer items-center justify-center rounded-full p-1 text-brand-800 transition-colors hover:bg-white"
        >
          <CloseIcon width={12} height={12} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-1.5">
      <label htmlFor={inputId} className="sr-only">
        Promo code
      </label>
      <div className="flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-white px-3">
        <TagIcon width={14} height={14} className="shrink-0 text-muted" />
        <input
          id={inputId}
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setError(false);
          }}
          placeholder="Promo code"
          aria-invalid={error}
          className="min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={!code.trim()}
          className="cursor-pointer text-[11px] font-semibold text-brand-800 transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:opacity-100"
        >
          Apply
        </button>
      </div>
      <p className={`text-[10px] ${error ? "text-red-600" : "text-muted"}`}>
        {error
          ? "That code is not valid. Try SHOP10 or SAVE20."
          : "Try SHOP10 for 10% off your order."}
      </p>
    </form>
  );
}
