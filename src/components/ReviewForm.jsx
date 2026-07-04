"use client";

import { useActionState, useState, useEffect } from "react";
import { addReviewAction } from "@/app/products/[id]/actions";
import { Star } from "lucide-react";

const initialState = { success: false, error: null };

export default function ReviewForm({ productId }) {
  const [state, formAction, isPending] = useActionState(
    addReviewAction,
    initialState
  );
  
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formKey, setFormKey] = useState(Date.now()); // to reset form easily

  useEffect(() => {
    if (state.success) {
      setRating(5);
      setFormKey(Date.now());
    }
  }, [state.success]);

  return (
    <form key={formKey} action={formAction} className="flex flex-col gap-5 w-full">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="rating" value={rating} />

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Your Rating
        </label>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  (hoverRating || rating) >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-zinc-200 text-zinc-200 dark:fill-zinc-800 dark:text-zinc-800"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Name
        </label>
        <input
          type="text"
          name="author"
          placeholder="John Doe"
          required
          className="w-full rounded-xl border border-black/10 bg-white/50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/15 dark:border-white/10 dark:bg-black/20 dark:focus:bg-black/50"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Review
        </label>
        <textarea
          name="comment"
          placeholder="Share your thoughts about this product..."
          required
          rows={4}
          className="w-full resize-none rounded-xl border border-black/10 bg-white/50 px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-400/15 dark:border-white/10 dark:bg-black/20 dark:focus:bg-black/50"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-xl bg-sky-500 px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-sky-600 disabled:opacity-50 dark:bg-sky-600 dark:hover:bg-sky-500"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </button>

      {state.error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400" role="alert">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/50 dark:text-green-400" role="status">
          Your review has been submitted. Thank you!
        </div>
      )}
    </form>
  );
}
