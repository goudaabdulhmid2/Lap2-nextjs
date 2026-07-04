
export const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 59.99,
    category: "Audio",
    description: "Over-ear wireless headphones with noise cancellation.",
    image: "/product-placeholder.svg",
  },
  {
    id: "2",
    name: "Mechanical Keyboard",
    price: 89.99,
    category: "Accessories",
    description: "Tactile mechanical keyboard with RGB backlighting.",
    image: "/product-placeholder.svg",
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 129.99,
    category: "Wearables",
    description: "Fitness tracking smart watch with heart-rate monitor.",
    image: "/product-placeholder.svg",
  },
  {
    id: "4",
    name: "Portable Speaker",
    price: 39.99,
    category: "Audio",
    description: "Compact Bluetooth speaker with 12-hour battery life.",
    image: "/product-placeholder.svg",
  },
];


export async function getAllProducts(query) {
  if (!query) return products;
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export async function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}
