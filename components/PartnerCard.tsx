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
    <div className="group rounded-3xl border border-[#E3E5E8] bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:border-[#6BCFCF]/40">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[#6BCFCF]/20 to-[#4FB8B8]/30 border-2 border-[#6BCFCF]/30 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(107,207,207,0.4)]">
          <span className="text-2xl">🚛</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#04163a] mb-2">
            {partner.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-sm ${i < Math.floor(partner.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-[#4b5c6b]">
              {partner.rating} ({partner.reviews} avis)
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-[#4b5c6b] uppercase tracking-wider mb-2">Localisation</h4>
        <div className="flex flex-wrap gap-1">
          <span className="bg-[#6bcfcf]/10 text-[#2B7A78] border border-[#6bcfcf]/20 px-3 py-1 rounded-full text-xs font-medium">
            {partner.city}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-xs font-semibold text-[#4b5c6b] uppercase tracking-wider mb-2">Spécialités</h4>
        <ul className="text-sm text-[#04163a] space-y-1">
          {partner.specialties.map((specialty, index) => (
            <li key={index} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-[#6bcfcf] rounded-full mr-2"></span>
              {specialty}
            </li>
          ))}
        </ul>
      </div>
      
      <a 
        href="/devis-gratuits/"
        className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#6BCFCF] to-[#4FB8B8] px-4 py-3 text-sm font-semibold text-[#04141f] hover:shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        Demander un devis
      </a>
    </div>
  );
}
