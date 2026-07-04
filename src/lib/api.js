
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return `http://localhost:${process.env.PORT || 3000}`;
}


export async function fetchProducts(query) {
  const url = new URL("/api/products", getBaseUrl());
  if (query) url.searchParams.set("q", query);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}


export async function fetchProductById(id) {
  const url = new URL(`/api/products/${id}`, getBaseUrl());
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
