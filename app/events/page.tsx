
"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { eventsApi } from '@/lib/api';
import { Calendar } from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsApi.getAll();
        setEvents(data);
      } catch (error) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding text-center">
          <h1 className="text-5xl font-bold mb-6">Events</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Join us for exciting scientific events, workshops, conferences, and seminars. 
            Stay updated with the latest developments in research and innovation.
          </p>
        </div>
      </section>

      {/* All Events */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex items-center mb-8">
            <Calendar className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">All Events</h2>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading events...</div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600">
                No events are currently available in the database.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}