'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { authStorage } from '@/lib/clientAuth';
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Users,
  MessageSquare,
  Activity
} from '@/components/Icons';

interface AnalyticsData {
  overview: {
    totalViews: number;
    totalEvents: number;
    totalPublications: number;
    totalMembers: number;
    growthRate: number;
  };
  monthly: {
    events: { month: string; count: number }[];
    publications: { month: string; count: number }[];
    members: { month: string; count: number }[];
  };
  categories: {
    eventCategories: { name: string; count: number; color: string }[];
    publicationCategories: { name: string; count: number; color: string }[];
    memberRoles: { name: string; count: number; color: string }[];
  };
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    try {
      // Mock analytics data - in a real app this would come from your API
      const mockData: AnalyticsData = {
        overview: {
          totalViews: 12450,
          totalEvents: 28,
          totalPublications: 45,
          totalMembers: 156,
          growthRate: 12.5
        },
        monthly: {
          events: [
            { month: 'Jan', count: 3 },
            { month: 'Feb', count: 5 },
            { month: 'Mar', count: 2 },
            { month: 'Apr', count: 4 },
            { month: 'May', count: 6 },
            { month: 'Jun', count: 8 }
          ],
          publications: [
            { month: 'Jan', count: 4 },
            { month: 'Feb', count: 3 },
            { month: 'Mar', count: 6 },
            { month: 'Apr', count: 5 },
            { month: 'May', count: 7 },
            { month: 'Jun', count: 9 }
          ],
          members: [
            { month: 'Jan', count: 12 },
            { month: 'Feb', count: 8 },
            { month: 'Mar', count: 15 },
            { month: 'Apr', count: 10 },
            { month: 'May', count: 18 },
            { month: 'Jun', count: 22 }
          ]
        },
        categories: {
          eventCategories: [
            { name: 'Conference', count: 12, color: 'bg-blue-500' },
            { name: 'Workshop', count: 8, color: 'bg-green-500' },
            { name: 'Seminar', count: 5, color: 'bg-purple-500' },
            { name: 'Lecture', count: 3, color: 'bg-orange-500' }
          ],
          publicationCategories: [
            { name: 'Research', count: 20, color: 'bg-blue-500' },
            { name: 'Review', count: 12, color: 'bg-green-500' },
            { name: 'Case Study', count: 8, color: 'bg-purple-500' },
            { name: 'Blog', count: 5, color: 'bg-orange-500' }
          ],
          memberRoles: [
            { name: 'Faculty', count: 25, color: 'bg-blue-500' },
            { name: 'Students', count: 110, color: 'bg-green-500' },
            { name: 'Alumni', count: 21, color: 'bg-purple-500' }
          ]
        }
      };
      
      setData(mockData);
    } catch (err: any) {
      setError(err.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color }: {
    title: string;
    value: number | string;
    change?: number;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-1">
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SimpleChart = ({ title, data, color }: {
    title: string;
    data: { month: string; count: number }[];
    color: string;
  }) => {
    const maxValue = Math.max(...data.map(d => d.count));
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600 w-8">{item.month}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${color}`}
                  style={{ width: `${(item.count / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-900 w-8">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CategoryChart = ({ title, data }: {
    title: string;
    data: { name: string; count: number; color: string }[];
  }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => {
            const percentage = ((item.count / total) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">{item.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout title="Analytics">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout title="Analytics">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          Failed to load analytics data
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Monitor system activity and performance metrics</p>
          </div>
          <div className="sm:w-40">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Page Views"
            value={data.overview.totalViews.toLocaleString()}
            change={data.overview.growthRate}
            icon={Activity}
            color="bg-blue-500"
          />
          <StatCard
            title="Total Events"
            value={data.overview.totalEvents}
            change={8.2}
            icon={Calendar}
            color="bg-green-500"
          />
          <StatCard
            title="Total Publications"
            value={data.overview.totalPublications}
            change={15.3}
            icon={FileText}
            color="bg-purple-500"
          />
          <StatCard
            title="Total Members"
            value={data.overview.totalMembers}
            change={5.7}
            icon={Users}
            color="bg-orange-500"
          />
        </div>

        {/* Monthly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SimpleChart
            title="Monthly Events"
            data={data.monthly.events}
            color="bg-blue-500"
          />
          <SimpleChart
            title="Monthly Publications"
            data={data.monthly.publications}
            color="bg-green-500"
          />
          <SimpleChart
            title="New Members"
            data={data.monthly.members}
            color="bg-purple-500"
          />
        </div>

        {/* Category Breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CategoryChart
            title="Event Categories"
            data={data.categories.eventCategories}
          />
          <CategoryChart
            title="Publication Types"
            data={data.categories.publicationCategories}
          />
          <CategoryChart
            title="Member Roles"
            data={data.categories.memberRoles}
          />
        </div>

        {/* Activity Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Events This Month</p>
              <p className="text-xl font-semibold text-gray-900">
                {data.monthly.events[data.monthly.events.length - 1]?.count || 0}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Publications This Month</p>
              <p className="text-xl font-semibold text-gray-900">
                {data.monthly.publications[data.monthly.publications.length - 1]?.count || 0}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">New Members This Month</p>
              <p className="text-xl font-semibold text-gray-900">
                {data.monthly.members[data.monthly.members.length - 1]?.count || 0}
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Overall Growth</p>
              <p className="text-xl font-semibold text-gray-900">
                +{data.overview.growthRate}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
