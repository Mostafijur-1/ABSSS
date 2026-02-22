'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, authStorage, hasPermission } from '@/lib/clientAuth';
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  FileText, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  BarChart3,
  Shield,
  User as UserIcon
} from '@/components/Icons';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title = 'Admin Dashboard' }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = authStorage.getToken();
    const userData = authStorage.getUser();

    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    setUser(userData);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    authStorage.clear();
    router.push('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home, permission: null },
    { name: 'Events', href: '/admin/events', icon: Calendar, permission: 'events' },
    { name: 'Publications', href: '/admin/publications', icon: FileText, permission: 'publications' },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText, permission: 'publications' },
    { name: 'Members', href: '/admin/members', icon: Users, permission: 'members' },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare, permission: 'contacts' },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, permission: null },
    { name: 'Users', href: '/admin/users', icon: Shield, permission: 'users' },
    { name: 'Profile', href: '/admin/profile', icon: UserIcon, permission: null },
  ].filter(item => !item.permission || hasPermission(user, item.permission));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-200 border-b-primary-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white/80 shadow-lg backdrop-blur-md transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:inset-0 lg:flex-shrink-0 lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200/80 px-6">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-xs font-semibold text-white shadow-sm">
              AB
            </div>
            <span className="ml-3 text-sm font-semibold text-gray-900">
              ABSSS Admin
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-4 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-700'
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
                      active
                        ? 'text-primary-600'
                        : 'text-gray-400 group-hover:text-primary-600'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200/80 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                  {user?.username?.charAt(0)?.toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="ml-4 text-base font-semibold text-gray-900 lg:ml-0 lg:text-lg">
                {title}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden items-center space-x-2 text-xs text-gray-500 sm:flex">
                <span>Welcome back,</span>
                <span className="font-medium text-gray-900">
                  {user?.username}
                </span>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
} 
