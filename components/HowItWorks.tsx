export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Créez votre dossier unique",
      description: "Quelques infos clés, un seul dossier pour tous les déménageurs.",
    },
    {
      number: "2", 
      title: "Nous filtrons les déménageurs",
      description: "Seuls les pros fiables, bien notés et assurés reçoivent votre demande.",
    },
    {
      number: "3",
      title: "Vous comparez 5+ devis fiables",
      description: "Même volume, mêmes options : des devis comparables, sans spam.",
    }
  ];

  return (
    <div className="relative overflow-hidden space-y-6 rounded-3xl bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-6 md:p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(107,207,207,0.2),_transparent_65%)] blur-3xl" />
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6BCFCF]">
          Processus en 3 étapes
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Comment fonctionne le comparateur ?
        </h2>
        <p className="text-sm md:text-base text-white/75 max-w-xl mx-auto">
          Un dossier unique, des pros filtrés, des devis enfin comparables.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/5 p-4 md:p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg hover:shadow-black/40"
          >
            <div className="mb-3 flex justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#6BCFCF] bg-[#0b304a] text-[12px] font-semibold text-[#6BCFCF] shadow-[0_0_0_4px_rgba(107,207,207,0.22)]">
                {step.number}
              </div>
            </div>
            <h3 className="text-sm md:text-base font-semibold text-white text-center md:text-left">
              {step.title}
            </h3>
            <p className="text-xs md:text-sm text-white/75">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-center">
        <a
          href="/inventaire-ia/"
          className="btn-primary"
          aria-label="Recevez 5+ devis fiables gratuitement"
        >
          Recevez 5+ devis fiables gratuitement
        </a>
        <a href="/comment-ca-marche/" className="btn-secondary text-sm">
          Voir le détail du fonctionnement
        </a>
      </div>
    </div>
  );
}