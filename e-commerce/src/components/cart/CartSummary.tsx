"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";
import { FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/cart";
import PromoCode from "./PromoCode";

export default function CartSummary({
  variant = "compact",
}: {
  variant?: "compact" | "wide";
}) {
  const { totals, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const isWide = variant === "wide";

  const handleCheckout = () => {
    setOrderNumber(`SC-${Date.now().toString().slice(-6)}`);
    clearCart();
  };

  if (orderNumber) {
    return (
      <section
        aria-label="Order confirmation"
        className={`rounded-lg border border-gray-100 bg-white text-center ${
          isWide ? "p-6 sm:p-8" : "p-5"
        }`}
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/15 text-brand-800">
          <CheckIcon width={22} height={22} />
        </span>
        <h2 className="mt-4 text-base font-bold tracking-tight">Order placed</h2>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          Thanks for shopping with us. Your order{" "}
          <span className="font-semibold text-foreground">{orderNumber}</span> is
          confirmed and a receipt is on its way.
        </p>
        <p className="mt-3 rounded-md bg-surface px-3 py-2 text-[10px] text-muted">
          Your cart is now empty.
        </p>
        <Link
          href="/#products"
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-brand-900 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
        >
          Continue shopping
          <ArrowRightIcon width={15} height={15} />
        </Link>
      </section>
    );
  }

  const remainingForFreeShipping =
    FREE_SHIPPING_THRESHOLD - (totals.subtotal - totals.discount);

  return (
    <section
      aria-label="Order summary"
      className={`rounded-lg border border-gray-100 bg-white ${
        isWide ? "p-5 sm:p-6" : "p-4"
      }`}
    >
      <h2 className={`font-bold tracking-tight ${isWide ? "text-base" : "text-sm"}`}>
        Order Summary
      </h2>
      <p className="mt-1 text-[10px] text-muted">
        {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-[11px]">
        <div className="flex justify-between text-muted">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">
            {formatPrice(totals.subtotal)}
          </span>
        </div>
        {totals.discount > 0 && (
          <div className="flex justify-between text-brand-600">
            <span>Discount</span>
            <span className="font-medium">-{formatPrice(totals.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-muted">
          <span>Delivery</span>
          <span className="font-medium text-foreground">
            {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
          </span>
        </div>
      </div>

      {remainingForFreeShipping > 0 && (
        <p className="mt-3 flex items-center gap-1.5 rounded-md bg-surface px-3 py-2 text-[10px] text-muted">
          <TruckIcon width={12} height={12} className="shrink-0" />
          Add {formatPrice(remainingForFreeShipping)} more for free delivery.
        </p>
      )}

      <div className="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-4">
        <span className={`font-bold ${isWide ? "text-sm" : "text-[13px]"}`}>
          Total
        </span>
        <span className={`font-bold ${isWide ? "text-lg" : "text-base"}`}>
          {formatPrice(totals.total)}
        </span>
      </div>

      <div className="mt-4">
        <PromoCode />
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-900 text-sm font-semibold text-white transition-colors hover:bg-brand-800 sm:h-10"
      >
        Checkout
        <ArrowRightIcon width={15} height={15} />
      </button>

      <Link
        href="/#products"
        className="mt-2 flex h-9 w-full items-center justify-center rounded-full text-[11px] font-medium text-brand-800 transition-colors hover:bg-surface"
      >
        Continue shopping
      </Link>

      <div className="mt-4 flex items-center justify-center gap-4 border-t border-gray-100 pt-4 text-[10px] text-muted">
        <span className="flex items-center gap-1">
          <ShieldIcon width={12} height={12} />
          Secure payment
        </span>
        <span className="flex items-center gap-1">
          <TruckIcon width={12} height={12} />
          30-day returns
        </span>
      </div>
    </section>
  );
}
