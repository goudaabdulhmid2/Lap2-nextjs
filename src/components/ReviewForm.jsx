"use client";

import { useActionState } from "react";
import { addReviewAction } from "@/app/products/[id]/actions";

const initialState = { success: false, error: null };

export default function ReviewForm({ productId }) {
  const [state, formAction, isPending] = useActionState(
    addReviewAction,
    initialState
  );

  return (
    <form action={formAction} className="flex flex-col gap-3 max-w-sm">
      <input type="hidden" name="productId" value={productId} />

      <input
        type="text"
        name="author"
        placeholder="Your name"
        required
        className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
      />

      <select
        name="rating"
        defaultValue="5"
        className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
      >
        {[5, 4, 3, 2, 1].map((n) => (
          <option key={n} value={n}>
            {n} star{n > 1 ? "s" : ""}
          </option>
        ))}
      </select>

      <textarea
        name="comment"
        placeholder="Write your review..."
        required
        rows={3}
        className="rounded-md border border-black/10 px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent"
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950"
      >
        {isPending ? "Submitting..." : "Submit review"}
      </button>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-600" role="status">
          Review submitted, thank you!
        </p>
      )}
    </form>
  );
}
