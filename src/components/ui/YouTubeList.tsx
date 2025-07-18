"use client";

import { YouTubeVideo } from '@/types';
import YouTubeCard from './YouTubeCard';
import styles from '@/styles/youtube.module.css';

interface YouTubeListProps {
  videos: YouTubeVideo[];
  title?: string;
}

export default function YouTubeList({ videos, title = "Latest YouTube Videos" }: YouTubeListProps) {
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
