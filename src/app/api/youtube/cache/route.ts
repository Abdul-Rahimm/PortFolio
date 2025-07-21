import { clearYouTubeCache, getCacheStats } from "@/lib/cache";
import { NextResponse } from "next/server";
// GET route to check cache stats
export async function GET() {
  try {
    const stats = getCacheStats();

    return NextResponse.json({
      success: true,
      ...stats,
    });
  } catch (error) {
    console.error("Error getting cache stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get cache stats",
      },
      { status: 500 }
    );
  }
}

// DELETE route to clear cache
export async function DELETE() {
  try {
    clearYouTubeCache();

    return NextResponse.json({
      success: true,
      message: "YouTube cache cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing cache:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to clear cache",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
