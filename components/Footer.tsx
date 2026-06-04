import Link from 'next/link';
import { Mail, Phone, MapPin, GraduationCap, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Main Footer */}
      <div className="container-max section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-primary-600 to-primary-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-blue-300 bg-clip-text text-transparent">ABSSS</h3>
                <p className="text-sm text-gray-400 font-medium">Al Biruni Society of Scientific Studies</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Promoting scientific research, innovation, and collaboration among university students and faculty. 
              Join us in advancing knowledge and fostering academic excellence through groundbreaking research.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 bg-gray-700 hover:bg-primary-600 rounded-lg transition-colors group" title="Facebook">
                <Facebook className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 bg-gray-700 hover:bg-primary-600 rounded-lg transition-colors group" title="Twitter">
                <Twitter className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 bg-gray-700 hover:bg-primary-600 rounded-lg transition-colors group" title="LinkedIn">
                <Linkedin className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-600 to-primary-400 rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Events', href: '/events' },
                { name: 'Publications', href: '/publications' },
                { name: 'Members', href: '/members' },
                { name: 'Blog', href: '/blogs' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-primary-400 transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-600 to-primary-400 rounded-full mr-3"></span>
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 leading-relaxed text-sm">University Campus</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:absssiut@gmail.com" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-sm">
                  absssiut@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+8801633939262" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-sm">
                  +88 01633939262
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary-600/30 to-transparent mb-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Al Biruni Society of Scientific Studies. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Developed by <a href="https://github.com/Mostafijur-1" target="_blank" rel="noopener noreferrer" className="text-primary-400 font-semibold hover:underline">Mostafij CSE'21 IUT</a>
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm font-medium">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 