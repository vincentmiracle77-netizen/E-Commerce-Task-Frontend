"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BagIcon, CloseIcon, TruckIcon } from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";
import { FREE_SHIPPING_THRESHOLD, formatPrice, resolveLines } from "@/lib/cart";
import CartLineItem from "./CartLineItem";

export default function CartDrawer() {
  const { isOpen, closeCart, lines, count, totals } = useCart();
  const resolved = resolveLines(lines);
  const remainingForFreeShipping =
    FREE_SHIPPING_THRESHOLD - (totals.subtotal - totals.discount);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="animate-fade-in absolute inset-0 cursor-default bg-brand-950/40"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="animate-slide-in-right relative flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5">
          <h2 className="text-sm font-bold tracking-tight">
            Your Cart
            <span className="ml-1.5 text-[11px] font-medium text-muted">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
          >
            <CloseIcon width={14} height={14} />
          </button>
        </header>

        {resolved.length > 0 && remainingForFreeShipping > 0 && (
          <p className="flex items-center gap-2 border-b border-gray-100 bg-surface px-4 py-2 text-[10px] text-muted">
            <TruckIcon width={13} height={13} className="shrink-0 text-brand-700" />
            <span>
              Add{" "}
              <span className="font-semibold text-foreground">
                {formatPrice(remainingForFreeShipping)}
              </span>{" "}
              more for free delivery
            </span>
          </p>
        )}

        <div className="flex-1 overflow-y-auto px-4">
          {resolved.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-brand-800">
                <BagIcon width={22} height={22} />
              </span>
              <p className="mt-4 text-sm font-semibold">Your cart is empty</p>
              <p className="mt-1 max-w-[220px] text-[11px] leading-relaxed text-muted">
                Browse our headphones and pick your next pair.
              </p>
              <Link
                href="/#products"
                onClick={closeCart}
                className="mt-5 inline-flex h-9 items-center rounded-full bg-brand-900 px-5 text-[11px] font-semibold text-white transition-colors hover:bg-brand-800"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {resolved.map((line) => (
                <li key={line.product.id}>
                  <CartLineItem line={line} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {resolved.length > 0 && (
          <footer className="border-t border-gray-100 p-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-bold">Subtotal</span>
              <span className="text-base font-bold">
                {formatPrice(totals.subtotal - totals.discount)}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-muted">
              Taxes and delivery calculated at checkout.
            </p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-3 flex h-10 w-full items-center justify-center rounded-full bg-brand-900 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              View Cart & Checkout
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
