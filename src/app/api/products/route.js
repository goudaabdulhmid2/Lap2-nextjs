import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const results = await getAllProducts(q);
  return NextResponse.json(results);
}
