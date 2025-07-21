import { CacheEntry, IgetCacheStats } from "@/interfaces/cacheInterfaces";
import { YouTubeVideo } from "@/types";

// In-memory cache - will reset on server restart
export const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds


export function getCacheKey(channelId?: string, handle?: string): string {
  return channelId ? `channel_${channelId}` : `handle_${handle}`;
}

export function isValidCache(entry: CacheEntry): boolean {
  return Date.now() < entry.expiresAt;
}

export function getFromCache(key: string): YouTubeVideo[] | null {
  const entry = cache.get(key);
  if (entry && isValidCache(entry)) {
    console.log(`Cache hit for key: ${key}`);
    return entry.data;
  }

  // Clean up expired cache entry
  if (entry) {
    cache.delete(key);
    console.log(`Removed expired cache for key: ${key}`);
  }

  return null;
}

export function setCache(key: string, data: YouTubeVideo[]): void {
  const now = Date.now();
  const entry: CacheEntry = {
    data,
    timestamp: now,
    expiresAt: now + CACHE_DURATION,
  };
  cache.set(key, entry);
  console.log(
    `Cached data for key: ${key}, expires at: ${new Date(
      entry.expiresAt
    ).toISOString()}`
  );
}

export function clearYouTubeCache(): void {
  cache.clear();
  console.log("YouTube cache cleared");
}

export function getCacheStats(): IgetCacheStats {
  const entries = Array.from(cache.entries()).map(([key, entry]) => ({
    key,
    timestamp: new Date(entry.timestamp),
    expiresAt: new Date(entry.expiresAt),
    dataLength: entry.data.length,
  }));

  return {
    size: cache.size,
    entries,
  };
}
