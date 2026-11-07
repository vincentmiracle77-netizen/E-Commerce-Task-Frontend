import Link from "next/link";
import { BagIcon } from "@/components/ui/Icons";

export default function CartEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-brand-800">
        <BagIcon width={26} height={26} />
      </span>
      <h2 className="mt-5 text-base font-bold tracking-tight">
        Your cart is empty
      </h2>
      <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted">
        Nothing here yet. Explore our best-selling headphones and add something
        you like.
      </p>
      <Link
        href="/#products"
        className="mt-6 inline-flex h-10 items-center rounded-full bg-brand-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
      >
        Browse headphones
      </Link>
    </div>
  );
}
