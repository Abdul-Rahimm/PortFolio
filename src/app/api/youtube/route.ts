import { NextResponse } from "next/server";
import { fetchYouTubeVideosByHandle } from "@/lib/youtube";
import { mockYouTubeVideos } from "@/data/mockData";
import { getCacheStats } from "@/lib/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const debug = searchParams.get("debug") === "true";

  try {
    // Using the channel handle from your URL
    const videos = await fetchYouTubeVideosByHandle("@AbdulRaheemCodes");

    const response = {
      success: true,
      data: videos,
      count: videos.length,
      cached: true, // Since we're using cache now
      ...(debug && { cacheStats: getCacheStats() }),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in YouTube API route:", error);

    // Fallback to mock data when API fails
    console.log("Falling back to mock YouTube data");

    return NextResponse.json({
      success: true, // Still return success since we have data
      data: mockYouTubeVideos.slice(0, 6), // Return first 6 mock videos
      count: 6,
      fallback: true,
      message: "Using mock data due to API issues",
    });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
