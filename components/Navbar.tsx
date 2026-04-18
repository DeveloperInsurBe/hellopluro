'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 text-gray-900 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl md:text-3xl font-bold text-blue-900 group-hover:text-blue-600 transition-all duration-300">
              HelloPluro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 lg:space-x-8">
            <Link 
              href="/" 
              className="px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50"
            >
              Services
            </Link>
            <Link 
              href="/learn-more" 
              className="px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 font-medium text-white bg-blue-900 hover:bg-blue-800 hover:shadow-lg"
            >
              Learn More
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-all duration-300 text-gray-900 hover:bg-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 backdrop-blur-sm bg-white/10 rounded-lg p-4 border border-gray-300">
            <Link 
              href="/" 
              className="block px-4 py-2 rounded-lg transition-all duration-300 font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-900"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-2 rounded-lg transition-all duration-300 font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-900"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="block px-4 py-2 rounded-lg transition-all duration-300 font-medium text-gray-900 hover:bg-blue-50 hover:text-blue-900"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/learn-more" 
              className="block px-4 py-2 rounded-lg transition-all duration-300 font-medium text-white bg-blue-900 hover:bg-blue-800"
              onClick={() => setIsOpen(false)}
            >
              Learn More
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
