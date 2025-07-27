import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import PublicationCard from '@/components/PublicationCard';
import { eventsApi, publicationsApi } from '@/lib/api';
import { ArrowRight, GraduationCap, Users, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  // Fetch data from API
  const [upcomingEvents, recentPublications] = await Promise.all([
    eventsApi.getUpcoming().catch(() => []),
    publicationsApi.getRecent().catch(() => []),
  ]);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="h-12 w-12" />
                <div>
                  <h1 className="text-4xl font-bold">ABSSS</h1>
                  <p className="text-primary-200">Al Biruni Society of Scientific Studies</p>
                </div>
              </div>
              
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Advancing Scientific
                <span className="block text-primary-200">Research & Innovation</span>
              </h2>
              
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Join our university-based scientific society dedicated to promoting research, 
                fostering collaboration, and inspiring the next generation of scientists and innovators.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="btn-primary text-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/events" className="btn-secondary text-center">
                  View Events
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-primary-200">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">25+</div>
                    <div className="text-primary-200">Research Papers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">15+</div>
                    <div className="text-primary-200">Events Yearly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">5+</div>
                    <div className="text-primary-200">Years Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We foster scientific excellence through research, collaboration, and education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Research Collaboration</h3>
              <p className="text-gray-600">
                Connect with fellow researchers and collaborate on groundbreaking scientific projects.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Academic Events</h3>
              <p className="text-gray-600">
                Attend conferences, workshops, and seminars to expand your knowledge and network.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Publication Support</h3>
              <p className="text-gray-600">
                Get support for publishing your research in peer-reviewed journals and conferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Upcoming Events
              </h2>
              <p className="text-gray-600">
                Don't miss our latest scientific events and workshops
              </p>
            </div>
            <Link href="/events" className="btn-primary">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.slice(0, 3).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Recent Publications
              </h2>
              <p className="text-gray-600">
                Latest research papers and scientific articles from our members
              </p>
            </div>
            <Link href="/publications" className="btn-primary">
              View All Publications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPublications.slice(0, 3).map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join ABSSS?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Become part of our scientific community and contribute to advancing research and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
            <Link href="/members" className="btn-primary">
              Meet Our Members
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 