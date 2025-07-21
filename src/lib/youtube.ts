import { mockYouTubeVideos } from "@/data/mockData";
import { YouTubeVideo } from "@/types";
import { getCacheKey } from "./cache";
import { getFromCache, setCache } from "./cache";
import {
  YouTubeApiResponse,
  YouTubeVideoDetails,
} from "@/interfaces/youtubeInterfaces";

function parseYouTubeDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export async function fetchYouTubeVideosByHandle(
  handle: string
): Promise<YouTubeVideo[]> {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    console.error("YouTube API key not configured");
    return [];
  }

  // Check cache first
  const cacheKey = getCacheKey(undefined, handle);
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // Search for the channel by handle
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        handle
      )}&type=channel&key=${API_KEY}`
    );

    if (!searchResponse.ok) {
      throw new Error("Failed to search for channel");
    }

    const searchData = await searchResponse.json();
    const channelId = searchData.items[0]?.id?.channelId;

    if (!channelId) {
      throw new Error("Channel not found");
    }

    // Now get videos using the found channel ID
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=6&order=date&type=video&key=${API_KEY}`
    );

    if (!videosResponse.ok) {
      throw new Error("Failed to fetch videos");
    }

    const videosData: YouTubeApiResponse = await videosResponse.json();

    // Get video IDs for detailed information
    const videoIds = videosData.items
      .map((item) => item.id.videoId)
      .filter(Boolean);

    if (videoIds.length === 0) {
      return mockYouTubeVideos;
    }

    // Get video details
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    if (!detailsResponse.ok) {
      throw new Error("Failed to fetch video details");
    }

    const detailsData: YouTubeVideoDetails = await detailsResponse.json();

    // Format the videos
    const videos: YouTubeVideo[] = videosData.items.map((item, index) => {
      const videoId = item.id.videoId;
      const details = detailsData.items.find((detail) => detail.id === videoId);

      return {
        id: (index + 1).toString(),
        videoId: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl:
          item.snippet.thumbnails.maxres?.url ||
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          "",
        publishedDate: new Date(item.snippet.publishedAt)
          .toISOString()
          .split("T")[0],
        duration: details
          ? parseYouTubeDuration(details.contentDetails.duration)
          : "0:00",
        viewCount: details ? parseInt(details.statistics.viewCount) : 0,
        isDisplayed: true,
      };
    });

    // Cache the results
    setCache(cacheKey, videos);
    console.log(
      `Fetched and cached ${videos.length} videos from YouTube API by handle: ${handle}`
    );

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube videos by handle:", error);
    return [];
  }
}

export async function getVideos(): Promise<YouTubeVideo[]> {
  try {
    console.log("🔍 Fetching videos from API...");

    // Use VERCEL_URL in production, localhost in development
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    console.log("🌐 API Base URL:", baseUrl);

    const response = await fetch(`${baseUrl}/api/youtube`, {
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    console.log("📡 API Response status:", response.status);

    if (!response.ok) {
      console.error(
        "❌ API response not ok:",
        response.status,
        response.statusText
      );
      console.log("🎭 Falling back to mock data due to API failure");
      return mockYouTubeVideos.slice(0, 5);
    }

    const result = await response.json();
    console.log("📊 API Result:", {
      success: result.success,
      count: result.count,
      fallback: result.fallback,
      environment: result.environment,
    });

    // Always return data, whether from API or fallback
    const videos = result.data || [];

    if (videos.length === 0) {
      console.log("⚠️ No videos in response, returning mock data");
      return mockYouTubeVideos.slice(0, 5);
    }

    console.log(`✅ Returning ${videos.length} videos`);
    return videos;
  } catch (error) {
    console.error("💥 Error fetching YouTube videos:", error);
    console.log("🎭 Returning mock data as final fallback");
    return mockYouTubeVideos.slice(0, 5);
  }
}
