import { Play, Eye, Calendar } from "lucide-react";
import { YouTubeVideo } from "@/types";
import { formatDate } from "@/lib/utils";
import styles from "@/styles/youtube.module.css";
import Image from "next/image";

interface YouTubeCardProps {
  video: YouTubeVideo;
  onClick?: () => void;
}

export default function YouTubeCard({ video, onClick }: YouTubeCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Open YouTube video in new tab
      window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank");
    }
  };

  const formatViewCount = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className={styles.videoCard} onClick={handleClick}>
      <div className={styles.videoThumbnail}>
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          width={320}
          height={180}
          quality={85}
          priority={false}
          className={styles.videoThumbnailImage}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className={styles.playButton}>
          <Play size={12} fill="currentColor" />
        </div>
        <div className={styles.videoDuration}>{video.duration}</div>
      </div>

      <div className={styles.videoContent}>
        <h3 className={styles.videoTitle}>{video.title}</h3>

        <p className={styles.videoDescription}>{video.description}</p>

        <div className={styles.videoMeta}>
          <span className={styles.viewCount}>
            <Eye size={12} />
            {formatViewCount(video.viewCount)} views
          </span>
          <span className={styles.publishDate}>
            <Calendar size={12} />
            {formatDate(video.publishedDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
