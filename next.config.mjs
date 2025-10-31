/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',

  // SEO: Force trailing slash sur toutes les URLs (y compris homepage)
  trailingSlash: true,
  
  // Optimisations pour build CapRover
  typescript: {
    ignoreBuildErrors: true, // Skip type-check en production (fait en dev)
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint en production (fait en dev)
  },  
  // Headers de sécurité gérés par middleware.js

  // Configuration de sécurité supplémentaire
  experimental: {
    serverComponentsExternalPackages: []
  },

  // Optimisations de sécurité
  compress: true,
  
  // Configuration des images (si utilisées)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Redirections 404 - Nettoyage massif indexation cross-ville
  async redirects() {
    return [
      // WILDCARDS : Toutes les URLs d'autres villes → /blog (nettoyage massif)
      { source: '/blog/demenagement-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-nantes/:path*', destination: '/blog', permanent: true },
      
      // Piliers autres villes
      { source: '/blog/demenageur-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-rennes-prix/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenageur-nantes/:path*', destination: '/blog', permanent: true },
      
      // Prix autres villes
      { source: '/blog/prix-demenagement-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-nantes/:path*', destination: '/blog', permanent: true },
      
      // Garde-meuble autres villes
      { source: '/blog/garde-meuble-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble-nantes/:path*', destination: '/blog', permanent: true },
      
      // Petit demenagement autres villes
      { source: '/blog/petit-demenagement-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-nantes/:path*', destination: '/blog', permanent: true },
      
      // Demenagement pas cher autres villes
      { source: '/blog/demenagement-pas-cher-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-pas-cher-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-lyon-pas-cher/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-pas-cher-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-pas-cher-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-pas-cher-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-pas-cher-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-pas-cher-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-pas-cher-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-pas-cher-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-pas-cher-nantes/:path*', destination: '/blog', permanent: true },
      
      // Piano autres villes
      { source: '/blog/demenagement-piano-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-piano-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-piano-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-piano-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-piano-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-piano-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-piano-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-piano-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-piano-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-piano-nantes/:path*', destination: '/blog', permanent: true },
      
      // International autres villes
      { source: '/blog/demenagement-international-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-international-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-international-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-international-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-international-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-international-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-international-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-international-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-international-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-international-nantes/:path*', destination: '/blog', permanent: true },
      
      // Entreprise autres villes
      { source: '/blog/demenagement-entreprise-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-entreprise-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-entreprise-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-entreprise-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-entreprise-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-entreprise-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-entreprise-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-entreprise-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-entreprise-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-entreprise-nantes/:path*', destination: '/blog', permanent: true },
      
      // Aide autres villes
      { source: '/blog/aide-demenagement-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/aide-demenagement-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/aide-demenagement-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/aide-demenagement-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/aide-demenagement-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/aide-demenagement-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/aide-demenagement-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/aide-demenagement-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/aide-demenagement-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/aide-demenagement-nantes/:path*', destination: '/blog', permanent: true },
      
      // Location camion autres villes
      { source: '/blog/location-camion-lille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/location-camion-lyon/:path*', destination: '/blog', permanent: true },
      { source: '/blog/location-camion-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/location-camion-marseille/:path*', destination: '/blog', permanent: true },
      { source: '/blog/location-camion-nice/:path*', destination: '/blog', permanent: true },
      { source: '/blog/location-camion-rennes/:path*', destination: '/blog', permanent: true },
      { source: '/blog/location-camion-rouen/:path*', destination: '/blog', permanent: true },
      { source: '/blog/location-camion-strasbourg/:path*', destination: '/blog', permanent: true },
      { source: '/blog/location-camion-demenagement-montpellier/:path*', destination: '/blog', permanent: true },
      { source: '/blog/location-camion-nantes/:path*', destination: '/blog', permanent: true },
      
      // Autres spécifiques Bordeaux
      { source: '/blog/demenagement-etudiant-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-urgent-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-longue-distance-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/devis-demenagement-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/prix-demenagement-piano-bordeaux/:path*', destination: '/blog', permanent: true },
      { source: '/blog/demenagement-petit-volume-lyon/:path*', destination: '/blog', permanent: true },
      
      // Fichiers BATCH/PILIER/PLACEHOLDER supprimés (cache Google)
      { source: '/blog/satellites/article-satellite-:number-placeholder', destination: '/blog', permanent: true },
      { source: '/blog/satellites/BATCH-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/PILIER-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/LISTE-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/RAPPORT-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/ARTICLES-:path*', destination: '/blog', permanent: true },
      { source: '/blog/piliers/:path*', destination: '/blog', permanent: true },
      
      // Catégories vides/génériques
      { source: '/blog/international', destination: '/blog', permanent: true },
      { source: '/blog/longue-distance', destination: '/blog', permanent: true },
      { source: '/blog/devis', destination: '/blog', permanent: true },
      { source: '/blog/location-camion', destination: '/blog', permanent: true },
      
      // MAJUSCULES : Toulouse → toulouse
      { source: '/Toulouse/saint-cyprien', destination: '/toulouse/saint-cyprien', permanent: true },
      { source: '/Toulouse/compans', destination: '/toulouse/compans', permanent: true },
      { source: '/Toulouse/carmes', destination: '/toulouse/carmes', permanent: true },
      { source: '/Toulouse/jean-jaures', destination: '/toulouse/jean-jaures', permanent: true },
      { source: '/Toulouse/capitole', destination: '/toulouse/capitole', permanent: true },
      { source: '/Toulouse-vers-lyon', destination: '/toulouse-vers-lyon', permanent: true },
      { source: '/Toulouse-vers-paris', destination: '/toulouse-vers-paris', permanent: true },
      { source: '/Toulouse-vers-Toulouse', destination: '/', permanent: true },
      { source: '/Toulouse-vers-nantes', destination: '/toulouse-vers-nantes', permanent: true },
      { source: '/toulouse-vers-toulouse', destination: '/', permanent: true },
      { source: '/quartiers-Toulouse', destination: '/quartiers-toulouse', permanent: true },
      
      // QUARTIERS BORDEAUX sur Toulouse
      { source: '/toulouse/pessac', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/bastide', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/merignac', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/cauderan', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/chartrons', destination: '/quartiers-toulouse', permanent: true },
      { source: '/devis-demenagement-toulouse-chartrons/', destination: '/quartiers-toulouse', permanent: true },
      { source: '/devis-demenagement-toulouse-saint-pierre/', destination: '/quartiers-toulouse', permanent: true },
      { source: '/devis-demenagement-toulouse-cauderan/', destination: '/quartiers-toulouse', permanent: true },
      
      // SERVICES : Majuscules
      { source: '/services/demenagement-economique-Toulouse', destination: '/services/demenagement-economique-toulouse', permanent: true },
      { source: '/services/demenagement-standard-Toulouse', destination: '/services/demenagement-standard-toulouse', permanent: true },
      { source: '/services/demenagement-premium-Toulouse', destination: '/services/demenagement-premium-toulouse', permanent: true },
      
      // PAGES LÉGALES : Trailing slash
      { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
      { source: '/cgv/', destination: '/cgv', permanent: true },
      { source: '/politique-confidentialite/', destination: '/politique-confidentialite', permanent: true },
      
      // ANCIENNES URLs
      { source: '/estimation-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },
      { source: '/prix-demenagement-toulouse/', destination: '/blog', permanent: true },
      { source: '/devis-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },

      // CATÉGORIES BLOG VIDES → /blog (Fix CSV 30/10/2025)
      { source: '/blog/etudiant', destination: '/blog', permanent: true },
      { source: '/blog/urgent', destination: '/blog', permanent: true },
      { source: '/blog/devis', destination: '/blog', permanent: true },
      { source: '/blog/longue-distance', destination: '/blog', permanent: true },
    ];
  }
};

export default nextConfig;