'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Video, 
  Settings, 
  BarChart3,
  Users 
} from 'lucide-react';
import styles from '@/styles/admin.module.css';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Blog Posts', href: '/admin/blogs', icon: FileText },
  { name: 'YouTube Videos', href: '/admin/videos', icon: Video },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTitle}>
          Admin Panel
        </div>
        
        <nav className={styles.sidebarNav}>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  styles.sidebarLink,
                  isActive && styles.sidebarLinkActive
                )}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8">
          <Link
            href="/"
            className={styles.sidebarLink}
          >
            <Home size={20} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
