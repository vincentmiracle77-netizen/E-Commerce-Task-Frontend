import type { Metadata } from "next";
import CartSuggestions from "@/components/cart/CartSuggestions";
import CartView from "@/components/cart/CartView";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";

export const metadata: Metadata = {
  title: "Your Cart | Shopcart",
  description: "Review the headphones in your cart and check out securely.",
};

export default function CartPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <CartView />
        <CartSuggestions />
      </main>
    </>
  );
}
