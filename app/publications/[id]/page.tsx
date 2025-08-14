'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PublicationCard from '@/components/PublicationCard';
import { Publication } from '@/lib/api';
import { Calendar, Users, FileText, ExternalLink, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

export default function PublicationDetailPage() {
  const { id } = useParams();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [relatedPublications, setRelatedPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchPublication();
    }
  }, [id]);

  useEffect(() => {
    if (publication) {
      fetchRelatedPublications();
    }
  }, [publication]);

  const fetchPublication = async () => {
    try {
      const response = await fetch(`/api/publications/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Publication not found');
        }
        throw new Error('Failed to fetch publication');
      }
      const data = await response.json();
      setPublication(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load publication');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPublications = async () => {
    if (!publication) return;
    
    try {
      const response = await fetch('/api/publications');
      if (response.ok) {
        const data = await response.json();
        // Filter out current publication and get publications from same category
        const related = data
          .filter((pub: Publication) => pub._id !== publication._id)
          .filter((pub: Publication) => pub.category === publication.category)
          .slice(0, 3);
        setRelatedPublications(related);
      }
    } catch (err) {
      console.error('Failed to fetch related publications:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      research: 'bg-blue-100 text-blue-800',
      review: 'bg-green-100 text-green-800',
      'case-study': 'bg-purple-100 text-purple-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading publication...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-max section-padding">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Publication Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The publication you are looking for does not exist.'}</p>
            <Link 
              href="/publications"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Publications
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container-max section-padding">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/publications"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Publications
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Publication Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(publication.category)}`}>
                <FileText className="w-4 h-4 mr-2" />
                {publication.category.replace('-', ' ').charAt(0).toUpperCase() + publication.category.slice(1).replace('-', ' ')}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {publication.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{publication.authors.join(', ')}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(publication.publishedDate)}</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                <span>{publication.journal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {publication.pdfUrl ? (
                <>
                  <a
                    href={publication.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Read Full Paper
                  </a>
                  <a
                    href={publication.pdfUrl}
                    download
                    className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF
                  </a>
                </>
              ) : (
                <div className="inline-flex items-center px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed">
                  <FileText className="w-5 h-5 mr-2" />
                  PDF Not Available
                </div>
              )}
            </div>
          </div>

          {/* Abstract Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {publication.abstract}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Publication Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">Category</dt>
                <dd className="text-base text-gray-900 capitalize">{publication.category.replace('-', ' ')}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">Journal</dt>
                <dd className="text-base text-gray-900">{publication.journal}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">Authors</dt>
                <dd className="text-base text-gray-900">{publication.authors.join(', ')}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 mb-1">Published Date</dt>
                <dd className="text-base text-gray-900">{formatDate(publication.publishedDate)}</dd>
              </div>
            </div>
          </div>
          
          {/* Related Publications */}
          {relatedPublications.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Publications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPublications.map((relatedPub) => (
                  <PublicationCard key={relatedPub._id} publication={relatedPub} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
