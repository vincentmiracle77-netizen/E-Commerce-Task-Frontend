import Link from "next/link";
import { ChevronDownIcon, PhoneIcon } from "@/components/ui/Icons";

export default function TopBar() {
  return (
    <div className="bg-brand-950 text-[11px] text-white">
      <div className="mx-auto flex h-8 max-w-6xl items-center justify-between px-4">
        <a
          href="tel:+1002003000"
          className="hidden items-center gap-1.5 sm:flex"
        >
          <PhoneIcon width={12} height={12} />
          +1 002 003 000
        </a>
        <p className="flex-1 text-center sm:flex-none">
          Get 50% Off on Selected Items
          <span className="mx-2 text-white/40">|</span>
          <Link href="#products" className="font-semibold underline-offset-2 hover:underline">
            Shop Now
          </Link>
        </p>
        <div className="hidden items-center gap-4 sm:flex">
          <button type="button" className="flex cursor-pointer items-center gap-1">
            Eng <ChevronDownIcon width={12} height={12} />
          </button>
          <button type="button" className="flex cursor-pointer items-center gap-1">
            Location <ChevronDownIcon width={12} height={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
