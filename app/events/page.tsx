
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
    <div className="min-h-screen bg-gray-950">
      <Header />
      <section className="hero-gradient">
        <div className="container-max section-padding relative z-10 text-center">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Events
          </h1>
          <p className="mx-auto max-w-3xl text-base text-primary-100 sm:text-lg">
            Join us for exciting scientific events, workshops, conferences, and seminars. 
            Stay updated with the latest developments in research and innovation.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-950">
        <div className="container-max">
          <div className="mb-8 flex items-center">
            <Calendar className="mr-3 h-8 w-8 text-sky-400" />
            <h2 className="text-3xl font-semibold text-white">All Events</h2>
          </div>
          {loading ? (
            <div className="py-12 text-center text-gray-300">Loading events...</div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-200">
              <Calendar className="mx-auto mb-4 h-16 w-16 text-gray-500" />
              <h3 className="mb-2 text-xl font-semibold text-white">No Events Found</h3>
              <p className="text-gray-300">
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
