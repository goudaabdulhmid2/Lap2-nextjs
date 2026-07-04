import Link from "next/link";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import { logoutAction } from "@/app/auth/actions";
import { getUser } from "@/lib/dal";

export default async function Navbar() {
  const user = await getUser();
  const isAuthenticated = !!user;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/75 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/70 transition-all">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={isAuthenticated ? "/" : "/auth/login"}
          className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white hover:opacity-80 transition-opacity"
        >
          ShopLite
        </Link>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                {user.email}
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="flex items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                <LogIn className="h-4 w-4" />
                <span>Log in</span>
              </Link>
              <Link
                href="/auth/signup"
                className="flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <UserPlus className="h-4 w-4" />
                <span>Sign up</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
