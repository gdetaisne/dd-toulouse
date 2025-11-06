'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Tracking des clics
  const trackClick = (label: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('track', { 
        detail: { cat: 'nav', act: 'click', lbl: label } 
      }));
    }
  };



  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3"
          onClick={() => trackClick('logo')}
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-16 w-16 object-cover rounded-sm"
          />
          <div className="text-white font-semibold tracking-tight text-sm md:text-base leading-tight flex flex-col">
            <span>Devis</span>
            <span>Déménageur</span>
            <span>Toulouse</span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {/* Comment ça marche Button */}
          <Link 
            href="/comment-ca-marche" 
            className="hover:text-brand-secondary transition-colors"
            onClick={() => trackClick('comment-ca-marche')}
          >
            Comment ça marche
          </Link>

          {/* Services Button */}
          <Link 
            href="/services" 
            className="hover:text-brand-secondary transition-colors"
            onClick={() => trackClick('services')}
          >
            Services
          </Link>

          <Link
            href="/blog" 
            className="hover:text-brand-secondary transition-colors"
            onClick={() => trackClick('blog')}
          >
            Blog
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Link 
            href="/inventaire-ia" 
            className="hidden sm:inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
            onClick={() => trackClick('cta-header')}
          >
            Obtenir 5 devis gratuits
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-brand-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu mobile"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur border-t border-white/10">
          <div className="container max-w-7xl mx-auto px-4 py-4 space-y-4">
            {/* Comment ça marche */}
            <Link
              href="/comment-ca-marche"
              className="block text-sm font-semibold text-gray-800 hover:text-gray-600 transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackClick('mobile-comment-ca-marche');
              }}
            >
              Comment ça marche
            </Link>

            {/* Services */}
            <Link
              href="/services"
              className="block text-sm font-semibold text-gray-800 hover:text-gray-600 transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackClick('mobile-services');
              }}
            >
              Services
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              className="block text-sm font-semibold text-gray-800 hover:text-gray-600 transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(false);
                trackClick('mobile-blog');
              }}
            >
              Blog
            </Link>

            {/* CTA Mobile */}
            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/inventaire-ia"
                className="block w-full text-center h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackClick('mobile-cta');
                }}
              >
                Obtenir 5 devis gratuits
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
