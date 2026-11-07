"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MAX_QUANTITY, PROMO_CODES, resolveLines, summarize } from "@/lib/cart";
import type { CartLine, CartTotals } from "@/types/cart";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  totals: CartTotals;
  promoCode: string | null;
  isOpen: boolean;
  isInCart: (id: string) => boolean;
  quantityOf: (id: string) => number;
  addItem: (id: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  toggleItem: (id: string) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const clampQuantity = (quantity: number) =>
  Math.min(MAX_QUANTITY, Math.max(1, quantity));

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((id: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.productId === id);
      if (!existing) {
        return [...prev, { productId: id, quantity: clampQuantity(quantity) }];
      }
      return prev.map((line) =>
        line.productId === id
          ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
          : line,
      );
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((line) => line.productId !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      prev.map((line) =>
        line.productId === id
          ? { ...line, quantity: clampQuantity(quantity) }
          : line,
      ),
    );
  }, []);

  const increment = useCallback((id: string) => {
    setLines((prev) =>
      prev.map((line) =>
        line.productId === id
          ? { ...line, quantity: clampQuantity(line.quantity + 1) }
          : line,
      ),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setLines((prev) =>
      prev.flatMap((line) => {
        if (line.productId !== id) return [line];
        return line.quantity > 1
          ? [{ ...line, quantity: line.quantity - 1 }]
          : [];
      }),
    );
  }, []);

  const toggleItem = useCallback((id: string) => {
    setLines((prev) =>
      prev.some((line) => line.productId === id)
        ? prev.filter((line) => line.productId !== id)
        : [...prev, { productId: id, quantity: 1 }],
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    setPromoCode(null);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized || !(normalized in PROMO_CODES)) return false;
    setPromoCode(normalized);
    return true;
  }, []);

  const clearPromo = useCallback(() => setPromoCode(null), []);

  const totals = useMemo(
    () => summarize(resolveLines(lines), promoCode ? PROMO_CODES[promoCode] : 0),
    [lines, promoCode],
  );

  const value = useMemo<CartContextValue>(() => {
    const quantityOf = (id: string) =>
      lines.find((line) => line.productId === id)?.quantity ?? 0;

    return {
      lines,
      count: totals.itemCount,
      totals,
      promoCode,
      isOpen,
      isInCart: (id) => quantityOf(id) > 0,
      quantityOf,
      addItem,
      removeItem,
      setQuantity,
      increment,
      decrement,
      toggleItem,
      clearCart,
      applyPromo,
      clearPromo,
      openCart,
      closeCart,
    };
  }, [
    lines,
    totals,
    promoCode,
    isOpen,
    addItem,
    removeItem,
    setQuantity,
    increment,
    decrement,
    toggleItem,
    clearCart,
    applyPromo,
    clearPromo,
    openCart,
    closeCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
