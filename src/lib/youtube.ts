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
    const response = await fetch("http://localhost:3000/api/youtube", {
      cache: "force-cache", // Use Next.js cache for 1 hour
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error("Failed to fetch YouTube videos");
      return mockYouTubeVideos;
    }

    const result = await response.json();
    console.log("YouTube API response:", result);

    return result.success ? result.data : mockYouTubeVideos;
    // return result.data.size > 0 ? result.data : mockYouTubeVideos;
    // return mockYouTubeVideos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}
