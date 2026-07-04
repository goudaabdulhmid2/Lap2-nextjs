import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProductById } from "@/lib/api";
import { getReviews } from "@/lib/reviews";
import ReviewForm from "@/components/ReviewForm";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} - ShopLite`,
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex h-48 w-48 shrink-0 items-center justify-center bg-zinc-50 dark:bg-zinc-900">
          <Image
            src={product.image}
            alt={product.name}
            width={120}
            height={120}
            priority
            className="dark:invert"
          />
        </div>
        <div>
          <p className="text-sm text-zinc-500">{product.category}</p>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-lg font-medium">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">
          Reviews ({reviews.length})
        </h2>

        <ul className="mt-3 flex flex-col gap-3">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-md border border-black/10 p-3 text-sm dark:border-white/10"
            >
              <p className="font-medium">
                {review.author} - {review.rating}/5
              </p>
              <p className="text-zinc-600 dark:text-zinc-400">
                {review.comment}
              </p>
            </li>
          ))}
        </ul>

        <h3 className="mt-6 font-medium">Add a review</h3>
        <div className="mt-3">
          <ReviewForm productId={product.id} />
        </div>
      </section>
    </div>
  );
}
