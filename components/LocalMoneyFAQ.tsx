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

  // JSON-LD FAQPage
  const JsonLd = () => {
    const qas = faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer,
    }));
    const schema = buildFaqPageSchema(qas);
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
          Questions Fréquentes {cityName}
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="card-glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
            >
              <summary className="cursor-pointer font-semibold text-white text-lg flex items-center justify-between">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 text-white/60 transition-transform"
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

        <div className="mt-8 text-center">
          <a
            href="/faq"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
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

