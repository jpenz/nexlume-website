import { NextResponse } from "next/server";
export async function GET(request: Request) {
  // Placeholder Algolia search proxy
  return NextResponse.json({ results: [], message: "Search endpoint coming in Phase 1" });
}
