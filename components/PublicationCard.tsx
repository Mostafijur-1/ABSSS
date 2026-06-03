"use client";

import { Calendar, Users, FileText, ExternalLink, ArrowRight } from 'lucide-react';
import { Publication } from '@/lib/api';
import Link from 'next/link';

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard = ({ publication }: PublicationCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow h-full flex flex-col group">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold badge ${getCategoryColor(publication.category)}`}>
          <FileText className="w-3 h-3 mr-1.5" />
          {publication.category.replace('-', ' ').charAt(0).toUpperCase() + publication.category.slice(1).replace('-', ' ')}
        </span>
        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2.5 py-1 rounded-full">
          {publication.journal}
        </span>
      </div>

      <Link href={`/publications/${publication._id}`}>
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors cursor-pointer">
          {publication.title}
        </h3>
      </Link>

      <div className="flex items-center text-sm text-gray-600 mb-4 gap-2">
        <Users className="w-4 h-4 text-primary-600 flex-shrink-0" />
        <span className="line-clamp-1 font-medium">
          {publication.authors.join(', ')}
        </span>
      </div>

      <p className="text-gray-600 mb-5 line-clamp-2 text-sm flex-1 leading-relaxed">
        {publication.abstract}
      </p>

      <div className="border-t border-gray-100 pt-4 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <Calendar className="w-4 h-4 mr-2 text-primary-600 flex-shrink-0" />
            {formatDate(publication.publishedDate)}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/publications/${publication._id}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
            >
              Read
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
            {publication.pdfUrl && (
              <a
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2.5 py-1 bg-primary-50 text-primary-600 hover:bg-primary-100 font-semibold text-sm rounded-md transition-colors"
                onClick={(e) => e.stopPropagation()}
                title="Download PDF"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard; 