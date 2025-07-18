'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { YouTubeVideo } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import styles from '@/styles/admin.module.css';
import { cn } from '@/lib/utils';
import { Plus, Edit, Trash2, Eye, ExternalLink } from 'lucide-react';

export default function AdminVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setVideos(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVideos(videos.filter(video => video.id !== id));
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={styles.pageTitle}>YouTube Videos</h1>
            <p className={styles.pageDescription}>
              Manage your YouTube video showcase.
            </p>
          </div>
          <Link
            href="/admin/videos/new"
            className={cn(styles.button, styles.buttonPrimary)}
          >
            <Plus size={20} />
            Add Video
          </Link>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Video</th>
              <th className={styles.tableHeaderCell}>Title</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Duration</th>
              <th className={styles.tableHeaderCell}>Views</th>
              <th className={styles.tableHeaderCell}>Published</th>
              <th className={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className={styles.tableCell}>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {video.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {video.description.substring(0, 60)}...
                    </div>
                  </div>
                </td>
                <td className={styles.tableCell}>
                  <span
                    className={cn(
                      styles.statusBadge,
                      video.isDisplayed ? styles.statusDisplayed : styles.statusHidden
                    )}
                  >
                    {video.isDisplayed ? 'Displayed' : 'Hidden'}
                  </span>
                </td>
                <td className={styles.tableCell}>{video.duration}</td>
                <td className={styles.tableCell}>
                  {video.viewCount.toLocaleString()}
                </td>
                <td className={styles.tableCell}>{video.publishedDate}</td>
                <td className={styles.tableCell}>
                  <div className={styles.tableCellActions}>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                      title="Watch on YouTube"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <Link
                      href={`/admin/videos/edit/${video.id}`}
                      className="text-gray-600 hover:text-gray-700 dark:text-gray-400"
                      title="Edit video"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                      title="Delete video"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No YouTube videos found.
            </p>
            <Link
              href="/admin/videos/new"
              className={cn(styles.button, styles.buttonPrimary)}
            >
              <Plus size={20} />
              Add Your First Video
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
