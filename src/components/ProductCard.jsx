import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white/90 p-4 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-[0_20px_60px_-35px_rgba(14,165,233,0.45)] dark:border-white/10 dark:bg-white/5"
    >
      <div className="relative flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 via-white to-zinc-100 dark:from-sky-950/40 dark:via-zinc-950 dark:to-zinc-900">
        <Image
          src={product.image}
          alt={product.name}
          width={64}
          height={64}
          className="transition-transform duration-200 group-hover:scale-105 dark:invert"
        />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-semibold leading-6 text-zinc-950 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">
            {product.name}
          </h2>
          <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
            {product.category}
          </span>
        </div>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          A clean, focused product presentation for quicker browsing.
        </p>
        <p className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
