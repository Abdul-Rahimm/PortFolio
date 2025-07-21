import { YouTubeVideo } from "@/types";

export interface CacheEntry {
  data: YouTubeVideo[];
  timestamp: number;
  expiresAt: number;
}

export interface IgetCacheStats{
    size: number;
    entries: Array<{
        key: string;
        timestamp: Date;
        expiresAt: Date;
        dataLength: number;
    }>;
}