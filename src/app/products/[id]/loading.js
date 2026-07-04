export default function LoadingProduct() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-8 sm:px-6">
      <div className="flex gap-6">
        <div className="h-48 w-48 shrink-0 bg-zinc-100 dark:bg-zinc-900" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-24 bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-6 w-64 bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-4 w-20 bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-16 w-full bg-zinc-100 dark:bg-zinc-900" />
        </div>
      </div>
    </div>
  );
}
