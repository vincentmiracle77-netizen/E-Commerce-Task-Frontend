"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const MAX_SUGGESTIONS = 4;

export default function CartSuggestions() {
  const { isInCart } = useCart();
  const suggestions = products
    .filter((product) => !isInCart(product.id))
    .slice(0, MAX_SUGGESTIONS);

  if (suggestions.length === 0) return null;

  return (
    <section aria-label="You might also like" className="mx-auto max-w-6xl px-4 pb-16">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold tracking-tight">You Might Also Like</h2>
        <Link
          href="/#products"
          className="text-[11px] font-semibold text-brand-800 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {suggestions.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
