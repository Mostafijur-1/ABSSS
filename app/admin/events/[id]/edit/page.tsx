'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { eventsApi } from '@/lib/api';
import { authStorage } from '@/lib/clientAuth';
import FileUpload from '@/components/FileUpload';
import { ArrowLeft, Save, Calendar, MapPin, Tag, FileText, Image } from '@/components/Icons';

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '' as 'conference' | 'workshop' | 'seminar' | 'lecture' | 'competition' | ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await eventsApi.getById(id);
        setFormData({
          title: event.title || '',
          description: event.description || '',
          date: event.date || '',
          location: event.location || '',
          category: (event.category as any) || ''
        });
        setExistingImageUrl(event.image || null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      setError('Please select a category');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Prepare event data
      const eventData: any = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        category: formData.category,
        isUpcoming: new Date(formData.date) > new Date(),
        image: existingImageUrl
      };

      // If image is selected, upload to Cloudinary first
      if (selectedImage) {
        const formDataForUpload = new FormData();
        formDataForUpload.append('image', selectedImage);
        
        // Upload image to get Cloudinary URL
        const token = authStorage.getToken();
        const uploadResponse = await fetch('/api/upload/image', {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formDataForUpload
        });
        
        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          eventData.image = uploadResult.url; // Add Cloudinary URL to event data
        } else {
          throw new Error('Failed to upload image');
        }
      }

      // Update event using api helper which attaches proper Authorization headers
      await eventsApi.update(id, eventData);

      // Navigate to the admin events list
      router.push('/admin/events');
    } catch (err: any) {
      setError(err.message || 'Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Event">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading event details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Event">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
              <p className="text-gray-600 mt-1">Modify the details of your event</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter event title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your event..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Event Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Tag className="inline h-4 w-4 mr-1" />
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="conference">Conference</option>
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                      <option value="lecture">Lecture</option>
                      <option value="competition">Competition</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Main Auditorium, Room 101, Online via Zoom, etc."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Media */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Image className="h-5 w-5 mr-2 text-blue-600" />
                  Media
                </h3>
                <FileUpload
                  label="Event Image (Optional)"
                  accept="image/*"
                  onFileSelect={setSelectedImage}
                  maxSize={5}
                  required={false}
                  preview={existingImageUrl || undefined}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-lg">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Tips for editing events:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use descriptive titles that clearly indicate the event purpose</li>
            <li>• Include complete location details (building, room number, or online link)</li>
            <li>• Choose the most appropriate category for better organization</li>
            <li>• Update the image to make your event more attractive</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
