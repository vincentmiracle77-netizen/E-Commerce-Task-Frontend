"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  CartIcon,
  ChevronDownIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/Icons";

const links = [
  { label: "Categories", href: "#", hasMenu: true },
  { label: "Deals", href: "#" },
  { label: "What's New", href: "#" },
  { label: "Delivery", href: "#" },
];

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-1.5">
          <Image src="/logo.svg" alt="" width={26} height={26} priority />
          <span className="text-[19px] font-bold tracking-tight text-brand-900">
            Shopcart
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-xs font-medium text-foreground hover:text-brand-800"
            >
              {link.label}
              {link.hasMenu && <ChevronDownIcon width={12} height={12} />}
            </Link>
          ))}
        </nav>

        <form
          role="search"
          className="ml-auto flex h-8 w-full max-w-[200px] items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-xs"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="Search Product"
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted"
          />
          <SearchIcon width={14} height={14} className="text-muted" />
        </form>

        <div className="flex items-center gap-4 text-xs font-medium">
          <Link href="/login" className="flex items-center gap-1.5 hover:text-brand-800">
            <UserIcon width={15} height={15} />
            <span>Login</span>
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-8 items-center rounded-full bg-brand-900 px-4 text-xs font-medium text-white transition-colors hover:bg-brand-800"
          >
            Sign Up
          </Link>
          <Link href="#" className="relative flex items-center gap-1.5 hover:text-brand-800">
            <CartIcon width={15} height={15} />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-900 px-1 text-[9px] text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
