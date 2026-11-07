import { products } from "@/data/products";
import type { CartLine, CartTotals } from "@/types/cart";
import type { Product } from "@/types/product";

export const MAX_QUANTITY = 10;
export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FEE = 9;

export const PROMO_CODES: Record<string, number> = {
  SHOP10: 0.1,
  SAVE20: 0.2,
};

export interface ResolvedLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

const productsById = new Map(products.map((product) => [product.id, product]));

export function getProductById(id: string): Product | undefined {
  return productsById.get(id);
}

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  const resolved: ResolvedLine[] = [];

  for (const line of lines) {
    const product = productsById.get(line.productId);
    if (!product) continue;
    resolved.push({
      product,
      quantity: line.quantity,
      lineTotal: product.price * line.quantity,
    });
  }

  return resolved;
}

export function summarize(
  lines: ResolvedLine[],
  discountRate = 0,
): CartTotals {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const discount = subtotal * discountRate;
  const payable = subtotal - discount;
  const shipping =
    lines.length === 0 || payable >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  return {
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal,
    discount,
    shipping,
    total: payable + shipping,
  };
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}
