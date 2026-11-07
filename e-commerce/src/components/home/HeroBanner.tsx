import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section
      aria-label="Promotion"
      className="mx-auto mt-4 max-w-6xl px-4"
    >
      <div className="relative flex min-h-60 items-center overflow-hidden rounded-lg bg-hero px-8 sm:min-h-64 sm:px-14">
        <div className="relative z-10 max-w-sm py-8">
          <h1 className="text-2xl font-bold leading-[1.25] tracking-tight text-brand-950 sm:text-[32px]">
            Grab Upto 50% Off On
            <br />
            Selected Headphone
          </h1>
          <Link
            href="#products"
            className="mt-6 inline-flex h-10 items-center rounded-full bg-brand-900 px-7 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Buy Now
          </Link>
        </div>
        <div
          className="absolute inset-y-0 right-0 hidden w-1/2 sm:block"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 35%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 35%)",
          }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Woman in a purple sweatshirt enjoying music with headphones"
            fill
            priority
            sizes="(min-width: 1152px) 560px, 50vw"
            className="object-cover object-[60%_30%]"
          />
        </div>
      </div>
    </section>
  );
}
