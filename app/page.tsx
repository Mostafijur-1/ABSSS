import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import PublicationCard from '@/components/PublicationCard';
import Event from '@/lib/models/Event';
import Publication from '@/lib/models/Publication';
import { connectDB } from '@/lib/database';
import { Event as EventType, Publication as PublicationType } from '@/lib/api';
import { ArrowRight, Sparkles, Users, Calendar, BookOpen, Zap, Globe, Trophy } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function serializeEvent(event: any): EventType {
  return {
    ...event,
    _id: event._id.toString(),
    date: event.date?.toISOString?.() || event.date,
    createdAt: event.createdAt?.toISOString?.() || event.createdAt,
    updatedAt: event.updatedAt?.toISOString?.() || event.updatedAt,
  };
}

function serializePublication(publication: any): PublicationType {
  return {
    ...publication,
    _id: publication._id.toString(),
    publishedDate: publication.publishedDate?.toISOString?.() || publication.publishedDate,
    createdAt: publication.createdAt?.toISOString?.() || publication.createdAt,
    updatedAt: publication.updatedAt?.toISOString?.() || publication.updatedAt,
  };
}

async function getHomePageData() {
  try {
    await connectDB();

    let events = await Event.find({ isUpcoming: true })
      .sort({ date: 1 })
      .limit(3)
      .lean();

    if (events.length === 0) {
      events = await Event.find({ date: { $gte: new Date() } })
        .sort({ date: 1 })
        .limit(3)
        .lean();
    }

    const publications = await Publication.find({})
      .sort({ publishedDate: -1 })
      .limit(3)
      .lean();

    return {
      upcomingEvents: events.map(serializeEvent),
      recentPublications: publications.map(serializePublication),
    };
  } catch (error) {
    console.error('Homepage data fetch failed:', error);
    return {
      upcomingEvents: [],
      recentPublications: [],
    };
  }
}

export default async function HomePage() {
  const { upcomingEvents, recentPublications } = await getHomePageData();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container-max section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Sparkles className="h-4 w-4 text-primary-200" />
                <span className="text-sm text-primary-100 font-medium">Welcome to Scientific Excellence</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Advancing 
                <span className="block bg-gradient-to-r from-primary-200 to-blue-200 bg-clip-text text-transparent">Scientific Research</span>
              </h1>
              
              <p className="text-xl text-primary-100 mb-10 leading-relaxed max-w-lg">
                Join Al Biruni Society of Scientific Studies - a vibrant community of researchers, innovators, and students dedicated to pushing the boundaries of scientific knowledge.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="btn-primary group">
                  Explore Our Mission
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/events" className="btn-secondary">
                  Discover Events
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
                <div>
                  <div className="text-2xl font-bold text-primary-200">50+</div>
                  <div className="text-sm text-primary-300">Active Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-200">25+</div>
                  <div className="text-sm text-primary-300">Research Papers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-200">5+</div>
                  <div className="text-sm text-primary-300">Years Strong</div>
                </div>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="relative lg:h-96 hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm border border-white/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Users className="h-16 w-16 text-white/80" />
                  </div>
                  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Zap className="h-16 w-16 text-white/80" />
                  </div>
                  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center transform hover:scale-110 transition-transform">
                    <BookOpen className="h-16 w-16 text-white/80" />
                  </div>
                  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Globe className="h-16 w-16 text-white/80" />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We create an ecosystem for scientific excellence, collaboration, and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Research Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with brilliant minds and collaborate on groundbreaking scientific projects that push boundaries.
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full mx-auto"></div>
            </div>

            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Events</h3>
              <p className="text-gray-600 leading-relaxed">
                Attend dynamic conferences, workshops, and seminars led by industry experts and renowned researchers.
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full mx-auto"></div>
            </div>

            <div className="card p-8 text-center group hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-100 to-primary-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Publication Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Get guidance and resources to publish your research in top-tier peer-reviewed journals globally.
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-16">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-bold text-primary-600">UPCOMING</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Featured Events
              </h2>
              <p className="text-gray-600 text-lg">
                Explore our carefully curated scientific events and workshops
              </p>
            </div>
            <Link href="/events" className="btn-primary whitespace-nowrap group">
              View All Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.slice(0, 3).map((event, i) => (
              <div key={event._id} className="animate-slide-up">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Publications Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-16">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-bold text-primary-600">RESEARCH</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Latest Publications
              </h2>
              <p className="text-gray-600 text-lg">
                Breakthrough research and scientific discoveries from our community
              </p>
            </div>
            <Link href="/publications" className="btn-primary whitespace-nowrap group">
              View All Publications
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPublications.slice(0, 3).map((publication, i) => (
              <div key={publication._id} className="animate-slide-up">
                <PublicationCard publication={publication} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding bg-gradient-to-br from-primary-600 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="container-max text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Become part of a thriving ecosystem of researchers, innovators, and students dedicated to advancing scientific knowledge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary">
              Get In Touch
            </Link>
            <Link href="/members" className="btn-primary group">
              Meet Our Team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
