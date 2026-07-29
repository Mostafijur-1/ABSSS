import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  MapPin,
  Tag,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/database";
import EventModel from "@/lib/models/Event";

export const dynamic = "force-dynamic";

async function getEvent(id: string) {
  try {
    await connectDB();
    const event: any = await EventModel.findById(id).lean();
    if (!event) return null;
    return {
      ...event,
      _id: event._id.toString(),
      date: event.date?.toISOString?.() || event.date,
    };
  } catch {
    return null;
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await getEvent(params.id);
  if (!event) notFound();

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-primary-700 to-primary-950 text-white">
          <div className="container-max section-padding">
            <Link
              href="/events"
              className="mb-8 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-primary-100 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all events
            </Link>
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-bold text-white">
                    <Tag className="h-4 w-4" />
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                  {event.isUpcoming && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-300 px-3 py-1 text-sm font-bold text-amber-950">
                      <CheckCircle2 className="h-4 w-4" />
                      Upcoming
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                  {event.title}
                </h1>
                <div className="mt-7 grid gap-4 text-primary-100 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 shrink-0" />
                    <span className="font-semibold">{formattedDate}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                    <span className="font-semibold">{event.location}</span>
                  </div>
                </div>
              </div>

              {event.image && (
                <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-primary-900 shadow-2xl">
                  <img
                    src={event.image}
                    alt=""
                    className="h-full w-full object-cover"
                    decoding="async"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-max grid gap-12 lg:grid-cols-[1fr_340px]">
            <article>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary-700">
                About this event
              </p>
              <h2 className="mb-5 text-3xl font-extrabold text-slate-950">Event details</h2>
              <p className="whitespace-pre-line text-lg leading-8 text-slate-700">
                {event.description}
              </p>
            </article>

            <aside className="h-fit rounded-2xl border border-primary-100 bg-primary-50 p-6">
              <h2 className="text-xl font-bold text-primary-950">Interested in attending?</h2>
              <p className="mt-3 leading-relaxed text-primary-900/80">
                Contact the ABSSS team for registration details, accessibility
                questions, or collaboration opportunities.
              </p>
              <Link href="/contact" className="btn-primary mt-6 w-full">
                Contact the team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
