"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { eventsApi } from '@/lib/api';
import { Calendar } from 'lucide-react';
import { authStorage } from '@/lib/clientAuth';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  useEffect(() => {
    const loadUserAndProfile = async () => {
      const userData = authStorage.getUser();
      setUser(userData);
      
      if (userData && userData.role === 'student') {
        try {
          const token = authStorage.getToken();
          const res = await fetch('/api/users/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.bookmarks) {
              const eventBookmarks = data.bookmarks
                .filter((b: any) => b.itemType === 'event')
                .map((b: any) => b.itemId);
              setBookmarkedIds(eventBookmarks);
            }
            if (data.registeredEvents) {
              const eventRsvps = data.registeredEvents.map((e: any) => e._id || e);
              setRegisteredIds(eventRsvps);
            }
          }
        } catch (e) {
          console.error('Failed to load profile details in Events page', e);
        }
      }
    };
    loadUserAndProfile();
  }, []);

  const handleToggleBookmark = async (eventId: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    
    try {
      const token = authStorage.getToken();
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'toggleBookmark',
          itemId: eventId,
          itemType: 'event'
        })
      });
      
      if (res.ok) {
        if (bookmarkedIds.includes(eventId)) {
          setBookmarkedIds(bookmarkedIds.filter(id => id !== eventId));
        } else {
          setBookmarkedIds([...bookmarkedIds, eventId]);
        }
      }
    } catch (err) {
      console.error('Failed to toggle event bookmark', err);
    }
  };

  const handleToggleRSVP = async (eventId: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    
    try {
      const token = authStorage.getToken();
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'toggleRSVP',
          eventId
        })
      });
      
      if (res.ok) {
        if (registeredIds.includes(eventId)) {
          setRegisteredIds(registeredIds.filter(id => id !== eventId));
        } else {
          setRegisteredIds([...registeredIds, eventId]);
        }
      }
    } catch (err) {
      console.error('Failed to toggle event RSVP', err);
    }
  };

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
                <EventCard 
                  key={event._id} 
                  event={event} 
                  isStudent={user && user.role === 'student'}
                  isBookmarked={bookmarkedIds.includes(event._id)}
                  isRegistered={registeredIds.includes(event._id)}
                  onToggleBookmark={handleToggleBookmark}
                  onToggleRSVP={handleToggleRSVP}
                />
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