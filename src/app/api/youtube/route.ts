import { NextResponse } from "next/server";
import { fetchYouTubeVideosByHandle } from "@/lib/youtube";
import { mockYouTubeVideos } from "@/data/mockData";
import { getCacheStats } from "@/lib/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const debug = searchParams.get("debug") === "true";

  console.log("🚀 YouTube API route called");
  console.log("Environment check:", {
    hasApiKey: !!process.env.YOUTUBE_API_KEY,
    hasChannelId: !!process.env.YOUTUBE_CHANNEL_ID,
    nodeEnv: process.env.NODE_ENV,
    vercelUrl: process.env.VERCEL_URL,
  });

  try {
    console.log("🔄 Attempting to fetch videos from YouTube API...");
    // Using the channel handle from your URL
    const videos = await fetchYouTubeVideosByHandle("@AbdulRaheemCodes");

    console.log(
      `✅ Successfully fetched ${videos.length} videos from YouTube API`
    );

    const response = {
      success: true,
      data: videos,
      count: videos.length,
      cached: true, // Since we're using cache now
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      ...(debug && { cacheStats: getCacheStats() }),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ YouTube API route error:", error);
    console.log("🎭 Falling back to mock YouTube data");

    return NextResponse.json(
      {
        success: false, // Changed to false to indicate API failure
        data: mockYouTubeVideos.slice(0, 5), // Return first 5 mock videos
        count: 5,
        fallback: true,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Using mock data due to API issues",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    ); // Return 200 since we're providing fallback data
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
