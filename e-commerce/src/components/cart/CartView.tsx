"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";
import { formatPrice, resolveLines } from "@/lib/cart";
import CartEmptyState from "./CartEmptyState";
import CartLineItem from "./CartLineItem";
import CartSummary from "./CartSummary";

export default function CartView() {
  const { lines, count, clearCart, totals } = useCart();
  const resolved = resolveLines(lines);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 lg:pb-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Shopping Cart
          </h1>
          <p className="mt-1 text-[11px] text-muted">
            {count === 0
              ? "Your cart is waiting for its first pair."
              : `${count} ${count === 1 ? "item" : "items"} ready to ship`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {resolved.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="h-8 cursor-pointer rounded-full border border-gray-200 px-3.5 text-[11px] font-medium text-muted transition-colors hover:border-red-200 hover:text-red-600"
            >
              Clear cart
            </button>
          )}
          <Link
            href="/#products"
            className="flex h-8 items-center gap-1.5 rounded-full border border-gray-200 px-3.5 text-[11px] font-medium transition-colors hover:border-brand-900"
          >
            <ArrowLeftIcon width={12} height={12} />
            Keep shopping
          </Link>
        </div>
      </div>

      {resolved.length === 0 ? (
        <div className="mt-6">
          <CartEmptyState />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
          <section
            aria-label="Cart items"
            className="rounded-lg border border-gray-100 bg-white px-4 sm:px-5"
          >
            <div className="hidden items-center justify-between border-b border-gray-100 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted sm:flex">
              <span>Product</span>
              <span>Quantity & price</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {resolved.map((line) => (
                <li key={line.product.id}>
                  <CartLineItem line={line} variant="wide" />
                </li>
              ))}
            </ul>
          </section>

          <div id="order-summary" className="scroll-mt-20 lg:sticky lg:top-4 lg:self-start">
            <CartSummary variant="wide" />
          </div>
        </div>
      )}

      {resolved.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-100 bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center gap-3">
            <div className="min-w-0">
              <p className="text-[10px] text-muted">
                Total ({count} {count === 1 ? "item" : "items"})
              </p>
              <p className="text-base font-bold">{formatPrice(totals.total)}</p>
            </div>
            <a
              href="#order-summary"
              className="ml-auto flex h-11 shrink-0 items-center justify-center rounded-full bg-brand-900 px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Checkout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
