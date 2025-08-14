'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PublicationCard from '@/components/PublicationCard';
import { Publication } from '@/lib/api';
import { FileText, Search } from 'lucide-react';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchPublications();
  }, []);

  useEffect(() => {
    filterPublications();
  }, [publications, searchTerm, selectedCategory]);

  const fetchPublications = async () => {
    try {
      const response = await fetch('/api/publications');
      if (!response.ok) throw new Error('Failed to fetch publications');
      const data = await response.json();
      setPublications(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load publications');
    } finally {
      setLoading(false);
    }
  };

  const filterPublications = () => {
    let filtered = publications;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(publication =>
        publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        publication.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.journal.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(publication => publication.category === selectedCategory);
    }

    setFilteredPublications(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading publications...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding text-center">
          <h1 className="text-5xl font-bold mb-6">Publications</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Explore our collection of research papers, scientific articles, and publications 
            from our members and collaborators.
          </p>
        </div>
      </section>

      {/* Publications List */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-primary-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">All Publications</h2>
            </div>
            <div className="text-sm text-gray-600">
              {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''}
              {filteredPublications.length !== publications.length && ` of ${publications.length}`}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search publications by title, author, abstract, or journal..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="research">Research Papers</option>
                  <option value="review">Review Articles</option>
                  <option value="case-study">Case Studies</option>
                </select>
              </div>
            </div>
            
            {(searchTerm || selectedCategory !== 'all') && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Category: {selectedCategory.replace('-', ' ')}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {filteredPublications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPublications.map((publication) => (
                <PublicationCard key={publication._id} publication={publication} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || selectedCategory !== 'all' ? 'No publications found' : 'No Publications Yet'}
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search criteria or filters.' 
                  : 'Our publications will appear here once they are published.'
                }
              </p>
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Publication Categories */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Publication Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We publish various types of scientific content to share knowledge and research findings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Papers</h3>
              <p className="text-gray-600 text-sm">
                Original research findings and experimental results from our members
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Articles</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive reviews of current research and literature in various fields
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Studies</h3>
              <p className="text-gray-600 text-sm">
                Detailed analysis of specific research projects and their outcomes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Guidelines */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Guidelines</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interested in publishing with us? Here's what you need to know
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare Your Manuscript</h3>
              <p className="text-gray-600 text-sm">
                Ensure your research paper follows our formatting guidelines and includes all required sections.
              </p>
            </div>

            <div className="card p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit for Review</h3>
              <p className="text-gray-600 text-sm">
                Submit your manuscript through our review process. We'll provide feedback and suggestions.
              </p>
            </div>

            <div className="card p-6">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Publication</h3>
              <p className="text-gray-600 text-sm">
                Once approved, your work will be published in our journal and shared with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to Publish with Us?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Have research to share? We welcome submissions from students, faculty, and researchers.
          </p>
          <a href="/contact" className="btn-secondary">
            Submit Your Work
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
} 