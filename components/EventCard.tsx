import { Calendar, MapPin, Tag, ArrowRight, Bookmark } from 'lucide-react';
import { Event } from '@/lib/api';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
  isStudent?: boolean;
  isBookmarked?: boolean;
  isRegistered?: boolean;
  onToggleBookmark?: (id: string) => void;
  onToggleRSVP?: (id: string) => void;
}

const EventCard = ({ 
  event,
  isStudent = false,
  isBookmarked = false,
  isRegistered = false,
  onToggleBookmark,
  onToggleRSVP
}: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      conference: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      seminar: 'bg-purple-100 text-purple-800',
      lecture: 'bg-orange-100 text-orange-800',
      competition: 'bg-red-100 text-red-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card overflow-hidden group h-full flex flex-col relative">
      {isStudent && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleBookmark?.(event._id);
          }}
          className="absolute top-4 left-4 p-2 bg-white/80 hover:bg-white text-primary-600 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 z-10"
          title={isBookmarked ? "Remove Bookmark" : "Bookmark Event"}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-primary-600' : 'text-gray-400'}`} />
        </button>
      )}

      {event.image && (
        <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold badge ${getCategoryColor(event.category)}`}>
            <Tag className="w-3 h-3 mr-1.5" />
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
          {event.isUpcoming && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold badge-success">
              🔥 Upcoming
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-600 mb-5 line-clamp-2 text-sm flex-1">
          {event.description}
        </p>

        <div className="space-y-2.5 border-t border-gray-100 pt-4">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <Calendar className="w-4 h-4 mr-2.5 text-primary-600 flex-shrink-0" />
            {formatDate(event.date)}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <MapPin className="w-4 h-4 mr-2.5 text-primary-600 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <Link href={`/events/${event._id || ''}`} className="btn-primary flex-1 text-sm justify-center">
            Learn More
            <ArrowRight className="w-4 h-4" />
          </Link>
          {isStudent && (
            <button
              onClick={() => onToggleRSVP?.(event._id)}
              className={`px-4 py-2 text-sm font-bold rounded-xl border flex-1 transition-all flex items-center justify-center ${
                isRegistered
                  ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                  : 'bg-primary-50 text-primary-700 border-primary-100 hover:bg-primary-100'
              }`}
            >
              {isRegistered ? "RSVP'd ✓" : 'Register/RSVP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard; 