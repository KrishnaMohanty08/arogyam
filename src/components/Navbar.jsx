'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/lib/firebaseConfig';

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return () => unsubscribe();
  }, []);

  const Navtags = [
    { label: 'Home', target: '/' },
    { label: 'Hospital Bed', target: '/hospitals' },
    { label: 'Emergency', target: '/emergency' },
    { label: 'Chatbot', target: '/chatbot' },
    { label: 'Reminders', target: '/reminders' },
    { label: 'Alerts', target: '/alerts' },
    { label: 'Doctors', target: '/doctors' },
  ];

  const linkStyle = (target) =>
    `px-2 font-heading transition-colors duration-100 rounded ${
      pathname === target
        ? 'bg-white text-[#3f8578] font-semibold'
        : 'text-white hover:bg-slate-200 hover:text-black'
    }`;

  return (
    <nav className="px-6 py-3 flex items-center justify-between bg-[#3f8578] shadow-md">
      {/* Logo and title */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Arogyam Logo" className="w-10" />
        <h1 className="text-xl font-bold text-white">Arogyam</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {Navtags.map((nav) => (
          <Link key={nav.target} href={nav.target} className={linkStyle(nav.target)}>
            {nav.label}
          </Link>
        ))}

        {user && (
          <Link
            href="/profile"
            className={`p-2 rounded-full transition border ${
              pathname === '/profile'
                ? 'bg-white border-white shadow text-[#3f8578]'
                : 'bg-white border-transparent text-[#3f8578] hover:shadow-md'
            }`}
            title="Profile"
          >
            <User
              size={20}
              strokeWidth={2}
              className="cursor-pointer transition-colors duration-150 hover:text-[#2f6e61]"
            />
          </Link>
        )}
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden px-6 py-4">
          <div className="flex flex-col space-y-4">
            {Navtags.map((nav) => (
              <Link
                key={nav.target}
                href={nav.target}
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded font-medium transition ${
                  pathname === nav.target
                    ? 'bg-[#3f8578] text-white font-semibold'
                    : 'text-black hover:bg-[#3f8578] hover:text-white'
                }`}
              >
                {nav.label}
              </Link>
            ))}

            {user && (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 p-2 rounded font-medium transition ${
                  pathname === '/profile'
                    ? 'bg-[#3f8578] text-white font-semibold'
                    : 'text-black hover:bg-[#3f8578] hover:text-white'
                }`}
              >
                <User className="w-5 h-5 cursor-pointer" />
                Profile
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
