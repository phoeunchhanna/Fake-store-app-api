import { NextResponse } from "next/server";

// GET request
export async function GET() {
  // Example: call external API
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return NextResponse.json({
    message: "Data fetched successfully",
    data,
  });
}

// POST request
export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    message: "POST data received",
    body,
  });
}
