'use client';

import React, { useState } from 'react';
import PartnerCard from './PartnerCard';

interface Partner {
  name: string;
  city: string;
  rating: number;
  reviews: number;
  specialties: string[];
}

interface PartnersListProps {
  partners: Partner[];
}

export default function PartnersList({ partners }: PartnersListProps) {
  const [showAll, setShowAll] = useState(false);
  
  const visiblePartners = showAll ? partners : partners.slice(0, 9);
  const hasMorePartners = partners.length > 9;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePartners.map((partner, index) => (
          <PartnerCard key={index} partner={partner} />
        ))}
      </div>
      
      {hasMorePartners && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center justify-center rounded-xl bg-[#2b7a78] px-6 py-3 text-sm font-medium text-white hover:bg-[#2b7a78]/90 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:ring-offset-2 focus:ring-offset-transparent transition duration-300"
          >
            {showAll ? 'Masquer les partenaires' : 'Voir tous les partenaires'}
          </button>
        </div>
      )}
    </>
  );
}
