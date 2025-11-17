export default function ValueTriad() {
  const items = [
    {
      icon: "🛡️",
      title: "5+ déménageurs contrôlés",
      punchline: "Les meilleurs dossiers seulement",
      description: "Solvabilité vérifiée, 0 litige, contrats pros. Vous ne parlez qu’aux partenaires filtrés.",
    },
    {
      icon: "📏",
      title: "Calcul de volume en photos",
      punchline: "Même volume pour tout le monde",
      description:
        "Volume identique (ex : 28 m³) envoyé à tous les déménageurs → devis comparables ligne par ligne.",
    },
    {
      icon: "🙈",
      title: "Dossier anonyme",
      punchline: "Pas d’appels tant que vous ne l’avez pas décidé",
      description:
        "Vos coordonnées restent confidentielles jusqu’à ce que vous choisissiez le déménageur à contacter.",
    },
    {
      icon: "💶",
      title: "Service 100% gratuit",
      punchline: "Jamais de frais cachés Moverz",
      description:
        "Nous sommes rémunérés par les partenaires, jamais sur votre devis. Vous payez uniquement le déménagement.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6bcfcf]">
          Nos garanties
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Ce qui rend Moverz fiable (et différent)
        </h2>
        <p className="text-white/80 max-w-3xl mx-auto text-sm md:text-base">
          En clair : des pros vérifiés, un volume calculé de façon neutre, un dossier anonyme et un
          service gratuit pour vous. Tout est fait pour éviter les arnaques et les mauvaises
          surprises.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-[#6bcfcf]">{item.punchline}</p>
                <p className="mt-2 text-sm text-white/80">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}