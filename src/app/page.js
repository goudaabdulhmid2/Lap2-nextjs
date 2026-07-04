import { fetchProducts } from "@/lib/api";
import ProductSearch from "@/components/ProductSearch";
import { Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "ShopLite - Premium Catalog",
  description: "Browse our full catalog of premium products.",
};

export default async function Home({ searchParams }) {
  const { q } = await searchParams;
  const products = await fetchProducts(q);
  const featuredProducts = products.slice(0, 3);
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-12">
      <section className="grid gap-6 rounded-[2rem] border border-white/40 bg-white/40 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/40 sm:p-8 lg:grid-cols-[1.4fr_0.6fr] lg:p-10">
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ShopLite / Premium</span>
            </div>
            <h1 className="max-w-2xl text-5xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-500">
                Elevate your everyday essentials.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
              Discover our curated collection of high-quality products designed to blend seamlessly into your lifestyle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white shadow-md dark:bg-white dark:text-zinc-900">
              {products.length} items
            </span>
            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700"></div>
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-zinc-200 bg-white/50 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <aside className="flex flex-col justify-between rounded-[1.5rem] border border-white/50 bg-gradient-to-b from-white/60 to-white/30 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:from-zinc-900/60 dark:to-zinc-900/30">
          <div className="flex items-start justify-between gap-4 border-b border-black/5 pb-4 dark:border-white/10">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                Editor's Picks
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Hand-selected favorites for you.
              </p>
            </div>
          </div>

          <div className="mt-6 flex-1 space-y-3">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-transparent bg-white/80 px-4 py-3 transition-all hover:border-sky-500/30 hover:shadow-md dark:bg-zinc-950/60 dark:hover:border-sky-400/30"
              >
                <div>
                  <p className="font-semibold text-zinc-900 transition-colors group-hover:text-sky-600 dark:text-zinc-100 dark:group-hover:text-sky-400">
                    {product.name}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {product.category}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </p>
                  <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-sky-500" />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <ProductSearch initialQuery={q ?? ""} initialProducts={products} />
    </div>
  );
}
