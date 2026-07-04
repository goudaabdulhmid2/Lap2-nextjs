"use server";

import { revalidatePath } from "next/cache";
import { getProductById } from "@/lib/products";
import { addReview } from "@/lib/reviews";

export async function addReviewAction(_prevState, formData) {
  const productId = formData.get("productId")?.toString() ?? "";
  const author = formData.get("author")?.toString().trim() ?? "";
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment")?.toString().trim() ?? "";

  const product = await getProductById(productId);
  if (!product) {
    return { success: false, error: "Product not found." };
  }
  if (!author) {
    return { success: false, error: "Name is required." };
  }
  if (!comment || comment.length < 3) {
    return { success: false, error: "Review must be at least 3 characters." };
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { success: false, error: "Rating must be between 1 and 5." };
  }

  await addReview(productId, { author, rating, comment });

  revalidatePath(`/products/${productId}`);

  return { success: true, error: null };
}
