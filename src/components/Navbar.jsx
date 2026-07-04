import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-white/75 backdrop-blur dark:border-white/10 dark:bg-zinc-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white"
        >
          ShopLite
        </Link>
        <Link
          href="/"
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:border-sky-500/40 hover:text-sky-700 dark:border-white/10 dark:text-zinc-300 dark:hover:text-sky-300"
        >
          Products
        </Link>
      </nav>
    </header>
  );
}
