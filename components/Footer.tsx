import Link from 'next/link';
import { Mail, Phone, MapPin, GraduationCap, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white">
      <div className="container-max section-padding-sm">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-primary-600 p-2.5">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xl font-extrabold tracking-tight text-white">ABSSS</p>
                <p className="text-sm font-medium text-slate-400">Al Biruni Society of Scientific Studies</p>
              </div>
            </div>
            <p className="max-w-xl leading-relaxed text-slate-300">
              A university community advancing scientific research, practical
              innovation, and meaningful collaboration among students, faculty,
              and researchers.
            </p>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
              Explore
            </h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-3 md:grid-cols-1">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Courses', href: '/courses' },
                { name: 'Events', href: '/events' },
                { name: 'Publications', href: '/publications' },
                { name: 'Members', href: '/members' },
                { name: 'Blog', href: '/blogs' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="font-medium text-slate-300 transition-colors hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
              Contact
            </h2>
            <address className="space-y-4 not-italic">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-300" />
                <span className="text-sm leading-relaxed text-slate-300">
                  Islamic University of Technology<br />
                  Gazipur, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary-300" />
                <a href="mailto:absssiut@gmail.com" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                  absssiut@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary-300" />
                <a href="tel:+8801633939262" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                  +880 1633-939262
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mb-8 h-px bg-slate-800"></div>

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-400">
              &copy; {currentYear} Al Biruni Society of Scientific Studies. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/about" className="text-sm font-medium text-slate-400 hover:text-white">
              Our mission
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-400 hover:text-white">
              Get in touch
            </Link>
            <a
              href="https://github.com/Mostafijur-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-white"
            >
              Developer
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
