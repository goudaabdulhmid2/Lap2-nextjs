import { fetchProducts } from "@/lib/api";
import ProductSearch from "@/components/ProductSearch";

export const metadata = {
  title: "ShopLite - All Products",
  description: "Browse our full catalog of products.",
};

export default async function Home({ searchParams }) {
  const { q } = await searchParams;
  const products = await fetchProducts(q);
  const featuredProducts = products.slice(0, 3);
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-12">
      <section className="grid gap-6 rounded-[2rem] border border-black/5 bg-white/70 p-6 shadow-[0_16px_50px_-35px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/60 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-600 dark:text-sky-400">
              ShopLite / catalog
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance text-zinc-950 dark:text-white sm:text-5xl lg:text-6xl">
              A small storefront for a small set of products.
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-700 dark:text-sky-300">
              {products.length} items
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-black/5 bg-zinc-50/80 p-5 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between gap-4 border-b border-black/5 pb-3 dark:border-white/10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                Featured on the shelf
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                A quick look at what is actually in the catalog.
              </p>
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              01
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 dark:bg-zinc-950/60"
              >
                <div>
                  <p className="font-medium text-zinc-950 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <ProductSearch initialQuery={q ?? ""} initialProducts={products} />
    </div>
  );
}
