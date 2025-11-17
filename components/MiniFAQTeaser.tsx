import Link from "next/link";

import type { LocalFAQ } from "@/lib/faqs-locales";

interface MiniFAQTeaserProps {
  citySlug: string;
  cityName: string;
  faqs: LocalFAQ[];
}

function summarize(answer: string) {
  if (answer.length <= 210) return answer;
  return `${answer.slice(0, 210).trim()}…`;
}

export default function MiniFAQTeaser({ citySlug, cityName, faqs }: MiniFAQTeaserProps) {
  if (!faqs.length) return null;

  const featured = faqs.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6bcfcf]">FAQ locale</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Les questions qu’on nous pose à {cityName}
        </h2>
        <p className="text-white/75 max-w-3xl mx-auto">
          Prix, délais, autorisations… voici un extrait des réponses issues de nos guides détaillés.
          Besoin d’aller plus loin ? Consultez la FAQ complète.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((faq) => (
          <article
            key={faq.question}
            className="card-glass h-full rounded-2xl border border-white/10 bg-white/5 p-6 text-left"
          >
            <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">{summarize(faq.answer)}</p>
            <div className="mt-4 text-xs text-white/60">
              Source&nbsp;: {faq.source.replace("content/", "").split("/")[0]}
            </div>
          </article>
        ))}
      </div>

      <div className="text-center space-y-3">
        <Link href="/faq/" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
          Voir toutes les FAQ {cityName}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <p className="text-xs text-white/60">
          Données mises à jour automatiquement pour {citySlug.toUpperCase()}.
        </p>
      </div>
    </div>
  );
}

