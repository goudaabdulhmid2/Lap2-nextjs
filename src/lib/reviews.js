
const reviewsByProduct = new Map();

export async function getReviews(productId) {
  return reviewsByProduct.get(productId) ?? [];
}

export async function addReview(productId, { author, rating, comment }) {
  const list = reviewsByProduct.get(productId) ?? [];
  list.push({
    id: Date.now().toString(),
    author,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  });
  reviewsByProduct.set(productId, list);
}
