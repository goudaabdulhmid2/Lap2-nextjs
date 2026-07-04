"use client";

import { useEffect, useState } from "react";
import ProductList from "./ProductList";

export default function ProductSearch({ initialQuery = "", initialProducts }) {
  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState(initialProducts);

  // Wait 300ms after the user stops typing, then ask the API for matching products.
  useEffect(() => {
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProducts(data);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-5 rounded-[1.75rem] border border-black/5 bg-white/75 p-4 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.3)] backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-6">
      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
          Search the shelf
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try headphones, audio, or accessories"
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:border-white/10 dark:bg-zinc-950/60 dark:placeholder:text-zinc-500"
        />
      </label>

      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
}
