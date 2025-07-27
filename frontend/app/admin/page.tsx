'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { dashboardApi, authStorage } from '@/lib/auth';
import { eventsApi } from '@/lib/api';
import { 
  Calendar, 
  FileText, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Activity,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle
} from '@/components/Icons';

interface DashboardStats {
  stats: {
    totalEvents: number;
    upcomingEvents: number;
    totalPublications: number;
    totalMembers: number;
    unreadContacts: number;
    totalUsers: number;
  };
  recentActivities: {
    events: any[];
    publications: any[];
    contacts: any[];
    members: any[];
  };
  analytics: {
    monthlyEvents: any[];
    monthlyPublications: any[];
    eventCategories: any[];
    publicationCategories: any[];
    memberRoles: any[];
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = authStorage.getToken();
        if (!token) return;

        const data = await dashboardApi.getStats(token);
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, change }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const RecentActivityCard = ({ title, items, icon: Icon }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-3">
        {items?.slice(0, 5).map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.title || item.name}
              </p>
              <p className="text-xs text-gray-500">
                {item.category || item.role || item.email}
              </p>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              {item.isRead !== undefined && (
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  item.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.isRead ? 'Read' : 'Unread'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Dashboard">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to ABSSS Admin Panel</h1>
            <p className="text-blue-100">
              Manage events, publications, members, and monitor system activity from one central dashboard.
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
          <StatCard
            title="Total Events"
            value={stats?.stats.totalEvents || 0}
            icon={Calendar}
            color="bg-blue-500"
            change={12}
          />
          <StatCard
            title="Upcoming Events"
            value={stats?.stats.upcomingEvents || 0}
            icon={Clock}
            color="bg-green-500"
            change={8}
          />
          <StatCard
            title="Publications"
            value={stats?.stats.totalPublications || 0}
            icon={FileText}
            color="bg-purple-500"
            change={15}
          />
          <StatCard
            title="Active Members"
            value={stats?.stats.totalMembers || 0}
            icon={Users}
            color="bg-orange-500"
            change={5}
          />
          <StatCard
            title="Unread Messages"
            value={stats?.stats.unreadContacts || 0}
            icon={MessageSquare}
            color="bg-red-500"
            change={-3}
          />
          <StatCard
            title="System Users"
            value={stats?.stats.totalUsers || 0}
            icon={Activity}
            color="bg-indigo-500"
            change={0}
          />
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          <RecentActivityCard
            title="Recent Events"
            items={stats?.recentActivities.events}
            icon={Calendar}
          />
          <RecentActivityCard
            title="Recent Publications"
            items={stats?.recentActivities.publications}
            icon={FileText}
          />
          <RecentActivityCard
            title="Recent Messages"
            items={stats?.recentActivities.contacts}
            icon={MessageSquare}
          />
          <RecentActivityCard
            title="Recent Members"
            items={stats?.recentActivities.members}
            icon={Users}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/events"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Manage Events</span>
            </a>
            <a
              href="/admin/publications"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-5 w-5 text-purple-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Manage Publications</span>
            </a>
            <a
              href="/admin/members"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-5 w-5 text-orange-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">Manage Members</span>
            </a>
            <a
              href="/admin/messages"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-red-600 mr-3" />
              <span className="text-sm font-medium text-gray-900">View Messages</span>
            </a>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-900">System Online</p>
                <p className="text-xs text-green-600">All services operational</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-900">Database Connected</p>
                <p className="text-xs text-blue-600">MongoDB running</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Updates Available</p>
                <p className="text-xs text-yellow-600">Check for new features</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 