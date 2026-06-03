import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';
import { Event } from '@/lib/api';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
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
    <div className="card overflow-hidden group h-full flex flex-col">
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

        <Link href={`/events/${event._id || ''}`} className="btn-primary w-full mt-5 text-sm justify-center">
          Learn More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard; 