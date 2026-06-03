'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, GraduationCap } from './Icons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Publications', href: '/publications' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Members', href: '/members' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-2 rounded-lg transition-transform group-hover:scale-110">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">ABSSS</h1>
              <p className="text-xs text-gray-500 font-medium">Scientific Society</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-gray-700 font-medium transition-all duration-200 hover:text-primary-600 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="btn-primary text-sm">
              Get Involved
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-b from-white to-gray-50">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block px-4 py-2.5 mt-2 btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Involved
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 