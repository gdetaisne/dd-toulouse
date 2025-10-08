'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isZonesDropdownOpen, setIsZonesDropdownOpen] = useState(false);
  const zonesDropdownRef = useRef<HTMLDivElement>(null);

  // Fermer les dropdowns quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (zonesDropdownRef.current && !zonesDropdownRef.current.contains(event.target as Node)) {
        setIsZonesDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Gestion du clavier pour les dropdowns
  const handleKeyDown = (event: React.KeyboardEvent, dropdownType: 'zones') => {
    if (event.key === 'Escape') {
      if (dropdownType === 'zones') {
        setIsZonesDropdownOpen(false);
      }
    }
  };

  // Tracking des clics
  const trackClick = (label: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('track', { 
        detail: { cat: 'nav', act: 'click', lbl: label } 
      }));
    }
  };

  const zonesItems = [
    { href: '/toulouse', label: 'Toulouse' },
    { href: '/toulouse/capitole', label: 'Capitole' },
    { href: '/toulouse/saint-cyprien', label: 'Saint-Cyprien' },
    { href: '/toulouse/carmes', label: 'Carmes' },
    { href: '/toulouse/jean-jaures', label: 'Jean Jaurès' },
    { href: '/toulouse/compans', label: 'Compans' },  ];


  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-white font-semibold tracking-tight text-lg md:text-xl"
          onClick={() => trackClick('logo')}
        >
          Déménageurs Toulouse (IA)
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

          {/* Zones Desservies Dropdown */}
          <div 
            ref={zonesDropdownRef}
            className="relative"
            onKeyDown={(e) => handleKeyDown(e, 'zones')}
          >
            <button
              className="hover:text-brand-secondary transition-colors flex items-center gap-1"
              onClick={() => setIsZonesDropdownOpen(!isZonesDropdownOpen)}
              onKeyDown={(e) => e.key === 'Enter' && setIsZonesDropdownOpen(!isZonesDropdownOpen)}
              aria-haspopup="menu"
              aria-expanded={isZonesDropdownOpen}
            >
              Zones desservies
              <svg 
                className={`w-4 h-4 transition-transform ${isZonesDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isZonesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur rounded-lg shadow-lg border border-white/20 py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Zones de départ
                </div>
                {zonesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                    onClick={() => {
                      setIsZonesDropdownOpen(false);
                      trackClick(`zones-${item.label.toLowerCase()}`);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Destinations fréquentes
                </div>
                <Link
                  href="/toulouse-vers-paris"
                  className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                  onClick={() => {
                    setIsZonesDropdownOpen(false);
                    trackClick('corridor-paris');
                  }}
                >
                  Toulouse → Paris
                </Link>
                <Link
                  href="/toulouse-vers-lyon"
                  className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                  onClick={() => {
                    setIsZonesDropdownOpen(false);
                    trackClick('corridor-lyon');
                  }}
                >
                  Toulouse → Lyon
                </Link>
                <Link
                  href="/toulouse-vers-Toulouse"
                  className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                  onClick={() => {
                    setIsZonesDropdownOpen(false);
                    trackClick('corridor-Toulouse');
                  }}
                >
                  Toulouse → Toulouse
                </Link>
              </div>
            )}
          </div>

          <Link 
            href="/partenaires" 
            className="hover:text-brand-secondary transition-colors"
            onClick={() => trackClick('partenaires')}
          >
            Partenaires
          </Link>
          <Link 
            href="/blog" 
            className="hover:text-brand-secondary transition-colors"
            onClick={() => trackClick('blog')}
          >
            Blog
          </Link>
          <Link 
            href="/faq" 
            className="hover:text-brand-secondary transition-colors"
            onClick={() => trackClick('faq')}
          >
            FAQ
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

            {/* Zones desservies */}
            <div>
              <div className="text-sm font-semibold text-gray-800 mb-2">Zones desservies</div>
              <div className="space-y-2 ml-4">
                {zonesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      trackClick(`mobile-zones-${item.label.toLowerCase()}`);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Autres liens */}
            <div className="space-y-2">
              <Link
                href="/partenaires"
                className="block text-sm font-semibold text-gray-800 hover:text-gray-600 transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackClick('mobile-partenaires');
                }}
              >
                Partenaires
              </Link>
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
              <Link
                href="/faq"
                className="block text-sm font-semibold text-gray-800 hover:text-gray-600 transition-colors"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  trackClick('mobile-faq');
                }}
              >
                FAQ
              </Link>
            </div>

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
