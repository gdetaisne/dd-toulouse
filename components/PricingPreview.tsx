export default function PricingPreview() {
  const pricing = [
    { type: "Studio/T1", price: "300–700€", volume: "8–15 m³" },
    { type: "T2–T3", price: "600–1200€", volume: "18–28 m³" },
    { type: "Maison", price: "1200€+", volume: "≥35 m³" }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-8">
        Tarifs indicatifs
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {pricing.map((item, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 text-center hover:translate-y-[2px] transition">
            <h3 className="text-xl font-semibold text-white">{item.type}</h3>
            <div className="mt-4 text-2xl font-bold text-[#6bcfcf]">{item.price}</div>
            <div className="mt-1 text-sm text-white/70">{item.volume}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="/inventaire-ia/" className="btn-primary" aria-label="Obtenez vos devis précis gratuitement">Obtenez vos devis précis gratuitement</a>
      </div>
    </div>
  );
}