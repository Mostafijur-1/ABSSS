import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="section-padding flex flex-1 items-center">
        <div className="container-max text-center">
          <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-800">
            <SearchX className="h-8 w-8" />
          </span>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-700">404 error</p>
          <h1 className="mt-3 text-4xl font-extrabold text-slate-950 sm:text-5xl">
            This page could not be found.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            The page may have moved, or the link may be out of date. You can
            return home or explore the latest ABSSS publications.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              <Home className="h-4 w-4" />
              Go to homepage
            </Link>
            <Link href="/publications" className="btn-outline">
              <ArrowLeft className="h-4 w-4" />
              Browse publications
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
