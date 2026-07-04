export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="grid animate-pulse grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-44 bg-zinc-100 dark:bg-zinc-900" />
        ))}
      </div>
    </div>
  );
}
