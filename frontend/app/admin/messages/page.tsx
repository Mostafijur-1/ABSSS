'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { authStorage } from '@/lib/auth';
import { 
  MessageSquare, 
  Search,
  Filter,
  Mail,
  Calendar,
  Eye,
  Trash2,
  CheckCircle,
  Clock
} from '@/components/Icons';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // This would be the actual API call
      // const data = await contactApi.getAll();
      // For now, using mock data
      const mockData: ContactMessage[] = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Question about membership',
          message: 'I would like to know more about becoming a member of ABSSS.',
          isRead: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          subject: 'Event inquiry',
          message: 'Can you provide more details about the upcoming conference?',
          isRead: true,
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          updatedAt: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      setMessages(mockData);
    } catch (err: any) {
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'read' && message.isRead) ||
                         (selectedStatus === 'unread' && !message.isRead);
    return matchesSearch && matchesStatus;
  });

  const handleMarkAsRead = async (id: string) => {
    try {
      // API call would be here
      setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
    } catch (err: any) {
      setError(err.message || 'Failed to mark message as read');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      // API call would be here
      setMessages(messages.filter(m => m._id !== id));
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete message');
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      handleMarkAsRead(message._id);
    }
  };

  const MessageDetailModal = ({ message, onClose }: {
    message: ContactMessage;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{message.subject}</h3>
              <p className="text-sm text-gray-500 mt-1">
                From: {message.name} ({message.email})
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(message.createdAt).toLocaleString()}</span>
            <span className="ml-4">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                message.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {message.isRead ? 'Read' : 'Unread'}
              </span>
            </span>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
          </div>
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => window.open(`mailto:${message.email}?subject=Re: ${message.subject}`, '_blank')}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md"
            >
              Reply
            </button>
            <button
              onClick={() => handleDelete(message._id)}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout title="Messages">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Messages">
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">Manage contact form submissions and inquiries</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-semibold text-gray-900">{messages.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-500">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {messages.filter(m => !m.isRead).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Read</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {messages.filter(m => m.isRead).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="sm:w-40">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div
                key={message._id}
                className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !message.isRead ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleViewMessage(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className={`text-sm font-medium ${
                        !message.isRead ? 'text-gray-900 font-semibold' : 'text-gray-700'
                      }`}>
                        {message.name}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        message.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {message.isRead ? 'Read' : 'Unread'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{message.email}</p>
                    <p className={`text-sm mt-1 ${
                      !message.isRead ? 'text-gray-900 font-medium' : 'text-gray-700'
                    }`}>
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {message.message}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 mt-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(message.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewMessage(message);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`mailto:${message.email}?subject=Re: ${message.subject}`, '_blank');
                      }}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Reply"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message._id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No messages found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedStatus !== 'all' ? 'Try adjusting your search or filters.' : 'No contact messages received yet.'}
            </p>
          </div>
        )}
      </div>

      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </AdminLayout>
  );
}
