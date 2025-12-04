const faqs = [
  {
    question: "Est-ce que le calcul de volume est vraiment gratuit ?",
    answer:
      "Oui. Le calcul de volume et l’envoi de votre dossier aux déménageurs sont 100% gratuits. Vous ne payez que le déménagement choisi, directement au déménageur.",
  },
  {
    question: "Dois-je obligatoirement envoyer des photos ?",
    answer:
      "Non. Vous pouvez choisir entre un calcul de volume en photos ou une estimation rapide sans photos. Les deux options restent sans engagement, c’est vous qui décidez.",
  },
  {
    question: "Combien de devis vais-je recevoir et en combien de temps ?",
    answer:
      "Nous visons au moins 5 devis comparables sous 3 à 7 jours. Tous les déménageurs chiffrent sur le même volume, ce qui permet de comparer ligne par ligne.",
  },
];

export default function GlobalFAQStrip() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6bcfcf]">
          Questions fréquentes
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Quelques réponses rapides avant de vous lancer
        </h2>
        <p className="text-white/80 max-w-3xl mx-auto">
          Pour le reste, vous pouvez consulter la FAQ détaillée ou nous écrire directement depuis la
          page contact.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-[#dfeaea] bg-white/95 p-5 shadow-sm hover:shadow-md transition-all"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <span className="text-sm font-semibold text-[#04163a]">
                {faq.question}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d0e4e4] bg-[#f6fbfb] text-xs text-[#2b7a78] group-open:rotate-180 transition">
                ▼
              </span>
            </summary>
            <div className="mt-3 text-sm text-[#04163a]/80 leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      <div className="text-center">
        <a
          href="/faq/"
          className="inline-flex items-center justify-center rounded-2xl border border-[#2b7a78] px-6 py-3 text-sm font-semibold text-[#2b7a78] hover:bg-[#2b7a78] hover:text-white transition"
        >
          Voir toutes les FAQ
        </a>
      </div>
    </div>
  );
}


