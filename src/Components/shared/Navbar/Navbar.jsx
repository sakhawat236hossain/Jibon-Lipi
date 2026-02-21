"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-700 flex items-center">
              <span className="mr-2">📖</span>
              জীবনলিপি
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-indigo-700 font-medium transition">হোম</Link>
            <Link href="/history" className="text-gray-600 hover:text-indigo-700 font-medium transition">ইতিহাস</Link>
            <Link href="/religion" className="text-gray-600 hover:text-indigo-700 font-medium transition">ধর্মীয়</Link>
            <Link href="/family" className="text-gray-600 hover:text-indigo-700 font-medium transition">পরিবার</Link>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition shadow-md">
              প্রোফাইল
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md">হোম</Link>
            <Link href="/history" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md">ইতিহাস</Link>
            <Link href="/religion" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md">ধর্মীয়</Link>
            <Link href="/family" className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md">পরিবার</Link>
            <button className="w-full text-left px-3 py-2 bg-indigo-600 text-white rounded-md mt-2">প্রোফাইল</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;