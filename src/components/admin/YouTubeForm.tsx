'use client';

import { useState } from 'react';
import { YouTubeVideo } from '@/types';
import styles from '@/styles/admin.module.css';
import { cn } from '@/lib/utils';

interface YouTubeFormProps {
  video?: YouTubeVideo;
  onSubmit: (video: Omit<YouTubeVideo, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function YouTubeForm({ video, onSubmit, onCancel, isLoading = false }: YouTubeFormProps) {
  const [formData, setFormData] = useState({
    videoId: video?.videoId || '',
    title: video?.title || '',
    description: video?.description || '',
    duration: video?.duration || '',
    isDisplayed: video?.isDisplayed || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Extract video ID from YouTube URL if full URL is provided
    let videoId = formData.videoId;
    const youtubeUrlMatch = videoId.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeUrlMatch) {
      videoId = youtubeUrlMatch[1];
    }

    const videoData: Omit<YouTubeVideo, 'id'> = {
      videoId,
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      isDisplayed: formData.isDisplayed,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      publishedDate: video?.publishedDate || new Date().toISOString().split('T')[0],
      viewCount: video?.viewCount || 0,
    };

    onSubmit(videoData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="videoId" className={styles.formLabel}>
            YouTube Video ID or URL *
          </label>
          <input
            type="text"
            id="videoId"
            name="videoId"
            value={formData.videoId}
            onChange={handleChange}
            className={styles.formInput}
            required
            placeholder="dQw4w9WgXcQ or https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
          <small className="text-gray-500 text-sm mt-1 block">
            You can paste either the video ID or the full YouTube URL
          </small>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.formLabel}>
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.formInput}
            required
            placeholder="YouTube video title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.formLabel}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.formTextarea}
            placeholder="Brief description of the video content"
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="duration" className={styles.formLabel}>
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="10:30 (mm:ss format)"
          />
          <small className="text-gray-500 text-sm mt-1 block">
            Format: mm:ss (e.g., 10:30 for 10 minutes 30 seconds)
          </small>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formCheckbox}>
            <input
              type="checkbox"
              id="isDisplayed"
              name="isDisplayed"
              checked={formData.isDisplayed}
              onChange={handleChange}
              className={styles.formCheckboxInput}
            />
            <label htmlFor="isDisplayed" className={styles.formLabel}>
              Display on homepage
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={cn(styles.button, styles.buttonPrimary)}
          >
            {isLoading ? 'Saving...' : video ? 'Update Video' : 'Add Video'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={cn(styles.button, styles.buttonSecondary)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
