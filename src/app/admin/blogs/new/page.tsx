'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogForm from '@/components/admin/BlogForm';
import styles from '@/styles/admin.module.css';
import { BlogPost } from '@/types';

export default function NewBlogPost() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (blogData: Omit<BlogPost, 'id'>) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          router.push('/admin/blogs');
        } else {
          alert('Error creating blog post: ' + result.error);
        }
      } else {
        alert('Error creating blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Error creating blog post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/blogs');
  };

  return (
    <AdminLayout>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Create New Blog Post</h1>
        <p className={styles.pageDescription}>
          Write and publish a new blog post for your audience.
        </p>
      </div>

      <BlogForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </AdminLayout>
  );
}
