'use client';

import { useState } from 'react';
import { getLocalFAQs, type LocalFAQ } from '@/lib/faqs-locales';
import { buildFaqPageSchema } from '@/lib/schema/faq';

interface LocalMoneyFAQProps {
  citySlug: string;
  cityName: string;
}

export default function LocalMoneyFAQ({ citySlug, cityName }: LocalMoneyFAQProps) {
  const faqs = getLocalFAQs(citySlug);
  
  if (faqs.length === 0) return null;

  // JSON-LD Questions standalone (pas FAQPage pour éviter duplicate avec /faq)
  const JsonLd = () => {
    const questions = faqs.map(faq => ({
      '@context': 'https://schema.org',
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    }));
    
    return (
      <>
        {questions.map((q, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(q) }}
          />
        ))}
      </>
    );
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#2b7a78]/10 to-[#04163a]/20 border-y border-white/10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <span className="text-3xl">❓</span>
            Questions Fréquentes {cityName}
          </h2>
          <p className="text-white/70 text-sm md:text-base">
            Les réponses essentielles sur les prix et devis
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="card-glass rounded-2xl p-6 border-2 border-white/10 hover:border-[#6bcfcf]/50 transition-all hover:shadow-lg"
            >
              <summary className="cursor-pointer font-semibold text-white text-lg flex items-center justify-between">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 text-white/60 transition-transform flex-shrink-0 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="mt-4 text-white/80 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:border-[#6bcfcf]/50 transition-all"
          >
            Voir toutes les FAQ
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      
      <JsonLd />
    </section>
  );
}

