"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, GraduationCap } from './Icons';
import { authStorage } from '@/lib/clientAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const load = () => setUser(authStorage.getUser());
    load();
    const onAuth = () => load();
    window.addEventListener('storage', onAuth);
    window.addEventListener('authChanged', onAuth as EventListener);
    return () => {
      window.removeEventListener('storage', onAuth);
      window.removeEventListener('authChanged', onAuth as EventListener);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Events', href: '/events' },
    { name: 'Publications', href: '/publications' },
    { name: 'Blog', href: '/blogs' },
    { name: 'Members', href: '/members' },
    { name: 'Contact', href: '/contact' },
  ];

  if (user && ['admin', 'moderator', 'editor'].includes(user.role)) {
    navigation.push({ name: 'Dashboard', href: '/admin' });
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 pl-4 md:pl-0 group">
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

          {/* CTA / Auth Buttons */}
          <AuthActions />

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
          <MobileMenu navigation={navigation} onClose={() => setIsMenuOpen(false)} />
        )}
      </div>
    </header>
  );
};

function AuthActions() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const load = () => setUser(authStorage.getUser());
    load();
    const onAuth = () => load();
    window.addEventListener('storage', onAuth);
    window.addEventListener('authChanged', onAuth as EventListener);
    return () => {
      window.removeEventListener('storage', onAuth);
      window.removeEventListener('authChanged', onAuth as EventListener);
    };
  }, []);

  const handleLogout = () => {
    authStorage.clear();
    setUser(null);
    router.push('/');
  };

  if (!user) {
    return (
      <div className="hidden md:flex items-center space-x-3">
        <Link href="/login" className="px-3 py-1 text-sm rounded-md text-gray-700 hover:bg-gray-100 border border-gray-200">
          Login
        </Link>
        <Link href="/signup" className="btn-primary text-sm">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-3 relative">
      <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">{user.username?.charAt(0).toUpperCase()}</div>
        <span className="text-sm text-gray-700">{user.username}</span>
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-10 w-44 bg-white shadow-lg rounded-md py-1 z-50">
          {['admin', 'moderator', 'editor'].includes(user.role) && (
            <Link href="/admin" className="block px-4 py-2 text-sm text-primary-600 hover:bg-gray-50 border-b border-gray-100 font-semibold">
              Dashboard
            </Link>
          )}
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Logout</button>
        </div>
      )}
    </div>
  );
}

function MobileMenu({ navigation, onClose }: any) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(authStorage.getUser());
  }, []);

  const handleLogout = () => {
    authStorage.clear();
    onClose();
    router.push('/');
  };

  return (
    <div className="md:hidden border-t border-gray-100 animate-slide-up">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-b from-white to-gray-50">
        {navigation.map((item: any) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}

        <div className="px-4 py-2">
          {!user ? (
            <>
              <Link href="/login" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md" onClick={onClose}>Login</Link>
              <Link href="/signup" className="block mt-2 px-4 py-2.5 text-white bg-blue-600 rounded-md text-center" onClick={onClose}>Register</Link>
            </>
          ) : (
            <>
              {['admin', 'moderator', 'editor'].includes(user.role) && (
                <Link href="/admin" className="block px-4 py-2.5 text-primary-600 hover:bg-gray-100 rounded-md font-semibold" onClick={onClose}>
                  Dashboard
                </Link>
              )}
              <Link href="/profile" className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md" onClick={onClose}>Profile</Link>
              <a onClick={handleLogout} className="block mt-2 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">Logout</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header; 