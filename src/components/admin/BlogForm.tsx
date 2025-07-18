'use client';

import { useState } from 'react';
import { BlogPost } from '@/types';
import { generateSlug, calculateReadTime } from '@/lib/utils';
import styles from '@/styles/admin.module.css';
import { cn } from '@/lib/utils';

interface BlogFormProps {
  blog?: BlogPost;
  onSubmit: (blog: Omit<BlogPost, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function BlogForm({ blog, onSubmit, onCancel, isLoading = false }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    author: blog?.author || 'Admin',
    tags: blog?.tags?.join(', ') || '',
    isPublished: blog?.isPublished || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const blogData: Omit<BlogPost, 'id'> = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author,
      tags: tagsArray,
      isPublished: formData.isPublished,
      publishedDate: blog?.publishedDate || new Date().toISOString().split('T')[0],
      readTime: calculateReadTime(formData.content),
      slug: blog?.slug || generateSlug(formData.title),
    };

    onSubmit(blogData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            placeholder="Enter blog post title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="excerpt" className={styles.formLabel}>
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className={styles.formTextarea}
            required
            placeholder="Brief description of the blog post"
            rows={3}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.formLabel}>
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={styles.formTextarea}
            required
            placeholder="Write your blog post content in Markdown format"
            rows={15}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={styles.formGroup}>
            <label htmlFor="author" className={styles.formLabel}>
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Author name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tags" className={styles.formLabel}>
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="React, Next.js, TypeScript (comma separated)"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formCheckbox}>
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className={styles.formCheckboxInput}
            />
            <label htmlFor="isPublished" className={styles.formLabel}>
              Publish immediately
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={cn(styles.button, styles.buttonPrimary)}
          >
            {isLoading ? 'Saving...' : blog ? 'Update Post' : 'Create Post'}
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
