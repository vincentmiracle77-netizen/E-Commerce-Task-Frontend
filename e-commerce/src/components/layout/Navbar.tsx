"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  CartIcon,
  ChevronDownIcon,
  CloseIcon,
  SearchIcon,
  SlidersIcon,
  UserIcon,
} from "@/components/ui/Icons";

const links = [
  { label: "Categories", href: "#", hasMenu: true },
  { label: "Deals", href: "#" },
  { label: "What's New", href: "#" },
  { label: "Delivery", href: "#" },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-1.5">
          <Image src="/logo.svg" alt="" width={26} height={26} priority />
          <span className="text-[19px] font-bold tracking-tight text-brand-900">
            Shopcart
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-4 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-medium text-foreground hover:text-brand-800"
            >
              {link.label}
              {link.hasMenu && <ChevronDownIcon width={12} height={12} />}
            </Link>
          ))}
        </nav>

        <form
          role="search"
          className="ml-auto hidden h-8 w-full max-w-[200px] items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-xs sm:flex"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="search"
            placeholder="Search Product"
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted"
          />
          <SearchIcon width={14} height={14} className="text-muted" />
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-3 text-xs font-medium sm:ml-0 sm:gap-4">
          <Link
            href="/login"
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap hover:text-brand-800"
          >
            <UserIcon width={15} height={15} />
            <span className="hidden sm:inline">Login</span>
          </Link>
          <Link
            href="/signup"
            className="hidden h-8 shrink-0 items-center whitespace-nowrap rounded-full bg-brand-900 px-4 text-xs font-medium text-white transition-colors hover:bg-brand-800 sm:inline-flex"
          >
            Sign Up
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-haspopup="dialog"
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative flex shrink-0 cursor-pointer items-center gap-1.5 hover:text-brand-800"
          >
            <span className="relative flex items-center">
              <CartIcon width={16} height={16} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-900 px-1 text-[9px] text-white">
                  {count}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">Cart</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface lg:hidden"
          >
            {menuOpen ? (
              <CloseIcon width={16} height={16} />
            ) : (
              <SlidersIcon width={16} height={16} className="rotate-90" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-gray-100 bg-white lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <form
              role="search"
              className="flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-xs sm:hidden"
              onSubmit={(event) => event.preventDefault()}
            >
              <SearchIcon width={14} height={14} className="text-muted" />
              <input
                type="search"
                placeholder="Search Product"
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted"
              />
            </form>

            <nav aria-label="Mobile" className="mt-2 flex flex-col sm:mt-0">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-gray-50 py-2.5 text-[13px] font-medium last:border-0"
                >
                  {link.label}
                  {link.hasMenu && <ChevronDownIcon width={12} height={12} />}
                </Link>
              ))}
            </nav>

            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="mt-3 mb-1 inline-flex h-10 w-full items-center justify-center rounded-full bg-brand-900 text-sm font-semibold text-white sm:hidden"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
