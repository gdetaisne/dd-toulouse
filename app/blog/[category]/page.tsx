import { getBlogPostsByCleanCategory, getAllBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Category labels mapping
const categoryLabels: { [key: string]: string } = {
  'etudiant': 'Déménagement Étudiant',
  'entreprise': 'Déménagement Entreprise',
  'piano': 'Déménagement Piano',
  'international': 'Déménagement International',
  'longue-distance': 'Longue Distance',
  'pas-cher': 'Déménagement Économique',
  'urgent': 'Déménagement Urgent',
  'devis': 'Devis Déménagement',
  'garde-meuble': 'Garde Meuble',
  'prix': 'Prix Déménagement',
  'prix-piano': 'Prix Piano'
};

const categoryDescriptions: { [key: string]: string } = {
  'etudiant': 'Tous nos guides et conseils pour réussir votre déménagement étudiant à toulouse : astuces budget, aides financières, et solutions pratiques.',
  'entreprise': 'Guides complets pour organiser votre déménagement d\'entreprise à toulouse : planification, logistique, et conseils professionnels.',
  'piano': 'Conseils d\'experts pour déménager votre piano à toulouse en toute sécurité : tarifs, techniques, et précautions.',
  'international': 'Tout savoir sur le déménagement international depuis toulouse : formalités, transport, et organisation.',
  'longue-distance': 'Guides pratiques pour vos déménagements longue distance depuis toulouse : préparation, coûts, et astuces.',
  'pas-cher': 'Astuces et conseils pour déménager à petit prix à toulouse sans compromettre la qualité.',
  'urgent': 'Solutions et conseils pour organiser un déménagement urgent à toulouse dans les meilleures conditions.',
  'devis': 'Guides pour comprendre et obtenir les meilleurs devis de déménagement à toulouse.',
  'garde-meuble': 'Tout savoir sur les solutions de garde-meuble à toulouse : tarifs, options, et conseils.',
  'prix': 'Guides détaillés sur les prix de déménagement à toulouse pour tous types de projets.',
  'prix-piano': 'Informations complètes sur les tarifs de déménagement de piano à toulouse.'
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryLabel = categoryLabels[params.category] || params.category;
  const categoryDescription = categoryDescriptions[params.category] || `Découvrez tous nos articles sur ${categoryLabel.toLowerCase()}.`;
  
  return {
    title: `${categoryLabel} - Blog Déménagement toulouse`,
    description: categoryDescription,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const posts = getBlogPostsByCleanCategory(params.category);
  
  if (!posts || posts.length === 0) {
    notFound();
  }

  const pilierPosts = posts.filter(post => post.type === 'pilier');
  const satellitePosts = posts.filter(post => post.type === 'satellite');
  
  const categoryLabel = categoryLabels[params.category] || params.category;
  const categoryDescription = categoryDescriptions[params.category] || `Découvrez tous nos articles sur ${categoryLabel.toLowerCase()}.`;
  
  // Images Unsplash par catégorie (libre de droits)
  const categoryImages: { [key: string]: string } = {
    'etudiant': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', // Étudiants avec cartons
    'entreprise': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', // Bureau moderne
    'prix': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80', // Calculatrice et budget
    'devis': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', // Documents et planification
    'pas-cher': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80', // Tirelire économies
    'urgent': 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80', // Montre urgence
    'longue-distance': 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80', // Route longue distance
    'garde-meuble': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', // Entrepôt stockage
    'international': 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80', // Globe terrestre
    'piano': 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80', // Piano
  };
  
  const categoryImage = categoryImages[params.category] || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80';

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#04163a] via-[#2b7a78] to-[#6bcfcf] text-white">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: categoryLabel, href: `/blog/${params.category}` }
              ]}
            />
            <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {categoryLabel}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {categoryDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Guide Pilier - Bannière */}
      {pilierPosts.length > 0 && (
        <section className="section pb-8">
          <div className="container">
            {pilierPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2b7a78] via-[#6bcfcf] to-[#2b7a78] p-1">
                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <div className="relative bg-[#04163a] rounded-3xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#6bcfcf]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2b7a78]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
                      {/* Contenu texte */}
                      <div className="flex flex-col justify-center space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">📚</div>
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#6bcfcf] text-[#04163a]">
                            Guide Complet
                          </span>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-[#6bcfcf] transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-lg text-white/80 leading-relaxed">
                          {post.meta_description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span>{post.word_count} mots</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(post.publish_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6bcfcf] text-[#04163a] font-semibold group-hover:bg-white transition-colors">
                            Lire le guide complet
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      
                      {/* Image et Stats */}
                      <div className="hidden md:flex flex-col justify-center space-y-4">
                        <div className="relative rounded-2xl overflow-hidden group/img">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#04163a] via-transparent to-transparent z-10"></div>
                          <img 
                            src={categoryImage} 
                            alt={categoryLabel}
                            className="w-full h-64 object-cover group-hover/img:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 gap-2">
                            <div className="bg-[#04163a]/90 backdrop-blur-sm rounded-lg p-3 text-center border border-[#6bcfcf]/30">
                              <div className="text-lg font-bold text-[#6bcfcf]">100%</div>
                              <div className="text-xs text-white/80">Complet</div>
                            </div>
                            <div className="bg-[#04163a]/90 backdrop-blur-sm rounded-lg p-3 text-center border border-[#6bcfcf]/30">
                              <div className="text-lg font-bold text-[#6bcfcf]">{Math.ceil(post.word_count / 200)}'</div>
                              <div className="text-xs text-white/80">Lecture</div>
                            </div>
                            <div className="bg-[#04163a]/90 backdrop-blur-sm rounded-lg p-3 text-center border border-[#6bcfcf]/30">
                              <div className="text-lg font-bold text-[#6bcfcf]">{Math.floor(post.word_count / 1000)}k</div>
                              <div className="text-xs text-white/80">Mots</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles Satellites */}
      {satellitePosts.length > 0 && (
        <section className="section pt-8">
          <div className="container">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">
                Conseils et Astuces
              </h2>
              <p className="text-white/60 max-w-3xl">
                Découvrez nos articles détaillés pour approfondir vos connaissances
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {satellitePosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                  className="group"
                >
                  <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                    <div className="p-6 h-full flex flex-col">
                      <div className="mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#2b7a78] text-white">
                          📝 Article - {post.word_count} mots
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#6bcfcf] transition-colors mb-3 flex-grow">
                        {post.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-3">
                        {post.meta_description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/60 mt-auto">
                        <span>📅 {new Date(post.publish_date).toLocaleDateString('fr-FR')}</span>
                        <span className="text-[#6bcfcf] group-hover:text-[#2b7a78]">
                          Lire →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section bg-white/5">
        <div className="container">
          <div className="bg-gradient-to-r from-[#2b7a78] to-[#6bcfcf] rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt à déménager à toulouse ?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Notre équipe de déménageurs professionnels à toulouse est à votre disposition 
              pour vous accompagner dans votre projet.
            </p>
            <Link 
              href="/inventaire-ia" 
              className="inline-flex items-center px-8 py-4 rounded-2xl bg-white text-[#04163a] font-semibold hover:bg-white/90 transition duration-300"
            >
              Obtenir un devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

