import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthShellProps {
  title: ReactNode;
  subtitle: ReactNode;
  image: string;
  imageAlt: string;
  children: ReactNode;
}

export default function AuthShell({
  title,
  subtitle,
  image,
  imageAlt,
  children,
}: AuthShellProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff3a8] px-4 py-8">
      <div className="relative w-full max-w-[460px] overflow-hidden rounded-3xl bg-white px-6 pb-8 pt-6 shadow-xl sm:px-9">
        <div
          aria-hidden
          className="absolute -right-6 -top-6 h-52 w-52 rounded-bl-[120px] rounded-tl-[90px] bg-hero sm:h-60 sm:w-60"
        />
        <div className="absolute right-0 top-0 h-44 w-40 overflow-hidden rounded-bl-[90px] sm:h-52 sm:w-52">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="208px"
            className="object-cover"
          />
        </div>

        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.svg" alt="" width={34} height={34} priority />
            <span className="text-2xl font-bold tracking-tight text-brand-900">
              Shopcart
            </span>
          </Link>

          <h1 className="mt-8 max-w-[240px] text-[34px] font-extrabold leading-[1.1] tracking-tight text-brand-950 sm:max-w-[260px]">
            {title}
          </h1>
          <p className="mt-3 max-w-[250px] text-[15px] leading-snug text-gray-600">
            {subtitle}
          </p>
        </div>

        <div className="relative mt-8">{children}</div>
      </div>
    </main>
  );
}
