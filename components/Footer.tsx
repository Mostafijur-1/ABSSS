import Link from 'next/link';
import { Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gradient-to-b from-secondary-900 via-secondary-900 to-black text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 ring-1 ring-primary-500/30">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">ABSSS</h3>
                <p className="text-sm text-gray-400">Al Biruni Society of Scientific Studies</p>
              </div>
            </div>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-gray-300">
              Promoting scientific research, innovation, and collaboration among university students and faculty. 
              Join us in advancing knowledge and fostering academic excellence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 transition-colors hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-gray-300 transition-colors hover:text-white">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-gray-300 transition-colors hover:text-white">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-300">University Campus, Science Building</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <a href="mailto:info@absss.edu" className="text-gray-300 transition-colors hover:text-white">
                  info@absss.edu
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <a href="tel:+1234567890" className="text-gray-300 transition-colors hover:text-white">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Al Biruni Society of Scientific Studies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
