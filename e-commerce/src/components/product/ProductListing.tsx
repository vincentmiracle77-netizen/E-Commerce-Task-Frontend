"use client";

import { useMemo, useState } from "react";
import { SlidersIcon } from "@/components/ui/Icons";
import type { Product } from "@/types/product";
import FilterDropdown, { type FilterOption } from "./FilterDropdown";
import ProductCard from "./ProductCard";

interface Filters {
  type: string | null;
  price: string | null;
  review: string | null;
  color: string | null;
  material: string | null;
  offer: string | null;
}

const emptyFilters: Filters = {
  type: null,
  price: null,
  review: null,
  color: null,
  material: null,
  offer: null,
};

const typeOptions: FilterOption[] = [
  { label: "Earbuds", value: "Earbuds" },
  { label: "Over-ear", value: "Over-ear" },
  { label: "On-ear", value: "On-ear" },
];
const priceOptions: FilterOption[] = [
  { label: "Under $100", value: "0-100" },
  { label: "$100 - $300", value: "100-300" },
  { label: "Over $300", value: "300-100000" },
];
const reviewOptions: FilterOption[] = [
  { label: "4.5 & up", value: "4.5" },
  { label: "4.0 & up", value: "4" },
];
const colorOptions: FilterOption[] = [
  { label: "Black", value: "Black" },
  { label: "Pink", value: "Pink" },
  { label: "Red", value: "Red" },
  { label: "White", value: "White" },
];
const materialOptions: FilterOption[] = [
  { label: "Plastic", value: "Plastic" },
  { label: "Metal", value: "Metal" },
  { label: "Leather", value: "Leather" },
];
const offerOptions: FilterOption[] = [
  { label: "On offer", value: "yes" },
];
const sortOptions: FilterOption[] = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

function matches(product: Product, f: Filters) {
  if (f.type && product.type !== f.type) return false;
  if (f.color && product.color !== f.color) return false;
  if (f.material && product.material !== f.material) return false;
  if (f.offer && !product.onOffer) return false;
  if (f.review && product.rating < Number(f.review)) return false;
  if (f.price) {
    const [min, max] = f.price.split("-").map(Number);
    if (product.price < min || product.price > max) return false;
  }
  return true;
}

export default function ProductListing({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<string | null>(null);

  const setFilter = (key: keyof Filters) => (value: string | null) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const hasFilters = Object.values(filters).some(Boolean);

  const visible = useMemo(() => {
    const list = products.filter((p) => matches(p, filters));
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, filters, sort]);

  return (
    <section id="products" className="mx-auto max-w-6xl px-4 pb-16">
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <FilterDropdown label="Headphone Type" options={typeOptions} value={filters.type} onChange={setFilter("type")} />
        <FilterDropdown label="Price" options={priceOptions} value={filters.price} onChange={setFilter("price")} />
        <FilterDropdown label="Review" options={reviewOptions} value={filters.review} onChange={setFilter("review")} />
        <FilterDropdown label="Color" options={colorOptions} value={filters.color} onChange={setFilter("color")} />
        <FilterDropdown label="Material" options={materialOptions} value={filters.material} onChange={setFilter("material")} />
        <FilterDropdown label="Offer" options={offerOptions} value={filters.offer} onChange={setFilter("offer")} />
        <button
          type="button"
          onClick={() => setFilters(emptyFilters)}
          disabled={!hasFilters}
          className="flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-[11px] font-medium hover:border-brand-900 disabled:cursor-default disabled:hover:border-gray-200"
        >
          <SlidersIcon width={12} height={12} />
          {hasFilters ? "Clear Filters" : "All Filters"}
        </button>
        <div className="ml-auto">
          <FilterDropdown
            label="Sort by"
            options={sortOptions}
            value={sort}
            onChange={setSort}
            align="right"
          />
        </div>
      </div>

      <h2 className="mt-8 text-xl font-bold tracking-tight">
        Headphones For You!
      </h2>

      {visible.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-lg bg-surface py-16 text-center text-sm text-muted">
          No headphones match your filters.
        </p>
      )}
    </section>
  );
}
