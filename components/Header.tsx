'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, GraduationCap } from './Icons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Publications', href: '/publications' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Members', href: '/members' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-slate-950/80 shadow-[0_16px_60px_rgba(15,23,42,0.9)]'
          : 'border-white/10 bg-slate-900/40 shadow-[0_12px_40px_rgba(15,23,42,0.75)]'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-[0_10px_30px_rgba(56,189,248,0.6)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-slate-50">
                ABSSS
              </span>
              <span className="text-xs text-slate-300">
                Al Biruni Society
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-sky-200'
                    : 'text-slate-300 hover:text-sky-200'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute inset-x-2 -bottom-2 h-[2px] rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400" />
                )}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 hover:bg-slate-800/70 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-white/10 bg-slate-950/95 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-sky-500/15 text-sky-100'
                      : 'text-slate-200 hover:bg-slate-800/80 hover:text-sky-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
