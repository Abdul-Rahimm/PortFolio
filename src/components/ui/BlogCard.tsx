import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import styles from '@/styles/blog.module.css';

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className={styles.blogCard}>
      <div className={styles.blogCardContent}>
        <Link href={`/blog/${blog.slug}`} className={styles.blogTitle}>
          {blog.title}
        </Link>
        
        <p className={styles.blogExcerpt}>
          {blog.excerpt}
        </p>
        
        <div className={styles.blogTags}>
          {blog.tags.map((tag) => (
            <span key={tag} className={styles.blogTag}>
              {tag}
            </span>
          ))}
        </div>
        
        <div className={styles.blogMeta}>
          <div className="flex items-center gap-4">
            <span className={styles.readTime}>
              <Clock size={14} />
              {blog.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(blog.publishedDate)}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            By {blog.author}
          </span>
        </div>
      </div>
    </article>
  );
}
