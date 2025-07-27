import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { eventsApi } from '@/lib/api';
import { Calendar, Filter } from 'lucide-react';

export default async function EventsPage() {
  // Fetch all events
  const allEvents = await eventsApi.getAll().catch(() => []);
  
  // Separate upcoming and past events
  const upcomingEvents = allEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = allEvents.filter(event => new Date(event.date) < new Date());

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

      {/* Upcoming Events */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex items-center mb-8">
            <Calendar className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Upcoming Events</h3>
              <p className="text-gray-600">
                Check back soon for new events and workshops.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="flex items-center mb-8">
            <Filter className="w-8 h-8 text-primary-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Past Events</h2>
          </div>

          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Past Events</h3>
              <p className="text-gray-600">
                Our event history will appear here once we have hosted events.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Event Categories */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We host various types of events to cater to different interests and expertise levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="card p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conferences</h3>
              <p className="text-gray-600 text-sm">
                Annual scientific conferences with keynote speakers and research presentations
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Workshops</h3>
              <p className="text-gray-600 text-sm">
                Hands-on workshops on various scientific topics and research methodologies
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Seminars</h3>
              <p className="text-gray-600 text-sm">
                Educational seminars on advanced research topics and methodologies
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎤</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lectures</h3>
              <p className="text-gray-600 text-sm">
                Expert lectures by renowned scientists and researchers
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitions</h3>
              <p className="text-gray-600 text-sm">
                Science fairs and research competitions for students
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to Host an Event?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Have an idea for a scientific event? We'd love to hear from you and help make it happen.
          </p>
          <a href="/contact" className="btn-secondary">
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
} 