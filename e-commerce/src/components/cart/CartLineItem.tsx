"use client";

import Image from "next/image";
import { TrashIcon } from "@/components/ui/Icons";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/cart";
import type { ResolvedLine } from "@/lib/cart";
import QuantityStepper from "./QuantityStepper";

interface CartLineItemProps {
  line: ResolvedLine;
  variant?: "compact" | "wide";
}

const imageSizes = {
  compact: "w-[68px] h-[68px]",
  wide: "w-20 h-20 sm:w-28 sm:h-28",
};

export default function CartLineItem({
  line,
  variant = "compact",
}: CartLineItemProps) {
  const { setQuantity, removeItem } = useCart();
  const { product, quantity, lineTotal } = line;
  const isWide = variant === "wide";

  return (
    <article
      className={`flex gap-3 ${isWide ? "gap-4 py-5 sm:gap-5" : "py-4"}`}
      aria-label={product.name}
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg bg-surface ${imageSizes[variant]}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={isWide ? "112px" : "68px"}
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={`truncate font-semibold leading-snug ${
                isWide ? "text-sm" : "text-[13px]"
              }`}
            >
              {product.name}
            </h3>
            <p
              className={`mt-0.5 text-muted ${isWide ? "text-xs" : "text-[10px]"}`}
            >
              {product.type} &middot; {product.color}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className={`font-bold ${isWide ? "text-sm" : "text-[13px]"}`}>
              {formatPrice(lineTotal)}
            </p>
            {quantity > 1 && (
              <p className="mt-0.5 text-[10px] text-muted">
                {formatPrice(product.price)} each
              </p>
            )}
          </div>
        </div>

        <div
          className={`mt-auto flex items-center justify-between gap-2 ${isWide ? "mt-4" : "mt-3"}`}
        >
          <QuantityStepper
            value={quantity}
            onChange={(next) => setQuantity(product.id, next)}
            label={product.name}
            size={isWide ? "md" : "sm"}
          />
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            aria-label={`Remove ${product.name} from cart`}
            className="flex cursor-pointer items-center gap-1 rounded-full px-2 py-1.5 text-[10px] font-medium text-muted transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon width={12} height={12} />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </article>
  );
}
