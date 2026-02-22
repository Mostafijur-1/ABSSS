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
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <section className="hero-gradient">
        <div className="container-max section-padding relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium text-[#e0f7ff] shadow-[0_10px_35px_rgba(3,4,94,0.65)] backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00b4d8]/20 text-[#e0f7ff]">
                  <GraduationCap className="h-3.5 w-3.5" />
                </span>
                <span className="uppercase tracking-[0.18em] text-[10px] text-[#caf0f8]">
                  Al Biruni Society of Scientific Studies
                </span>
              </div>
              <div>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-[#f9fbff] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
                  Advancing
                  <span className="block bg-gradient-to-r from-[#90e0ef] via-[#48cae4] to-[#ade8f4] bg-clip-text text-transparent">
                    Scientific Research
                  </span>
                  <span className="block text-[#e0f7ff]">
                    And Innovation
                  </span>
                </h1>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-[#e0f7ff]/80 sm:text-lg">
                Join a high-impact community of researchers, students, and mentors building the future of scientific discovery through collaboration, events, and publications.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/about" className="btn-primary text-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/events" className="btn-secondary text-center">
                  View Events
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in-up-slow">
              <div className="pointer-events-none absolute -inset-16 -z-10 bg-grid-faint opacity-40" />
              <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#00b4d8]/35 blur-3xl animate-blob-slow" />
              <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-[#48cae4]/30 blur-3xl animate-blob-slow" />

              <div className="relative rounded-3xl border border-white/14 bg-gradient-to-br from-[#023e8a]/92 via-[#0077b6]/88 to-[#03045e]/96 p-6 shadow-[0_24px_80px_rgba(3,4,94,0.9)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-[0_32px_90px_rgba(3,4,94,0.95)]">
                <div className="mb-6 flex items-center justify-between text-[11px] text-[#e0f7ff]/80">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00f5d4] shadow-[0_0_0_4px_rgba(0,245,212,0.28)]" />
                    <span className="uppercase tracking-[0.16em] text-[10px]">
                      Live scientific community
                    </span>
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#caf0f8]/80">
                    Realtime snapshot
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2 sm:border-r sm:border-white/10 sm:pr-6">
                    <div className="text-3xl font-semibold text-white sm:text-4xl">
                      50+
                    </div>
                    <div className="text-xs text-[#e0f7ff]/80">
                      Active Members
                    </div>
                    <p className="text-[11px] text-[#caf0f8]/80">
                      Cross-discipline researchers and student contributors.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-semibold text-white sm:text-4xl">
                      25+
                    </div>
                    <div className="text-xs text-[#e0f7ff]/80">
                      Research Papers
                    </div>
                    <p className="text-[11px] text-[#caf0f8]/80">
                      Peer-reviewed publications and conference submissions.
                    </p>
                  </div>
                  <div className="space-y-2 sm:border-r sm:border-white/10 sm:pr-6">
                    <div className="text-3xl font-semibold text-white sm:text-4xl">
                      15+
                    </div>
                    <div className="text-xs text-[#e0f7ff]/80">
                      Events Yearly
                    </div>
                    <p className="text-[11px] text-[#caf0f8]/80">
                      Workshops, seminars, and flagship conferences.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-semibold text-white sm:text-4xl">
                      5+
                    </div>
                    <div className="text-xs text-[#e0f7ff]/80">
                      Years Active
                    </div>
                    <p className="text-[11px] text-[#caf0f8]/80">
                      Established presence in the university ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#03045e]">
        <div className="container-max">
          <div className="mb-16 text-center animate-fade-in-up">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-[#caf0f8]">
              What We Do
            </h2>
            <p className="mx-auto max-w-3xl text-base text-[#90e0ef] sm:text-lg">
              We foster scientific excellence through research, collaboration, and education
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center animate-fade-in-up">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0077b6]/20 text-[#caf0f8]">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#f1f5f9]">
                Research Collaboration
              </h3>
              <p className="text-sm text-[#90e0ef]">
                Connect with fellow researchers and collaborate on groundbreaking scientific projects.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center animate-fade-in-up">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0077b6]/20 text-[#caf0f8]">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#f1f5f9]">
                Academic Events
              </h3>
              <p className="text-sm text-[#90e0ef]">
                Attend conferences, workshops, and seminars to expand your knowledge and network.
              </p>
            </div>

            <div className="card bg-gradient-to-b from-[#023e8a] to-[#03045e] p-6 text-center animate-fade-in-up">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0077b6]/20 text-[#caf0f8]">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#f1f5f9]">
                Publication Support
              </h3>
              <p className="text-sm text-[#90e0ef]">
                Get support for publishing your research in peer-reviewed journals and conferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#023e8a]">
        <div className="container-max">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-semibold text-[#caf0f8]">
                Upcoming Events
              </h2>
              <p className="text-[#90e0ef]">
                Don't miss our latest scientific events and workshops
              </p>
            </div>
            <Link href="/events" className="btn-primary">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.slice(0, 3).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#03045e]">
        <div className="container-max">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-semibold text-[#caf0f8]">
                Recent Publications
              </h2>
              <p className="text-[#90e0ef]">
                Latest research papers and scientific articles from our members
              </p>
            </div>
            <Link href="/publications" className="btn-primary">
              View All Publications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPublications.slice(0, 3).map((publication) => (
              <PublicationCard key={publication._id} publication={publication} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-[#023e8a] via-[#03045e] to-[#020617]">
        <div className="container-max">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#020b2a]/90 px-8 py-12 text-center shadow-[0_24px_80px_rgba(3,4,94,0.85)]">
            <div className="pointer-events-none absolute -left-20 -top-24 h-40 w-40 rounded-full bg-[#00b4d8]/25 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-[-60px] h-40 w-40 rounded-full bg-[#48cae4]/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-[#f9fbff]">
                Ready to Join ABSSS?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-base text-[#90e0ef] sm:text-lg">
                Become part of our scientific community and contribute to advancing research and innovation.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact" className="btn-secondary">
                  Contact Us
                </Link>
                <Link href="/members" className="btn-primary">
                  Meet Our Members
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
