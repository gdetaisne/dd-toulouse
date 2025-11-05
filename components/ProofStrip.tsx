export default function ProofStrip() {
  const stats = [
    { value: "1200+", label: "clients satisfaits", icon: "👥" },
    { value: "4,9/5", label: "note moyenne", icon: "⭐" }, 
    { value: "30 min", label: "pour votre dossier complet", icon: "⚡" }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
        Chiffres‑clés
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className="card-glass rounded-2xl p-8 text-center"
          >
            <div className="text-4xl mb-4">{stat.icon}</div>
            <div className="text-4xl md:text-5xl font-bold text-[#6bcfcf] mb-2">
              {stat.value}
            </div>
            <div className="text-white/80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}