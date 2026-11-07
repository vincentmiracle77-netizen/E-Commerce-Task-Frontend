"use client";

import Image from "next/image";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { HeartIcon } from "@/components/ui/Icons";
import StarRating from "@/components/ui/StarRating";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const { isInCart, toggleItem } = useCart();
  const inCart = isInCart(product.id);

  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/3.6] overflow-hidden rounded-lg bg-surface">
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={() => setWishlisted((w) => !w)}
          className={`absolute right-3 top-3 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/80 transition-colors ${
            wishlisted ? "text-red-500" : "text-foreground hover:text-red-500"
          }`}
        >
          <HeartIcon filled={wishlisted} width={14} height={14} />
        </button>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="text-[13px] font-semibold leading-snug">{product.name}</h3>
        <span className="text-[13px] font-bold">${product.price.toFixed(2)}</span>
      </div>
      <p className="mt-0.5 text-[10px] leading-snug text-muted">{product.description}</p>
      <div className="mt-1.5">
        <StarRating rating={product.rating} reviews={product.reviews} />
      </div>

      <Button
        size="sm"
        variant={inCart ? "solid" : "outline"}
        className="mt-3 w-full"
        aria-pressed={inCart}
        onClick={() => toggleItem(product.id)}
      >
        {inCart ? "Added" : "Add to Cart"}
      </Button>
    </article>
  );
}
