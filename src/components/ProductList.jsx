import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-zinc-50 p-8 text-center text-sm text-zinc-500 dark:border-white/10 dark:bg-zinc-950/40 dark:text-zinc-400">
        No products found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
