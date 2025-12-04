'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SatellitePost {
  slug: string;
  cleanSlug: string;
  cleanCategory: string;
  title: string;
  word_count?: number;
  type: string;
  imageUrl: string; // Image calculée côté serveur
}

interface SatelliteArticlesSectionProps {
  satellitePosts: SatellitePost[];
}

export function SatelliteArticlesSection({ 
  satellitePosts
}: SatelliteArticlesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  
  const displayedPosts = showAll ? satellitePosts : satellitePosts.slice(0, 9);

  return (
    <section className="section pt-20">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm font-semibold mb-4">
            CONSEILS & ASTUCES
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">
            📝 Articles Pratiques
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Découvrez nos meilleurs conseils pour chaque aspect de votre déménagement
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayedPosts.map((post) => {
            
            return (
              <Link 
                key={post.slug} 
                href={`/blog/${post.cleanCategory}/${post.cleanSlug}/`}
                className="group"
              >
                    <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 hover:scale-105 hover:shadow-2xl hover:shadow-[#6bcfcf]/10 transition-all duration-300 h-full">
                      {/* Image avec overlay gradient */}
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04163a] via-[#04163a]/50 to-transparent"></div>
                    
                    {/* Badge catégorie */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#6bcfcf]/90 backdrop-blur-sm text-[#04163a] text-xs font-bold">
                        Article
                      </span>
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#6bcfcf] transition-colors mb-3 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {Math.ceil((post.word_count || 0) / 200)} min
                      </span>
                      <span className="text-[#6bcfcf] font-medium group-hover:text-white flex items-center gap-1">
                        Lire
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Bouton Voir Plus */}
        {!showAll && satellitePosts.length > 9 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              type="button"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/20 text-white font-semibold hover:bg-white/10 hover:border-[#6bcfcf]/50 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Voir tous les articles
              <span className="text-[#6bcfcf]">({satellitePosts.length})</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

