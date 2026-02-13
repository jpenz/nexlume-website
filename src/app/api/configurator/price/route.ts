import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const config = await request.json();
  // Placeholder pricing engine
  return NextResponse.json({ unitPrice: 0, available: false, message: "Pricing engine coming in Phase 2" });
}
