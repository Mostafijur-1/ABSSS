'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { publicationsApi } from '@/lib/api';
import { authStorage } from '@/lib/clientAuth';
import { Publication } from '@/lib/api';
import FileUpload from '@/components/FileUpload';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Search,
  Filter,
  Calendar,
  User,
  ExternalLink
} from '@/components/Icons';

export default function AdminPublications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const data = await publicationsApi.getAll();
      setPublications(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load publications');
    } finally {
      setLoading(false);
    }
  };

  const filteredPublications = publications.filter(publication => {
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         publication.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         publication.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || publication.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this publication?')) return;

    try {
      await publicationsApi.delete(id);
      setPublications(publications.filter(p => p._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete publication');
    }
  };

  const handleEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingPublication(null);
    setShowModal(true);
  };

  const PublicationModal = ({ publication, onClose, onSave }: {
    publication: Publication | null;
    onClose: () => void;
    onSave: () => void;
  }) => {
    const [formData, setFormData] = useState({
      title: publication?.title || '',
      authors: publication?.authors.join(', ') || '',
      abstract: publication?.abstract || '',
      pdfUrl: publication?.pdfUrl || '',
      category: publication?.category || 'research',
      publishedDate: publication?.publishedDate ? publication.publishedDate.split('T')[0] : '',
      journal: publication?.journal || ''
    });
    const [saving, setSaving] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);

      try {
        // Prepare publication data
        const publicationData: any = {
          title: formData.title,
          authors: formData.authors.split(',').map(author => author.trim()),
          abstract: formData.abstract,
          category: formData.category,
          publishedDate: formData.publishedDate,
          journal: formData.journal,
          pdfUrl: formData.pdfUrl
        };

        // If PDF is selected, upload to Cloudinary first
        if (selectedFile) {
          const formDataForUpload = new FormData();
          formDataForUpload.append('pdf', selectedFile);
          
          // Upload PDF to get Cloudinary URL
          const uploadResponse = await fetch('/api/upload/pdf', {
            method: 'POST',
            body: formDataForUpload
          });
          
          if (uploadResponse.ok) {
            const uploadResult = await uploadResponse.json();
            publicationData.pdfUrl = uploadResult.url; // Add Cloudinary URL to publication data
          }
        }

        if (publication) {
          await publicationsApi.update(publication._id, publicationData);
        } else {
          await publicationsApi.create(publicationData);
        }
        
        onSave();
        onClose();
        fetchPublications();
      } catch (err: any) {
        setError(err.message || 'Failed to save publication');
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {publication ? 'Edit Publication' : 'Add New Publication'}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Authors (comma-separated)</label>
              <input
                type="text"
                value={formData.authors}
                onChange={(e) => setFormData({...formData, authors: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe, Jane Smith"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
              <textarea
                value={formData.abstract}
                onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="research">Research</option>
                  <option value="review">Review</option>
                  <option value="case-study">Case Study</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                <input
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Journal</label>
              <input
                type="text"
                value={formData.journal}
                onChange={(e) => setFormData({...formData, journal: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
              <FileUpload
                label="Upload PDF"
                accept=".pdf,application/pdf"
                onFileSelect={(file) => setSelectedFile(file)}
                maxSize={10}
                required={!formData.pdfUrl}
              />
              {formData.pdfUrl && (
                <div className="mt-2">
                  <a 
                    href={formData.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View current PDF
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : (publication ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout title="Publications">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading publications...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Publications">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Publications</h1>
            <p className="text-gray-600 mt-1">Manage research publications and papers</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Publication
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="research">Research</option>
            <option value="review">Review</option>
            <option value="case-study">Case Study</option>
          </select>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Publications List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Publication
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Authors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPublications.map((publication) => (
                  <tr key={publication._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {publication.title}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {publication.journal}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {publication.authors.slice(0, 2).join(', ')}
                        {publication.authors.length > 2 && ` +${publication.authors.length - 2} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                        {publication.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(publication.publishedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        {publication.pdfUrl && (
                          <a
                            href={publication.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900"
                            title="View PDF"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleEdit(publication)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(publication._id)}
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
          
          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No publications</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No publications match your search criteria.' 
                  : 'Get started by creating a new publication.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <PublicationModal
          publication={editingPublication}
          onClose={() => {
            setShowModal(false);
            setEditingPublication(null);
          }}
          onSave={() => {
            setShowModal(false);
            setEditingPublication(null);
          }}
        />
      )}
    </AdminLayout>
  );
}
