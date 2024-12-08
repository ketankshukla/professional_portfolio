'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render the navbar if we're at the top
  if (!isScrolled && pathname === '/') return null;

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#blog', label: 'Blog' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If we're not on the home page, first navigate to home
    if (pathname !== '/') {
      window.location.href = href;
      return;
    }

    // Extract the section ID from the href
    const sectionId = href.split('#')[1];
    const element = document.getElementById(sectionId);
    
    if (element) {
      // For home section, scroll to top
      if (sectionId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // For other sections, account for navbar height
        const navHeight = 64; // height of navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const nameArray = 'KETAN SHUKLA'.split('');

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a 
              href="/#home"
              onClick={(e) => handleNavClick(e, '/#home')}
              className={`flex items-center gap-2 transition-all duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src="/images/profile/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex gap-1">
                {nameArray.map((letter, index) => (
                  <span
                    key={index}
                    className={`text-lg font-semibold transition-colors duration-300 ${
                      isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white'
                    }`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      display: letter === ' ' ? 'inline-block' : 'inline-block',
                      width: letter === ' ' ? '0.5em' : 'auto'
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              className={`p-2 transition-colors duration-300 ${
                isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={`sm:hidden shadow-lg ${
          isScrolled ? 'bg-white' : 'bg-gray-900'
        }`}>
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-3 py-2 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
