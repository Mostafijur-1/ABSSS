'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { recentActivitiesApi, RecentActivity } from '@/lib/api';
import { authStorage } from '@/lib/clientAuth';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Calendar, 
  Activity, 
  Image as ImageIcon 
} from '@/components/Icons';

export default function AdminRecentActivities() {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<RecentActivity | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await recentActivitiesApi.getAll();
      setActivities(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (activity.category && activity.category.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;

    try {
      await recentActivitiesApi.delete(id);
      setActivities(activities.filter(a => a._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete activity');
    }
  };

  const handleEdit = (activity: RecentActivity) => {
    setEditingActivity(activity);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingActivity(null);
    setShowModal(true);
  };

  const ActivityModal = ({ activity, onClose, onSave }: {
    activity: RecentActivity | null;
    onClose: () => void;
    onSave: () => void;
  }) => {
    const [formData, setFormData] = useState({
      title: activity?.title || '',
      description: activity?.description || '',
      date: activity?.date ? activity.date.split('T')[0] : new Date().toISOString().split('T')[0],
      category: activity?.category || '',
      link: activity?.link || '',
      image: activity?.image || ''
    });
    const [saving, setSaving] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);

      try {
        const activityData: any = {
          title: formData.title,
          description: formData.description,
          date: new Date(formData.date).toISOString(),
          category: formData.category || null,
          link: formData.link || null,
          image: formData.image || null
        };

        if (selectedFile) {
          const fileData = new FormData();
          fileData.append('image', selectedFile);
          
          const token = authStorage.getToken();
          const uploadRes = await fetch('/api/upload/image', {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: fileData
          });
          
          if (uploadRes.ok) {
            const uploadResult = await uploadRes.json();
            activityData.image = uploadResult.url;
          } else {
            throw new Error('Failed to upload activity image');
          }
        }

        if (activity) {
          await recentActivitiesApi.update(activity._id, activityData);
        } else {
          await recentActivitiesApi.create(activityData);
        }

        onSave();
        onClose();
        fetchActivities();
      } catch (err: any) {
        setError(err.message || 'Failed to save activity');
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-page-transition">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {activity ? 'Edit Recent Activity' : 'Add New Activity'}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Research, Achievement, Milestone"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read More Link</label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. https://example.com/details"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setSelectedFile(file);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <input
                type="text"
                placeholder="Or paste an image URL..."
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.image && (
                <p className="text-xs text-gray-500 mt-1 truncate">Current URL: {formData.image}</p>
              )}
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 active:scale-95 transition-all"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout title="Recent Activities">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Recent Activities">
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recent Activities</h1>
            <p className="text-gray-600">Manage featured accomplishments and society updates</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Activity
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Activities Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredActivities.map((activity) => (
                  <tr key={activity._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Activity className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-semibold text-gray-900 line-clamp-1">{activity.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-1">{activity.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {activity.category ? (
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">
                          {activity.category}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(activity)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(activity._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No activities found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating a new activity.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ActivityModal
          activity={editingActivity}
          onClose={() => setShowModal(false)}
          onSave={() => setShowModal(false)}
        />
      )}
    </AdminLayout>
  );
}
