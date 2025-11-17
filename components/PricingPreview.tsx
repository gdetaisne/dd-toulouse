export default function PricingPreview() {
  const tiers = [
    {
      type: "Calcul de volume + 5 devis",
      price: "Gratuit",
      badge: "Inclus pour tous",
    },
    {
      type: "Studio / T1",
      price: "300–700€",
      badge: "8–15 m³",
    },
    {
      type: "T2 / T3",
      price: "600–1 200€",
      badge: "18–28 m³",
    },
    {
      type: "Maison / grands volumes",
      price: "1 200€+",
      badge: "35 m³ et +",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2b7a78]">
        Tarifs indicatifs
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#04163a]">
          Des prix transparents, alignés sur votre volume
      </h2>
        <p className="text-[#04163a]/70 max-w-3xl mx-auto">
          Plages de prix observées pour un déménagement local, à volume équivalent. Pour les
          options (emballage, garde-meuble, etc.), voyez le détail dans nos formules.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.type}
            className="rounded-2xl border border-[#dfeaea] bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-[#04163a]">
                {tier.type}
              </h3>
              <span className="rounded-full bg-[#eef7f7] px-3 py-1 text-xs font-semibold text-[#2b7a78]">
                {tier.badge}
              </span>
            </div>
            <div className="mt-3 text-3xl font-bold text-[#04163a]">
              {tier.price}
            </div>
            {tier.type === "Calcul de volume + 5 devis" ? (
              <p className="mt-3 text-xs text-[#04163a]/65">
                Calcul du volume inclus dans la demande de devis. Vous ne payez que le déménagement choisi.
              </p>
            ) : (
              <p className="mt-3 text-xs text-[#04163a]/65">
                Exemple de fourchette pour un déménagement local en formule économique ou standard.
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <a
          href="/services/"
          className="inline-flex items-center justify-center rounded-2xl border border-[#2b7a78] px-6 py-3 text-sm font-semibold text-[#2b7a78] hover:bg-[#2b7a78] hover:text-white transition"
        >
          Voir le détail des formules et services
        </a>
        <a href="/inventaire-ia/" className="btn-accent text-sm">
          Calculer mon volume et recevoir 5 devis fiables
        </a>
      </div>
    </div>
  );
}
