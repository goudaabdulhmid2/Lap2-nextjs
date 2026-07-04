"use client";

export default function Error({ error, reset }) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-zinc-500">{error?.message ?? "Unexpected error."}</p>
      <button
        onClick={reset}
        className="mt-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
      >
        Try again
      </button>
    </div>
  );
}
