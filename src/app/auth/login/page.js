"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/auth/actions";
import Link from "next/link";

const initialState = { error: null };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-white/50 bg-white/60 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/40">
        <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">Log In</h1>
        
        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              suppressHydrationWarning
              className="w-full rounded-xl border border-black/10 bg-white/50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:border-white/10 dark:bg-black/20 dark:focus:bg-black/50"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              suppressHydrationWarning
              className="w-full rounded-xl border border-black/10 bg-white/50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:border-white/10 dark:bg-black/20 dark:focus:bg-black/50"
            />
          </div>
          
          <button
            type="submit"
            disabled={isPending}
            suppressHydrationWarning
            className="mt-4 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {isPending ? "Logging in..." : "Log In"}
          </button>

          {state?.error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{state.error}</p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-sky-600 hover:underline dark:text-sky-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
