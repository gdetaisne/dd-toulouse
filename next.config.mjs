import { getMoverzBlogRedirectsForHost } from './scripts/blog-moverz-redirects.mjs';

const HOST = 'devis-demenageur-toulouse.fr';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  trailingSlash: true,
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    serverComponentsExternalPackages: []
  },

  compress: true,
  
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

  async redirects() {
    const existing = [
      // Homepage → Page ville moverz.fr
      { source: '/', destination: 'https://moverz.fr/demenagement/toulouse/', permanent: true },
      // Blog hub → moverz.fr
      { source: '/blog', destination: 'https://moverz.fr/blog/', permanent: true },
      { source: '/blog/', destination: 'https://moverz.fr/blog/', permanent: true },
      // Corridors (canonique B: paris-vers-<ville>) → moverz.fr
      // Corridors (CSV 2025-12-17-2) → moverz.fr
      { source: '/bordeaux-vers-lille', destination: 'https://moverz.fr/bordeaux-vers-lille/', permanent: true },
      { source: '/bordeaux-vers-lille/', destination: 'https://moverz.fr/bordeaux-vers-lille/', permanent: true },
      { source: '/lyon-vers-bordeaux', destination: 'https://moverz.fr/lyon-vers-bordeaux/', permanent: true },
      { source: '/lyon-vers-bordeaux/', destination: 'https://moverz.fr/lyon-vers-bordeaux/', permanent: true },
      { source: '/lyon-vers-lille', destination: 'https://moverz.fr/lyon-vers-lille/', permanent: true },
      { source: '/lyon-vers-lille/', destination: 'https://moverz.fr/lyon-vers-lille/', permanent: true },
      { source: '/lyon-vers-marseille', destination: 'https://moverz.fr/lyon-vers-marseille/', permanent: true },
      { source: '/lyon-vers-marseille/', destination: 'https://moverz.fr/lyon-vers-marseille/', permanent: true },
      { source: '/lyon-vers-nantes', destination: 'https://moverz.fr/lyon-vers-nantes/', permanent: true },
      { source: '/lyon-vers-nantes/', destination: 'https://moverz.fr/lyon-vers-nantes/', permanent: true },
      { source: '/lyon-vers-paris', destination: 'https://moverz.fr/paris-vers-lyon/', permanent: true },
      { source: '/lyon-vers-paris/', destination: 'https://moverz.fr/paris-vers-lyon/', permanent: true },
      { source: '/lyon-vers-toulouse', destination: 'https://moverz.fr/lyon-vers-toulouse/', permanent: true },
      { source: '/lyon-vers-toulouse/', destination: 'https://moverz.fr/lyon-vers-toulouse/', permanent: true },
      { source: '/marseille-vers-bordeaux', destination: 'https://moverz.fr/marseille-vers-bordeaux/', permanent: true },
      { source: '/marseille-vers-bordeaux/', destination: 'https://moverz.fr/marseille-vers-bordeaux/', permanent: true },
      { source: '/marseille-vers-lille', destination: 'https://moverz.fr/marseille-vers-lille/', permanent: true },
      { source: '/marseille-vers-lille/', destination: 'https://moverz.fr/marseille-vers-lille/', permanent: true },
      { source: '/marseille-vers-lyon', destination: 'https://moverz.fr/marseille-vers-lyon/', permanent: true },
      { source: '/marseille-vers-lyon/', destination: 'https://moverz.fr/marseille-vers-lyon/', permanent: true },
      { source: '/marseille-vers-nantes', destination: 'https://moverz.fr/marseille-vers-nantes/', permanent: true },
      { source: '/marseille-vers-nantes/', destination: 'https://moverz.fr/marseille-vers-nantes/', permanent: true },
      { source: '/marseille-vers-paris', destination: 'https://moverz.fr/paris-vers-marseille/', permanent: true },
      { source: '/marseille-vers-paris/', destination: 'https://moverz.fr/paris-vers-marseille/', permanent: true },
      { source: '/marseille-vers-toulouse', destination: 'https://moverz.fr/marseille-vers-toulouse/', permanent: true },
      { source: '/marseille-vers-toulouse/', destination: 'https://moverz.fr/marseille-vers-toulouse/', permanent: true },
      { source: '/nice-vers-bordeaux', destination: 'https://moverz.fr/nice-vers-bordeaux/', permanent: true },
      { source: '/nice-vers-bordeaux/', destination: 'https://moverz.fr/nice-vers-bordeaux/', permanent: true },
      { source: '/nice-vers-lille', destination: 'https://moverz.fr/nice-vers-lille/', permanent: true },
      { source: '/nice-vers-lille/', destination: 'https://moverz.fr/nice-vers-lille/', permanent: true },
      { source: '/nice-vers-lyon', destination: 'https://moverz.fr/nice-vers-lyon/', permanent: true },
      { source: '/nice-vers-lyon/', destination: 'https://moverz.fr/nice-vers-lyon/', permanent: true },
      { source: '/nice-vers-marseille', destination: 'https://moverz.fr/nice-vers-marseille/', permanent: true },
      { source: '/nice-vers-marseille/', destination: 'https://moverz.fr/nice-vers-marseille/', permanent: true },
      { source: '/nice-vers-paris', destination: 'https://moverz.fr/paris-vers-nice/', permanent: true },
      { source: '/nice-vers-paris/', destination: 'https://moverz.fr/paris-vers-nice/', permanent: true },
      { source: '/nice-vers-toulouse', destination: 'https://moverz.fr/nice-vers-toulouse/', permanent: true },
      { source: '/nice-vers-toulouse/', destination: 'https://moverz.fr/nice-vers-toulouse/', permanent: true },
      { source: '/paris-vers-bordeaux', destination: 'https://moverz.fr/paris-vers-bordeaux/', permanent: true },
      { source: '/paris-vers-bordeaux/', destination: 'https://moverz.fr/paris-vers-bordeaux/', permanent: true },
      { source: '/paris-vers-lille', destination: 'https://moverz.fr/paris-vers-lille/', permanent: true },
      { source: '/paris-vers-lille/', destination: 'https://moverz.fr/paris-vers-lille/', permanent: true },
      { source: '/paris-vers-lyon', destination: 'https://moverz.fr/paris-vers-lyon/', permanent: true },
      { source: '/paris-vers-lyon/', destination: 'https://moverz.fr/paris-vers-lyon/', permanent: true },
      { source: '/paris-vers-marseille', destination: 'https://moverz.fr/paris-vers-marseille/', permanent: true },
      { source: '/paris-vers-marseille/', destination: 'https://moverz.fr/paris-vers-marseille/', permanent: true },
      { source: '/paris-vers-nantes', destination: 'https://moverz.fr/paris-vers-nantes/', permanent: true },
      { source: '/paris-vers-nantes/', destination: 'https://moverz.fr/paris-vers-nantes/', permanent: true },
      { source: '/paris-vers-toulouse', destination: 'https://moverz.fr/paris-vers-toulouse/', permanent: true },
      { source: '/paris-vers-toulouse/', destination: 'https://moverz.fr/paris-vers-toulouse/', permanent: true },
      { source: '/toulouse-vers-bordeaux', destination: 'https://moverz.fr/toulouse-vers-bordeaux/', permanent: true },
      { source: '/toulouse-vers-bordeaux/', destination: 'https://moverz.fr/toulouse-vers-bordeaux/', permanent: true },
      { source: '/toulouse-vers-lille', destination: 'https://moverz.fr/toulouse-vers-lille/', permanent: true },
      { source: '/toulouse-vers-lille/', destination: 'https://moverz.fr/toulouse-vers-lille/', permanent: true },
      { source: '/toulouse-vers-lyon', destination: 'https://moverz.fr/toulouse-vers-lyon/', permanent: true },
      { source: '/toulouse-vers-lyon/', destination: 'https://moverz.fr/toulouse-vers-lyon/', permanent: true },
      { source: '/toulouse-vers-marseille', destination: 'https://moverz.fr/toulouse-vers-marseille/', permanent: true },
      { source: '/toulouse-vers-marseille/', destination: 'https://moverz.fr/toulouse-vers-marseille/', permanent: true },
      { source: '/toulouse-vers-nantes', destination: 'https://moverz.fr/toulouse-vers-nantes/', permanent: true },
      { source: '/toulouse-vers-nantes/', destination: 'https://moverz.fr/toulouse-vers-nantes/', permanent: true },
      { source: '/toulouse-vers-paris', destination: 'https://moverz.fr/paris-vers-toulouse/', permanent: true },
      { source: '/toulouse-vers-paris/', destination: 'https://moverz.fr/paris-vers-toulouse/', permanent: true },
      { source: '/quartiers-paris', destination: 'https://moverz.fr/demenagement/paris/', permanent: true },
      { source: '/quartiers-paris/', destination: 'https://moverz.fr/demenagement/paris/', permanent: true },

      { source: '/nice-vers-paris', destination: 'https://moverz.fr/paris-vers-nice/', permanent: true },
      { source: '/nice-vers-paris/', destination: 'https://moverz.fr/paris-vers-nice/', permanent: true },
      { source: '/lyon-vers-paris', destination: 'https://moverz.fr/paris-vers-lyon/', permanent: true },
      { source: '/lyon-vers-paris/', destination: 'https://moverz.fr/paris-vers-lyon/', permanent: true },
      { source: '/marseille-vers-paris', destination: 'https://moverz.fr/paris-vers-marseille/', permanent: true },
      { source: '/marseille-vers-paris/', destination: 'https://moverz.fr/paris-vers-marseille/', permanent: true },
      { source: '/toulouse-vers-paris', destination: 'https://moverz.fr/paris-vers-toulouse/', permanent: true },
      { source: '/toulouse-vers-paris/', destination: 'https://moverz.fr/paris-vers-toulouse/', permanent: true },
      { source: '/bordeaux-vers-paris', destination: 'https://moverz.fr/paris-vers-bordeaux/', permanent: true },
      { source: '/bordeaux-vers-paris/', destination: 'https://moverz.fr/paris-vers-bordeaux/', permanent: true },
      { source: '/lille-vers-paris', destination: 'https://moverz.fr/paris-vers-lille/', permanent: true },
      { source: '/lille-vers-paris/', destination: 'https://moverz.fr/paris-vers-lille/', permanent: true },
      { source: '/strasbourg-vers-paris', destination: 'https://moverz.fr/paris-vers-strasbourg/', permanent: true },
      { source: '/strasbourg-vers-paris/', destination: 'https://moverz.fr/paris-vers-strasbourg/', permanent: true },
      { source: '/nantes-vers-paris', destination: 'https://moverz.fr/paris-vers-nantes/', permanent: true },
      { source: '/nantes-vers-paris/', destination: 'https://moverz.fr/paris-vers-nantes/', permanent: true },
      { source: '/rennes-vers-paris', destination: 'https://moverz.fr/paris-vers-rennes/', permanent: true },
      { source: '/rennes-vers-paris/', destination: 'https://moverz.fr/paris-vers-rennes/', permanent: true },
      { source: '/rouen-vers-paris', destination: 'https://moverz.fr/paris-vers-rouen/', permanent: true },
      { source: '/rouen-vers-paris/', destination: 'https://moverz.fr/paris-vers-rouen/', permanent: true },
      { source: '/montpellier-vers-paris', destination: 'https://moverz.fr/paris-vers-montpellier/', permanent: true },
      { source: '/montpellier-vers-paris/', destination: 'https://moverz.fr/paris-vers-montpellier/', permanent: true },

      // Blog articles → moverz.fr
      { source: '/blog/demenagement-toulouse/:slug*', destination: 'https://moverz.fr/blog/:slug*', permanent: true },
      // Anciens formats d'URL (legacy)
      // Blog double-path : /blog/{category}/{slug} → moverz.fr/blog/{slug}/
      { source: '/blog/:category/:slug*', destination: 'https://moverz.fr/blog/:slug*', permanent: true },
      // Quartiers individuels : /{ville}/{quartier} → moverz.fr/{ville}/{quartier}/
      { source: '/nice/:quartier', destination: 'https://moverz.fr/nice/:quartier/', permanent: true },
      { source: '/lyon/:quartier', destination: 'https://moverz.fr/lyon/:quartier/', permanent: true },
      { source: '/marseille/:quartier', destination: 'https://moverz.fr/marseille/:quartier/', permanent: true },
      { source: '/toulouse/:quartier', destination: 'https://moverz.fr/toulouse/:quartier/', permanent: true },
      { source: '/bordeaux/:quartier', destination: 'https://moverz.fr/bordeaux/:quartier/', permanent: true },
      { source: '/lille/:quartier', destination: 'https://moverz.fr/lille/:quartier/', permanent: true },
      { source: '/strasbourg/:quartier', destination: 'https://moverz.fr/strasbourg/:quartier/', permanent: true },
      { source: '/nantes/:quartier', destination: 'https://moverz.fr/nantes/:quartier/', permanent: true },
      { source: '/rennes/:quartier', destination: 'https://moverz.fr/rennes/:quartier/', permanent: true },
      { source: '/rouen/:quartier', destination: 'https://moverz.fr/rouen/:quartier/', permanent: true },
      { source: '/montpellier/:quartier', destination: 'https://moverz.fr/montpellier/:quartier/', permanent: true },
      // Liens internes ville (self-référence) → moverz.fr
      { source: '/demenagement/toulouse', destination: 'https://moverz.fr/demenagement/toulouse/', permanent: true },
      { source: '/quartiers-toulouse', destination: 'https://moverz.fr/quartiers-toulouse/', permanent: true },
      // Liens partenaires/devis → moverz.fr
      { source: '/partenaires', destination: 'https://moverz.fr/partenaires/', permanent: true },
      { source: '/devis-gratuits', destination: 'https://moverz.fr/devis-gratuits/', permanent: true },
      // Catch-all blog articles (any slug) → moverz.fr
      { source: '/blog/:slug*', destination: 'https://moverz.fr/blog/:slug*', permanent: true },
      // Quartiers cross-ville → moverz.fr
      { source: '/quartiers-nice', destination: 'https://moverz.fr/quartiers-nice/', permanent: true },
      { source: '/quartiers-lyon', destination: 'https://moverz.fr/quartiers-lyon/', permanent: true },
      { source: '/quartiers-marseille', destination: 'https://moverz.fr/quartiers-marseille/', permanent: true },
      { source: '/quartiers-toulouse', destination: 'https://moverz.fr/quartiers-toulouse/', permanent: true },
      { source: '/quartiers-bordeaux', destination: 'https://moverz.fr/quartiers-bordeaux/', permanent: true },
      { source: '/quartiers-lille', destination: 'https://moverz.fr/quartiers-lille/', permanent: true },
      { source: '/quartiers-strasbourg', destination: 'https://moverz.fr/quartiers-strasbourg/', permanent: true },
      { source: '/quartiers-nantes', destination: 'https://moverz.fr/quartiers-nantes/', permanent: true },
      { source: '/quartiers-rennes', destination: 'https://moverz.fr/quartiers-rennes/', permanent: true },
      { source: '/quartiers-rouen', destination: 'https://moverz.fr/quartiers-rouen/', permanent: true },
      { source: '/quartiers-montpellier', destination: 'https://moverz.fr/quartiers-montpellier/', permanent: true },
      // Quartiers toulouse (6 pages)
      { source: '/toulouse/', destination: 'https://moverz.fr/toulouse/', permanent: true },
      { source: '/toulouse/capitole/', destination: 'https://moverz.fr/toulouse/capitole/', permanent: true },
      { source: '/toulouse/carmes/', destination: 'https://moverz.fr/toulouse/carmes/', permanent: true },
      { source: '/toulouse/compans/', destination: 'https://moverz.fr/toulouse/compans/', permanent: true },
      { source: '/toulouse/jean-jaures/', destination: 'https://moverz.fr/toulouse/jean-jaures/', permanent: true },
      { source: '/toulouse/saint-cyprien/', destination: 'https://moverz.fr/toulouse/saint-cyprien/', permanent: true },
      // Hub quartiers toulouse
      { source: '/quartiers-toulouse/', destination: 'https://moverz.fr/quartiers-toulouse/', permanent: true },
      // Corridors depuis toulouse (5 pages)
      { source: '/toulouse-vers-espagne/', destination: 'https://moverz.fr/toulouse-vers-espagne/', permanent: true },
      { source: '/toulouse-vers-lyon/', destination: 'https://moverz.fr/toulouse-vers-lyon/', permanent: true },
      { source: '/toulouse-vers-marseille/', destination: 'https://moverz.fr/toulouse-vers-marseille/', permanent: true },
      { source: '/toulouse-vers-nantes/', destination: 'https://moverz.fr/toulouse-vers-nantes/', permanent: true },
      { source: '/toulouse-vers-paris/', destination: 'https://moverz.fr/toulouse-vers-paris/', permanent: true },
      // Services
      { source: '/services/', destination: 'https://moverz.fr/', permanent: true },
      { source: '/services/demenagement-economique-toulouse/', destination: 'https://moverz.fr/', permanent: true },
      { source: '/services/demenagement-premium-toulouse/', destination: 'https://moverz.fr/', permanent: true },
      { source: '/services/demenagement-standard-toulouse/', destination: 'https://moverz.fr/', permanent: true },
      // Pages communes
      { source: '/cgu/', destination: 'https://moverz.fr/cgu/', permanent: true },
      { source: '/cgv/', destination: 'https://moverz.fr/cgv/', permanent: true },
      { source: '/comment-ca-marche/', destination: 'https://moverz.fr/comment-ca-marche/', permanent: true },
      { source: '/contact/', destination: 'https://moverz.fr/contact/', permanent: true },
      { source: '/devis-gratuits/', destination: 'https://moverz.fr/devis-gratuits/', permanent: true },
      { source: '/estimation-rapide/', destination: 'https://moverz.fr/estimation-rapide/', permanent: true },
      { source: '/faq/', destination: 'https://moverz.fr/faq/', permanent: true },
      { source: '/mentions-legales/', destination: 'https://moverz.fr/mentions-legales/', permanent: true },
      { source: '/notre-offre/', destination: 'https://moverz.fr/notre-offre/', permanent: true },
      { source: '/partenaires/', destination: 'https://moverz.fr/partenaires/', permanent: true },
      { source: '/politique-confidentialite/', destination: 'https://moverz.fr/politique-confidentialite/', permanent: true },          // Fix liens cassés (trailing slash + cross-city)
      // Trailing slash: /a-propos
      { source: '/a-propos', destination: '/a-propos/', permanent: true },
      // Trailing slash: /pro
      { source: '/pro', destination: '/pro/', permanent: true },
      // Trailing slash: /villes
      { source: '/villes', destination: '/villes/', permanent: true },
      // Trailing slash: /partenaires
      { source: '/partenaires', destination: '/partenaires/', permanent: true },
      // Trailing slash: /devis-gratuits
      { source: '/devis-gratuits', destination: '/devis-gratuits/', permanent: true },
      // Trailing slash: /choisir-ville
      { source: '/choisir-ville', destination: '/choisir-ville/', permanent: true },
      // Trailing slash: /contact
      { source: '/contact', destination: '/contact/', permanent: true },
      { source: '/demenagement/nice', destination: 'https://moverz.fr/demenagement/nice/', permanent: true },
      { source: '/demenagement/lyon', destination: 'https://moverz.fr/demenagement/lyon/', permanent: true },
      { source: '/demenagement/marseille', destination: 'https://moverz.fr/demenagement/marseille/', permanent: true },
      { source: '/demenagement/bordeaux', destination: 'https://moverz.fr/demenagement/bordeaux/', permanent: true },
      { source: '/demenagement/lille', destination: 'https://moverz.fr/demenagement/lille/', permanent: true },
      { source: '/demenagement/strasbourg', destination: 'https://moverz.fr/demenagement/strasbourg/', permanent: true },
      { source: '/demenagement/nantes', destination: 'https://moverz.fr/demenagement/nantes/', permanent: true },
      { source: '/demenagement/rennes', destination: 'https://moverz.fr/demenagement/rennes/', permanent: true },
      { source: '/demenagement/rouen', destination: 'https://moverz.fr/demenagement/rouen/', permanent: true },
      { source: '/demenagement/montpellier', destination: 'https://moverz.fr/demenagement/montpellier/', permanent: true },
      { source: '/demenagement/paris', destination: 'https://moverz.fr/demenagement/paris/', permanent: true },
      { source: '/demenagement/grenoble', destination: 'https://moverz.fr/demenagement/grenoble/', permanent: true },

    ];

    const blogToMoverz = getMoverzBlogRedirectsForHost(HOST);

    return [...existing, ...blogToMoverz];
  }
};

export default nextConfig;
