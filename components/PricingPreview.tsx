export default function PricingPreview() {
  const pricing = [
    { type: "Studio/T1", price: "280–450€", volume: "8–12 m³", formula: "Économique" },
    { type: "T2–T3", price: "600–1000€", volume: "18–28 m³", formula: "Standard" },
    { type: "Maison", price: "1200–1800€", volume: "30–40 m³", formula: "Premium" }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-4">
        Tarifs indicatifs
      </h2>
      <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
        Prix pour un déménagement local. <a href="/services/" className="text-[#6bcfcf] underline hover:text-[#6bcfcf]/80">Voir toutes les formules</a>
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {pricing.map((item, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 text-center hover:translate-y-[2px] transition">
            <div className="text-white/60 text-xs font-medium mb-2">{item.formula}</div>
            <h3 className="text-xl font-semibold text-white">{item.type}</h3>
            <div className="mt-4 text-3xl font-bold text-[#6bcfcf]">{item.price}</div>
            <div className="mt-1 text-sm text-white/70">{item.volume}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-white/60 text-sm mb-4">
          * Tarifs indicatifs pour un déménagement local. Devis personnalisé selon vos besoins.
        </p>
      </div>
    </div>
  );
}