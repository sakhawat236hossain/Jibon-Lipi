"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X, BookOpen, History, Heart, User, TrendingUp } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: 'হোম', href: '/', icon: <BookOpen size={18} /> },
    { name: 'ইতিহাস', href: '/history', icon: <History size={18} /> },
    { name: 'পরিবার', href: '/family', icon: <Heart size={18} /> },
    { name: 'দেখুন আপনার উন্নতি', href: '/analytics', icon: <TrendingUp size={18} /> },
  ];
 

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <BookOpen className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                জীবনলিপি
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2" />

            {/* Theme Toggle Button */}
            <button
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:ring-2 ring-indigo-500 transition-all"
            >
            </button>

            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition shadow-lg shadow-indigo-200 dark:shadow-none font-medium">
              <User size={18} />
              প্রোফাইল
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              className="p-2 text-gray-600 dark:text-yellow-400"
            >
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-3 py-3 text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl mt-4 font-medium">
              <User size={18} /> প্রোফাইল
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;