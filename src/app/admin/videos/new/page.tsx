'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import YouTubeForm from '@/components/admin/YouTubeForm';
import styles from '@/styles/admin.module.css';
import { YouTubeVideo } from '@/types';

export default function NewYouTubeVideo() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (videoData: Omit<YouTubeVideo, 'id'>) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          router.push('/admin/videos');
        } else {
          alert('Error adding video: ' + result.error);
        }
      } else {
        alert('Error adding video');
      }
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Error adding video');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/videos');
  };

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Add YouTube Video</h1>
        <p className={styles.pageDescription}>
          Add a new YouTube video to showcase on your site.
        </p>
      </div>

      <YouTubeForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </AdminLayout>
  );
}
