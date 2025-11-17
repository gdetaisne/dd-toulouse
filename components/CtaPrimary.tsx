"use client";

import { useState } from "react";

interface CtaPrimaryProps {
  placement: "hero" | "inline" | "footer";
  label?: string;
  className?: string;
}

export default function CtaPrimary({ placement, label, className = "" }: CtaPrimaryProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Rediriger vers la page Inventaire IA
    window.location.href = "/inventaire-ia/";
    
    setIsSubmitting(false);
  };

  const getPlacementStyles = () => {
    switch (placement) {
      case "hero":
        return "bg-gradient-to-r from-[#2b7a78] to-[#6bcfcf] py-16";
      case "inline":
        return "relative overflow-hidden rounded-3xl";
      case "footer":
        return "bg-white/5 py-12";
      default:
        return "bg-white/5 py-12";
    }
  };

  const getTitle = () => {
    switch (placement) {
      case "hero":
        return "Créez votre dossier en 30 minutes";
      case "inline":
        return "Prêt pour votre déménagement ?";
      case "footer":
        return "Démarrez votre projet dès maintenant";
      default:
        return "Obtenez votre devis";
    }
  };

  const getSubtitle = () => {
    switch (placement) {
      case "hero":
        return "5 devis personnalisés sous 7 jours grâce à notre réseau de partenaires";
      case "inline":
        return "Notre équipe vous accompagne dans votre projet de déménagement";
      case "footer":
        return "Rejoignez plus de 1200 clients satisfaits à Toulouse";
      default:
        return "Estimation gratuite et sans engagement";
    }
  };

  // Rendu spécial pour inline avec image
  if (placement === "inline") {
    return (
      <section className={`${getPlacementStyles()} ${className}`}>
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/cta/background.jpg"
            alt="Déménagement professionnel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b7a78]/95 to-[#2b7a78]/85"></div>
        </div>

        {/* Contenu */}
        <div className="relative container max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Colonne gauche - Texte */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span className="text-2xl">🚚</span>
                <span className="text-sm font-medium text-white">Démarrez votre projet</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {label || getTitle()}
              </h2>
              <p className="text-lg text-white/90 mb-6">
                {getSubtitle()}
              </p>

              {/* Points clés */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-white/90">
                  <svg className="w-6 h-6 text-[#6bcfcf] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Jusqu'à 5 devis personnalisés sous 7 jours</span>
                </li>
                <li className="flex items-start gap-3 text-white/90">
                  <svg className="w-6 h-6 text-[#6bcfcf] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% gratuit et sans engagement</span>
                </li>
                <li className="flex items-start gap-3 text-white/90">
                  <svg className="w-6 h-6 text-[#6bcfcf] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Partenaires certifiés à Toulouse</span>
                </li>
              </ul>
            </div>

            {/* Colonne droite - Formulaire */}
            <div className="w-full">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Commencez maintenant
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Remplissez vos coordonnées et accédez à notre inventaire IA
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Votre email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:border-transparent transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Votre numéro (optionnel)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:border-transparent transition"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#2b7a78] to-[#6bcfcf] text-white font-semibold hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:ring-offset-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Obtenir mes devis gratuits →"}
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  🔒 Vos données sont sécurisées et ne seront jamais partagées
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Rendu par défaut pour hero et footer
  return (
    <section className={`${getPlacementStyles()} ${className}`}>
      <div className="container max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          {label || getTitle()}
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          {getSubtitle()}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Votre numéro (optionnel)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-[#2b7a78] text-white font-medium hover:bg-[#2b7a78]/90 focus:outline-none focus:ring-2 focus:ring-[#6bcfcf] focus:ring-offset-2 focus:ring-offset-transparent transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Envoi..." : "Obtenez vos devis précis gratuitement"}
            </button>
          </form>
        </div>
        
        <p className="text-sm text-white/60 mt-4">
          * Service 100% gratuit, sans engagement. Vous recevrez jusqu'à 5 devis précis gratuitement sous 7 jours.
        </p>
      </div>
    </section>
  );
}
