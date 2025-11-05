interface Partner {
  name: string;
  city: string;
  rating: number;
  reviews: number;
  specialties: string[];
}

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="card-glass rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🚛</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            {partner.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-sm ${i < Math.floor(partner.rating) ? 'text-yellow-400' : 'text-white/30'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-white/60">
              {partner.rating} ({partner.reviews} avis)
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-white/80 mb-2">Localisation :</h4>
        <div className="flex flex-wrap gap-1">
          <span className="bg-[#6bcfcf]/20 text-[#6bcfcf] px-2 py-1 rounded-full text-xs">
            {partner.city}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-white/80 mb-2">Spécialités :</h4>
        <ul className="text-sm text-white/70 space-y-1">
          {partner.specialties.map((specialty, index) => (
            <li key={index} className="flex items-center">
              <span className="w-1 h-1 bg-[#6bcfcf] rounded-full mr-2"></span>
              {specialty}
            </li>
          ))}
        </ul>
      </div>
      
      <a 
        href="/inventaire-ia/"
        className="w-full inline-flex items-center justify-center rounded-xl bg-[#2b7a78] px-4 py-3 text-sm font-medium text-white hover:bg-[#2b7a78]/90 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:ring-offset-2 focus:ring-offset-transparent transition duration-300"
      >
        Demander un devis avec {partner.name}
      </a>
    </div>
  );
}
