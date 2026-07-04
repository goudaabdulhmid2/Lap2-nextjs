import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-400/50 hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900/40 dark:hover:border-sky-400/30 dark:hover:bg-zinc-900/60">
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>
      
      <div className="relative flex h-48 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-sky-50 via-white to-zinc-50 overflow-hidden dark:from-sky-950/30 dark:via-zinc-900 dark:to-zinc-900/80">
        <Image
          src={product.image}
          alt={product.name}
          width={80}
          height={80}
          className="transition-transform duration-500 group-hover:scale-110 dark:invert"
        />
        <div className="absolute inset-0 bg-sky-500/0 transition-colors duration-300 group-hover:bg-sky-500/5" />
      </div>
      
      <div className="flex flex-1 flex-col pt-5 px-2">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-bold text-lg leading-tight text-zinc-900 transition-colors group-hover:text-sky-700 dark:text-zinc-50 dark:group-hover:text-sky-400">
            {product.name}
          </h2>
          <span className="shrink-0 rounded-full border border-black/5 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
            {product.category}
          </span>
        </div>
        
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
          {product.description || "A premium everyday essential designed for maximum utility and style."}
        </p>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-xl font-black text-zinc-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
          <button className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform hover:scale-110 active:scale-95 dark:bg-white dark:text-zinc-900 shadow-md">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
