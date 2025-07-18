'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import styles from '@/styles/admin.module.css';
import { cn } from '@/lib/utils';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setBlogs(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog.id !== id));
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
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
            <h1 className={styles.pageTitle}>Blog Posts</h1>
            <p className={styles.pageDescription}>
              Manage your blog posts and content.
            </p>
          </div>
          <Link
            href="/admin/blogs/new"
            className={cn(styles.button, styles.buttonPrimary)}
          >
            <Plus size={20} />
            New Post
          </Link>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableHeaderCell}>Title</th>
              <th className={styles.tableHeaderCell}>Author</th>
              <th className={styles.tableHeaderCell}>Status</th>
              <th className={styles.tableHeaderCell}>Published</th>
              <th className={styles.tableHeaderCell}>Read Time</th>
              <th className={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {blog.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {blog.excerpt.substring(0, 80)}...
                    </div>
                  </div>
                </td>
                <td className={styles.tableCell}>{blog.author}</td>
                <td className={styles.tableCell}>
                  <span
                    className={cn(
                      styles.statusBadge,
                      blog.isPublished ? styles.statusPublished : styles.statusDraft
                    )}
                  >
                    {blog.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className={styles.tableCell}>{blog.publishedDate}</td>
                <td className={styles.tableCell}>{blog.readTime} min</td>
                <td className={styles.tableCell}>
                  <div className={styles.tableCellActions}>
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      title="View post"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      href={`/admin/blogs/edit/${blog.id}`}
                      className="text-gray-600 hover:text-gray-700 dark:text-gray-400"
                      title="Edit post"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                      title="Delete post"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No blog posts found.
            </p>
            <Link
              href="/admin/blogs/new"
              className={cn(styles.button, styles.buttonPrimary)}
            >
              <Plus size={20} />
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
