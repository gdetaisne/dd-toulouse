export default function DevisOptionsLight() {
  return (
    <div className="mt-12 grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
      {/* Option 1 : Devis précis (photos IA) - RECOMMANDÉ */}
      <div className="bg-gradient-to-br from-[#6bcfcf]/10 to-[#2b7a78]/5 rounded-2xl p-6 md:p-8 border-2 border-[#2b7a78] hover:scale-[1.02] transition-all duration-300 relative shadow-lg">
        {/* Badge recommandé */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#2b7a78] px-4 py-1 text-xs font-semibold text-white">
            ⭐ Recommandé
          </span>
        </div>

        <div className="flex items-center gap-3 mb-6 mt-2">
          <div className="text-4xl">📸</div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Devis précis</h3>
            <p className="text-gray-600 text-sm">Avec photos IA</p>
          </div>
        </div>
        
        <ul className="space-y-3 mb-8 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#2b7a78] text-lg mt-0.5 font-bold">✓</span>
            <span><strong className="text-gray-900">Volume IA exact</strong> → devis vraiment comparables</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2b7a78] text-lg mt-0.5 font-bold">✓</span>
            <span>3-5 photos par pièce <span className="text-gray-500">(30 min)</span></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2b7a78] text-lg mt-0.5 font-bold">✓</span>
            <span><strong className="text-gray-900">Précision 95%</strong> → aucune surprise le jour J</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2b7a78] text-lg mt-0.5 font-bold">✓</span>
            <span>3-5 devis garantis sous 7 jours</span>
          </li>
        </ul>
        
        <a 
          href="/inventaire-ia/" 
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2b7a78] px-6 text-base font-semibold text-white shadow-lg hover:bg-[#2b7a78]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7a78]/50 transition duration-300"
        >
          Comparer 5 devis précis
        </a>
        
        <p className="text-gray-500 text-xs mt-4 text-center">
          Pour un résultat fiable et sans mauvaise surprise
        </p>
      </div>

      {/* Option 2 : Estimation rapide (sans photos) */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 hover:scale-[1.02] hover:border-gray-300 transition-all duration-300 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">⚡</div>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Estimation rapide</h3>
            <p className="text-gray-600 text-sm">Sans photos</p>
          </div>
        </div>
        
        <ul className="space-y-3 mb-8 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#2b7a78] text-lg mt-0.5 font-bold">✓</span>
            <span>Formulaire simple <span className="text-gray-500">(30 secondes)</span></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2b7a78] text-lg mt-0.5 font-bold">✓</span>
            <span>Estimation approximative immédiate</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 text-lg mt-0.5 font-bold">⚠</span>
            <span className="text-gray-600">Moins précis → risque de variation jour J</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-400 text-lg mt-0.5">•</span>
            <span className="text-gray-500">Bon pour avoir une première idée de budget</span>
          </li>
        </ul>
        
        <a 
          href="/estimation-rapide/" 
          className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-white border-2 border-[#2b7a78] px-6 text-base font-semibold text-[#2b7a78] shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7a78]/50 transition duration-300"
        >
          Estimer mon budget
        </a>
        
        <p className="text-gray-500 text-xs mt-4 text-center">
          Pour une première idée sans engagement
        </p>
      </div>
    </div>
  );
}

