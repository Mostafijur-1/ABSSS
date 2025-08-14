import { Calendar, Users, FileText, ExternalLink } from 'lucide-react';
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
    <div className="card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(publication.category)}`}>
          <FileText className="w-3 h-3 mr-1" />
          {publication.category.replace('-', ' ').charAt(0).toUpperCase() + publication.category.slice(1).replace('-', ' ')}
        </span>
        <span className="text-xs text-gray-500">
          {publication.journal}
        </span>
      </div>

      <Link href={`/publications/${publication._id}`}>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">
          {publication.title}
        </h3>
      </Link>

      <div className="flex items-center text-sm text-gray-500 mb-3">
        <Users className="w-4 h-4 mr-2" />
        <span className="line-clamp-1">
          {publication.authors.join(', ')}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {publication.abstract}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(publication.publishedDate)}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/publications/${publication._id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Read More
          </Link>
          {publication.pdfUrl && (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationCard; 