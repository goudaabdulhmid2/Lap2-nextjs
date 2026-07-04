"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
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
    <div className="space-y-6 rounded-[2rem] border border-white/50 bg-white/60 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/40 sm:p-8">
      <label className="block relative">
        <span className="sr-only">Search the catalog</span>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-400 transition-colors group-focus-within:text-sky-500">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for headphones, audio, or accessories..."
            className="w-full rounded-full border border-black/10 bg-white/80 py-4 pl-12 pr-4 text-sm shadow-sm outline-none transition-all placeholder:text-zinc-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/20 dark:border-white/10 dark:bg-zinc-950/60 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-950"
          />
        </div>
      </label>

      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
}
