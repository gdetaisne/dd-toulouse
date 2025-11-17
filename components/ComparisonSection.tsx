const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 13.5L9.5 18L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6L18 18M6 18L18 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ComparisonSection() {
  const items = [
    {
      title: "Déménagement seul",
      icon: "🚚",
      highlights: [
        "Temps passé : 2 à 3 jours",
        "Budget caché : location camion, essence, péages",
        "Stress : aucune assurance pro, risque de casse",
      ],
      negatives: [
        "Devis impossibles à comparer",
        "Pas de protection en cas de litige",
        "Organisation longue (visites, relances, appels)",
      ],
    },
    {
      title: "Avec Moverz (dès 280€)",
      icon: "✨",
      highlights: [
        "Processus 100% en ligne",
        "Volume identique (IA) envoyé à 5+ pros contrôlés",
        "Dossier anonyme : vous choisissez qui vous contactez",
      ],
      positives: [
        "Devis comparables ligne par ligne",
        "Assurances et contrats pros",
        "Support Moverz jusqu’au jour J",
      ],
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="card-glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-xl font-semibold text-white">
              {item.title}
            </h3>
          </div>

          <div className="mt-4 space-y-3 text-sm text-white/80">
            {(item.highlights || []).map((text) => (
              <div key={text} className="flex items-start gap-3">
                <span className="mt-3 h-0.5 w-5 rounded-full bg-[#6bcfcf]/80" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {(item.negatives || item.positives) && (
            <div className="mt-5 rounded-2xl bg-white/5 p-4 space-y-2 text-sm border border-white/10">
              {(item.negatives || []).map((text) => (
                <div key={text} className="flex items-start gap-3 text-red-200">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 text-red-300">
                    <CrossIcon className="h-3 w-3" />
                  </span>
                  <span>{text}</span>
                </div>
              ))}
              {(item.positives || []).map((text) => (
                <div key={text} className="flex items-start gap-3 text-emerald-200">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

