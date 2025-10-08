import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CommentCaMarchePage() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2000&auto=format&fit=crop"
            alt="Processus de déménagement simplifié"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/90 to-[#04163a]/90"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:py-32">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Comment ça marche", href: "/comment-ca-marche" }
              ]}
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Comment ça marche : votre déménagement simplifié
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Un processus simple et transparent. Prenez vos photos, notre IA calcule votre volume, 
              vous recevez vos devis précis gratuitement. Nous nous occupons de tout le reste. Sans stress, sans engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Étapes détaillées */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              Le processus complet de votre déménagement
            </h2>
            
            <div className="space-y-12">
              {/* Étape 1 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#6bcfcf] flex items-center justify-center text-[#04163a] font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">Prenez vos photos</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Photographiez tous vos biens depuis votre smartphone. Il faut viser 3 à 5 photos par pièce 
                    pour une estimation optimale. Pas besoin d'être photographe professionnel !
                  </p>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Conseils pour de bonnes photos :</h4>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Cadrage large à hauteur de poitrine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Inclure plafonniers, lampes, objets fragiles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Plusieurs angles ok → un objet compté une seule fois</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="bg-[#6bcfcf] text-[#04163a] px-4 py-2 rounded-full text-sm font-bold">
                      ⏱️ 15 minutes
                    </span>
                    <span className="text-white/60 text-sm">Temps nécessaire</span>
                  </div>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#6bcfcf] flex items-center justify-center text-[#04163a] font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">Notre IA calcule votre volume</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Notre intelligence artificielle analyse vos photos et calcule le volume que représentent 
                    vos biens dans le cadre d'un déménagement, en tenant compte de l'emballage nécessaire.
                  </p>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Ce que fait notre IA :</h4>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Identification automatique de tous vos objets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Calcul précis du volume en m³</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Prise en compte de l'emballage nécessaire</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Estimation fiable à 90% dès la première fois</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="bg-[#6bcfcf] text-[#04163a] px-4 py-2 rounded-full text-sm font-bold">
                      ⚡ 2 minutes
                    </span>
                    <span className="text-white/60 text-sm">Traitement automatique</span>
                  </div>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#6bcfcf] flex items-center justify-center text-[#04163a] font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">Dites-nous vers où vous déménagez et le type de prestation</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Indiquez votre destination et précisez le type de service souhaité (économique, standard, premium) 
                    pour que nous puissions vous proposer les meilleures options.
                  </p>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <span className="bg-[#6bcfcf] text-[#04163a] px-4 py-2 rounded-full text-sm font-bold">
                      ⏱️ 5 minutes
                    </span>
                    <span className="text-white/60 text-sm">Temps nécessaire</span>
                  </div>
                </div>
              </div>

              {/* Étape 4 - Nous nous occupons de... */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#2b7a78] flex items-center justify-center text-white font-bold text-xl">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">Nous nous occupons de la sélection des déménageurs et de la collecte des devis</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Nous choisissons les déménageurs professionnels proches de chez vous les plus adaptés 
                    à votre demande, leur soumettons votre dossier et collectons les devis en 3 à 4 jours (max 7 jours).
                  </p>
                </div>
              </div>

              {/* Étape 5 - Nous nous occupons de... */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#2b7a78] flex items-center justify-center text-white font-bold text-xl">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">Nous nous occupons de la comparaison et de la présentation des offres</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Nous analysons tous les devis reçus, vérifions leur cohérence avec vos besoins 
                    et vous présentons trois offres finales, claires et comparables.
                  </p>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Ce que vous recevez :</h4>
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>3 à 5 devis détaillés et comparables</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Prix transparents, aucun frais caché</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Partenaires qualifiés et assurés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#6bcfcf] mt-1">•</span>
                        <span>Service 100% gratuit, sans engagement</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="bg-[#6bcfcf] text-[#04163a] px-4 py-2 rounded-full text-sm font-bold">
                      📅 3-7 jours
                    </span>
                    <span className="text-white/60 text-sm">Délai de réception</span>
                  </div>
                </div>
              </div>

              {/* Étape 6 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#6bcfcf] flex items-center justify-center text-[#04163a] font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">Vous sélectionnez et payez 30% d'acompte</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Choisissez l'offre qui vous convient et validez votre réservation en payant 
                    30% d'acompte en ligne de manière sécurisée (norme de marché imposée par nos partenaires déménageurs).
                  </p>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <span className="bg-[#6bcfcf] text-[#04163a] px-4 py-2 rounded-full text-sm font-bold">
                      ⏱️ 5 minutes
                    </span>
                    <span className="text-white/60 text-sm">Temps nécessaire</span>
                  </div>
                </div>
              </div>

              {/* Étape 7 - Nous nous occupons de... */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#2b7a78] flex items-center justify-center text-white font-bold text-xl">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-4">Nous nous occupons de la mise en relation avec le déménageur</h3>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Nous vous mettons en relation avec le déménageur choisi pour que vous puissiez 
                    commencer votre déménagement dans les meilleures conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages de notre méthode */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              Pourquoi cette méthode est-elle plus efficace ?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Gain de temps exceptionnel</h3>
                </div>
                <p className="text-white/80">
                  Fini les visites à domicile et les calculs manuels. En 30 minutes, vous obtenez 
                  une estimation précise et recevez plusieurs devis comparables. Un processus 
                  qui prendrait normalement plusieurs semaines se fait en quelques jours.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Précision garantie</h3>
                </div>
                <p className="text-white/80">
                  Notre IA analyse chaque photo avec une précision de 90%. Plus d'erreurs d'estimation 
                  ni de mauvaises surprises. Les déménageurs reçoivent un dossier complet et standardisé.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Devis comparables</h3>
                </div>
                <p className="text-white/80">
                  Tous nos partenaires reçoivent le même dossier standardisé. Vous comparez des offres 
                  équivalentes sur des critères identiques. Plus de devis incomparables !
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#6bcfcf] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#04163a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Économies significatives</h3>
                </div>
                <p className="text-white/80">
                  Recevez des devis précisément adaptés à votre besoin. Plus besoin de marge de manœuvre 
                  pour compenser l'incertitude. Vous payez le juste prix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ éclair */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-12">
              FAQ éclair
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Combien de photos faut-il ?</h3>
                <p className="text-white/80 text-sm">
                  Tout ce qui doit être déménagé. 3 à 10 par pièce. Plafonniers/lampes inclus. 
                  Vous pouvez prendre plusieurs photos d'un même objet : il ne sera compté qu'une fois.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">L'estimation m³ est-elle fiable ?</h3>
                <p className="text-white/80 text-sm">
                  Très fiable dès la première estimation (~90%). Vous pouvez ajuster ensuite. 
                  Nos partenaires valident et affinent : précision élevée.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Puis-je utiliser une vidéo ?</h3>
                <p className="text-white/80 text-sm">
                  Nous avons constaté des résultats moins fiables. Nous recommandons les photos 
                  pour une estimation optimale.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Objets fragiles (art, instruments) ?</h3>
                <p className="text-white/80 text-sm">
                  Identifiés et pris en compte ; emballage adapté recommandé. 
                  Déclaration de valeur conseillée.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Étudiant : comment déménager à petit budget ?</h3>
                <p className="text-white/80 text-sm">
                  Conseils d'optimisation, jours creux, entraide. 
                  Comparez gratuitement plusieurs offres.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Dois-je fournir mes cartons ?</h3>
                <p className="text-white/80 text-sm">
                  Souvent oui pour l'option économique. Des options "emballage inclus" 
                  existent dans les devis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Prêt à déménager en toute simplicité ?
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Commencez votre estimation gratuite dès maintenant. 
              Prenez vos photos, laissez notre IA calculer votre volume, recevez vos devis précis.
            </p>
            
            <a
              href="/inventaire-ia/"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#6bcfcf] px-8 text-lg font-semibold text-[#04163a] shadow-lg hover:bg-[#6bcfcf]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bcfcf]/50 transition duration-300"
            >
              Obtenez vos devis précis gratuitement
            </a>
            
            <p className="text-sm text-white/60 mt-6">
              ⚡ Estimation en 30 minutes • 🔒 100% sécurisé • 💰 Gratuit et sans engagement
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
