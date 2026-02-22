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
      <div className="min-h-screen bg-gray-950">
        <Header />
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gray-700 border-b-primary-500"></div>
            <p className="mt-4 text-sm text-gray-300">Loading publications...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <section className="hero-gradient">
        <div className="container-max section-padding relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Publications
          </h1>
          <p className="mx-auto max-w-3xl text-base text-primary-100 sm:text-lg">
            Explore our collection of research papers, scientific articles, and publications 
            from our members and collaborators.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-950">
        <div className="container-max">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="mr-3 h-8 w-8 text-sky-400" />
              <h2 className="text-3xl font-semibold text-white">All Publications</h2>
            </div>
            <div className="text-sm text-gray-300">
              {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''}
              {filteredPublications.length !== publications.length && ` of ${publications.length}`}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 rounded-lg bg-slate-900/70 p-6 backdrop-blur-xl border border-white/10">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search publications by title, author, abstract, or journal..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-slate-600/70 bg-slate-950/70 py-3 pl-10 pr-4 text-sm text-slate-50 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-600/70 bg-slate-950/70 px-3 py-3 text-sm text-slate-50 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
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
                  <span className="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-500/15 px-2.5 py-0.5 text-xs font-medium text-sky-100">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-sky-300 hover:bg-sky-500/20 hover:text-sky-100"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-100">
                    Category: {selectedCategory.replace('-', ' ')}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-100"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {filteredPublications.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPublications.map((publication) => (
                <PublicationCard key={publication._id} publication={publication} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-200">
              <FileText className="mx-auto mb-4 h-16 w-16 text-gray-500" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                {searchTerm || selectedCategory !== 'all' ? 'No publications found' : 'No Publications Yet'}
              </h3>
              <p className="text-gray-300">
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
                  className="mt-4 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-500"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Publication Categories */}
      <section className="section-padding bg-slate-950">
        <div className="container-max">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-white">Publication Categories</h2>
            <p className="mx-auto max-w-3xl text-base text-gray-300">
              We publish various types of scientific content to share knowledge and research findings
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/15 text-2xl">
                <span>🔬</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Research Papers</h3>
              <p className="text-sm text-gray-300">
                Original research findings and experimental results from our members
              </p>
            </div>

            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl">
                <span>📖</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Review Articles</h3>
              <p className="text-sm text-gray-300">
                Comprehensive reviews of current research and literature in various fields
              </p>
            </div>

            <div className="card border-white/10 bg-slate-950/60 p-6 text-center text-slate-50">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl">
                <span>📊</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Case Studies</h3>
              <p className="text-sm text-gray-300">
                Detailed analysis of specific research projects and their outcomes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Guidelines */}
      <section className="section-padding bg-gray-950">
        <div className="container-max">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold text-white">Submission Guidelines</h2>
            <p className="mx-auto max-w-3xl text-base text-gray-300">
              Interested in publishing with us? Here's what you need to know
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card border-white/10 bg-slate-950/60 p-6 text-slate-50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-xl">
                <span>1</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Prepare Your Manuscript</h3>
              <p className="text-sm text-gray-300">
                Ensure your research paper follows our formatting guidelines and includes all required sections.
              </p>
            </div>

            <div className="card border-white/10 bg-slate-950/60 p-6 text-slate-50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-xl">
                <span>2</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Submit for Review</h3>
              <p className="text-sm text-gray-300">
                Submit your manuscript through our review process. We'll provide feedback and suggestions.
              </p>
            </div>

            <div className="card border-white/10 bg-slate-950/60 p-6 text-slate-50">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/20 text-xl">
                <span>3</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">Publication</h3>
              <p className="text-sm text-gray-300">
                Once approved, your work will be published in our journal and shared with the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-950">
        <div className="container-max text-center">
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
          <h2 className="mb-4 text-3xl font-semibold text-white">
            Want to Publish with Us?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-gray-300">
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
