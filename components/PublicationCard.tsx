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
      research: 'border border-sky-400/40 bg-sky-500/15 text-sky-100',
      review: 'border border-emerald-400/40 bg-emerald-500/15 text-emerald-100',
      'case-study': 'border border-violet-400/40 bg-violet-500/15 text-violet-100',
    };
    return colors[category as keyof typeof colors] || 'border border-slate-400/40 bg-slate-500/15 text-slate-100';
  };

  return (
    <div className="card border-white/10 bg-slate-950/60 p-6 text-slate-50 transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
      <div className="mb-3 flex items-center justify-between">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(publication.category)}`}>
          <FileText className="w-3 h-3 mr-1" />
          {publication.category.replace('-', ' ').charAt(0).toUpperCase() + publication.category.slice(1).replace('-', ' ')}
        </span>
        <span className="text-xs text-slate-300">
          {publication.journal}
        </span>
      </div>

      <Link href={`/publications/${publication._id}`}>
        <h3 className="mb-3 line-clamp-2 cursor-pointer text-lg font-semibold text-white transition-colors hover:text-sky-200">
          {publication.title}
        </h3>
      </Link>

      <div className="mb-3 flex items-center text-xs text-slate-300">
        <Users className="w-4 h-4 mr-2" />
        <span className="line-clamp-1">
          {publication.authors.join(', ')}
        </span>
      </div>

      <p className="mb-4 line-clamp-3 text-sm text-slate-200">
        {publication.abstract}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-slate-300">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(publication.publishedDate)}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/publications/${publication._id}`}
            className="inline-flex items-center text-sm font-medium text-sky-200 hover:text-sky-100"
          >
            Read More
          </Link>
          {publication.pdfUrl && (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-sky-200 hover:text-sky-100"
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
