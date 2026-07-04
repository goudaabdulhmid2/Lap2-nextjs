import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProductById } from "@/lib/api";
import { getReviews } from "@/lib/reviews";
import ReviewForm from "@/components/ReviewForm";
import { Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} - ShopLite Premium`,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  const reviews = await getReviews(id);
  const avgRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        
        {/* Left Column: Image Showcase */}
        <div className="flex h-[50vh] min-h-[400px] w-full items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-sky-50 via-zinc-100 to-zinc-200 p-12 shadow-inner dark:from-sky-950/20 dark:via-zinc-900/50 dark:to-zinc-950 lg:h-[600px]">
          <Image
            src={product.image}
            alt={product.name}
            width={240}
            height={240}
            priority
            className="drop-shadow-2xl transition-transform duration-700 hover:scale-105 dark:invert"
          />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
            {product.category}
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            {product.name}
          </h1>
          
          <div className="mt-4 flex items-center gap-4">
            <p className="text-3xl font-black text-zinc-900 dark:text-white">
              ${product.price.toFixed(2)}
            </p>
            {reviews.length > 0 && (
              <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span>{avgRating} ({reviews.length})</span>
              </div>
            )}
          </div>
          
          <p className="mt-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>
          
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button className="flex h-14 items-center justify-center rounded-2xl bg-zinc-900 px-8 text-base font-bold text-white transition-transform hover:scale-[1.02] active:scale-95 dark:bg-white dark:text-zinc-900 shadow-xl shadow-zinc-900/20 dark:shadow-white/10">
              Add to Cart
            </button>
            <button className="flex h-14 items-center justify-center rounded-2xl border-2 border-zinc-200 bg-transparent px-8 text-base font-bold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-900">
              Buy Now
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-black/5 pt-8 dark:border-white/10 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 dark:bg-sky-950/30">
                <Truck className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Free Shipping</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 dark:bg-green-950/30">
                <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">2 Year Warranty</p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-950/30">
                <RotateCcw className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">30 Day Returns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 mb-16 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"></div>

      <section className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Customer Reviews
          </h2>
          <span className="rounded-full bg-zinc-100 px-4 py-1 text-sm font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            {reviews.length} total
          </span>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_350px] items-start">
          <ul className="flex flex-col gap-6">
            {reviews.length === 0 ? (
              <p className="text-zinc-500 italic">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-[1.5rem] border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-sm font-bold text-white">
                        {review.author.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {review.author}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-zinc-200 text-zinc-200 dark:fill-zinc-800 dark:text-zinc-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {review.comment}
                  </p>
                </li>
              ))
            )}
          </ul>

          <div className="sticky top-24 rounded-[1.5rem] border border-black/5 bg-zinc-50/80 p-6 dark:border-white/10 dark:bg-zinc-900/40">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-4">Write a review</h3>
            <ReviewForm productId={product.id} />
          </div>
        </div>
      </section>
    </div>
  );
}
