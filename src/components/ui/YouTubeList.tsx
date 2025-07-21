"use client";

import { YouTubeVideo } from "@/types";
import YouTubeCard from "./YouTubeCard";
import styles from "@/styles/youtube.module.css";
import { useEffect, useState } from "react";

interface YouTubeListProps {
  videos: YouTubeVideo[];
  title?: string;
}

export default function YouTubeList({
  videos,
  title = "Latest YouTube Videos",
}: YouTubeListProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log("🎬 YouTubeList mounted with:", {
      videosCount: videos.length,
      environment: process.env.NODE_ENV,
      firstVideo: videos[0]?.title || "No videos",
      allVideoTitles: videos.map((v) => v.title),
    });
  }, [videos]);

  if (!isClient) {
    return (
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {title}
          </h2>
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {title}
          </h2>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No YouTube videos available at the moment. Check back soon!
            </p>
            {process.env.NODE_ENV === "development" && (
              <div className="text-red-500 text-sm mt-4 p-4 bg-red-50 rounded-lg">
                <p className="font-semibold">Debug Info:</p>
                <p>Videos array is empty. Check console for API errors.</p>
                <p>Environment: {process.env.NODE_ENV}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {title}
        </h2>

        <div className={styles.videosGrid}>
          {videos.map((video) => (
            <YouTubeCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
