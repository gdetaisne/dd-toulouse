export default function ValueTriadDisruptive() {
  const values = [
    {
      icon: "🎯",
      title: "Devis vraiment comparables",
      subtitle: "Volume IA identique pour tous",
      other: "❌ Les autres : estimations différentes",
      moverz: "✅ Moverz : même volume → vraie comparaison"
    },
    {
      icon: "🛡️",
      title: "Dossier anonyme jusqu'à votre choix",
      subtitle: "Vos coordonnées restent privées",
      other: "❌ Les autres : coordonnées partagées → appels immédiats",
      moverz: "✅ Moverz : vous choisissez quand révéler"
    },
    {
      icon: "✅",
      title: "3-5 devis garantis",
      subtitle: "Réponse sous 7 jours max",
      other: "❌ Les autres : \"jusqu'à 6\" (pas de garantie)",
      moverz: "✅ Moverz : minimum 3 répondent en 7j"
    },
    {
      icon: "🔍",
      title: "Déménageurs vérifiés",
      subtitle: "Google notes + solvabilité",
      other: "❌ Les autres : \"audités\" (vague)",
      moverz: "✅ Moverz : critères transparents"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8">
        Nos garanties
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 hover:translate-y-[-2px] transition-all duration-300 border-2 border-[#2b7a78]/30 hover:border-[#2b7a78] shadow-sm">
            <div className="text-3xl mb-3 text-center">{value.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{value.title}</h3>
            <p className="mt-2 text-gray-700 text-sm text-center mb-4">{value.subtitle}</p>
            <div className="space-y-2 text-xs">
              <div className="text-red-600">{value.other}</div>
              <div className="text-[#2b7a78] font-medium">{value.moverz}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

