import { Calendar, MapPin, Tag } from 'lucide-react';
import { Event } from '@/lib/api';

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
      conference: 'border border-sky-400/40 bg-sky-500/15 text-sky-100',
      workshop: 'border border-emerald-400/40 bg-emerald-500/15 text-emerald-100',
      seminar: 'border border-violet-400/40 bg-violet-500/15 text-violet-100',
      lecture: 'border border-amber-400/40 bg-amber-500/15 text-amber-100',
      competition: 'border border-rose-400/40 bg-rose-500/15 text-rose-100',
    };
    return colors[category as keyof typeof colors] || 'border border-slate-400/40 bg-slate-500/15 text-slate-100';
  };

  return (
    <div className="card overflow-hidden border-white/10 bg-slate-950/60 text-slate-50 transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
      {event.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            <Tag className="w-3 h-3 mr-1" />
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
          {event.isUpcoming && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Upcoming
            </span>
          )}
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white">
          {event.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-sm text-slate-200">
          {event.description}
        </p>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(event.date)}
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4">
          <button className="btn-primary w-full">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 
