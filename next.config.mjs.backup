import { getMoverzBlogRedirectsForHost } from './scripts/blog-moverz-redirects.mjs';

const HOST = 'devis-demenageur-toulousain.fr';

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

  // Redirections 404
  async redirects() {
    const existing = [
      // VAGUE 2 – Migration homepage domaine → page ville moverz.fr
      { source: '/', destination: 'https://moverz.fr/demenagement/toulouse/', permanent: true },

      // MIGRATION BLOG → moverz.fr
      { source: '/blog', destination: 'https://moverz.fr/blog/', permanent: true },
      { source: '/blog/', destination: 'https://moverz.fr/blog/', permanent: true },
      // Nouvelle structure /blog/demenagement-toulouse/{slug} → moverz.fr/blog/{slug}
      { source: '/blog/demenagement-toulouse/:slug*', destination: 'https://moverz.fr/blog/:slug*', permanent: true },

      // Redirections historiques
      // Fichiers BATCH/PILIER/PLACEHOLDER supprimés (cache Google)
      { source: '/blog/satellites/article-satellite-:number-placeholder', destination: '/blog', permanent: true },
      { source: '/blog/satellites/BATCH-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/PILIER-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/LISTE-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/RAPPORT-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/ARTICLES-:path*', destination: '/blog', permanent: true },
      { source: '/blog/piliers/:path*', destination: '/blog', permanent: true },
      
      // QUARTIERS BORDEAUX sur Toulouse (cross-ville)
      { source: '/toulouse/pessac', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/bastide', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/merignac', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/cauderan', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/chartrons', destination: '/quartiers-toulouse', permanent: true },
      { source: '/devis-demenagement-toulouse-chartrons/', destination: '/quartiers-toulouse', permanent: true },
      { source: '/devis-demenagement-toulouse-saint-pierre/', destination: '/quartiers-toulouse', permanent: true },
      { source: '/devis-demenagement-toulouse-cauderan/', destination: '/quartiers-toulouse', permanent: true },
      
      // ANCIENNES URLs

      // REDIRECTIONS inventaire-ia → devis-gratuits (20/01/2026)
      { source: '/inventaire-ia', destination: '/devis-gratuits/', permanent: true },
      { source: '/inventaire-ia/', destination: '/devis-gratuits/', permanent: true },
      { source: '/inventaire-ia/:path*', destination: '/devis-gratuits/:path*', permanent: true },
      { source: '/estimation-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },
      { source: '/prix-demenagement-toulouse/', destination: '/blog', permanent: true },
      { source: '/devis-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },

      // CATÉGORIES BLOG RÉELLEMENT VIDES → /blog (Fix CSV 30/10/2025)
      { source: '/blog/devis', destination: '/blog', permanent: true },
      
      // LEADGEN-02: Redirections 404 prioritaires (Toulouse - 06/11/2025)
      // Pages catégories utilisent slugs courts : /blog/international/, /blog/piano/, etc.
      { source: '/blog/international/prix-demenagement-international', destination: '/blog/international/', permanent: true },
      { source: '/blog/international/demenagement-international-toulouse', destination: '/blog/international/', permanent: true },
      { source: '/blog/international/demenagement-france-angleterre', destination: '/blog/international/', permanent: true },
      { source: '/blog/demenagement-piano/monte-charge-piano', destination: '/blog/piano/', permanent: true },
      { source: '/blog/location-camion/location-utilitaire', destination: '/blog/', permanent: true }, // Pas de catégorie location-camion
      { source: '/blog/garde-meuble/box-stockage', destination: '/blog/garde-meuble/', permanent: true },

      // WILDCARDS CATCH-ALL (TASK-LEADGEN-02 - COMPLETS)
      { source: '/blog/garde-meuble/:slug*', destination: '/blog/garde-meuble-toulouse/:slug*', permanent: true },
      { source: '/blog/pas-cher/:slug*', destination: '/blog/demenagement-pas-cher-toulouse/:slug*', permanent: true },
      { source: '/blog/international/:slug*', destination: '/blog/demenagement-international-toulouse/:slug*', permanent: true },
      { source: '/blog/piano/:slug*', destination: '/blog/demenagement-piano-toulouse/:slug*', permanent: true },
      { source: '/blog/demenageur/:slug*', destination: '/blog/demenageur-toulouse/:slug*', permanent: true },
      { source: '/blog/aide/:slug*', destination: '/blog/aide-demenagement-toulouse/:slug*', permanent: true },
      { source: '/blog/demenagement/:slug*', destination: '/blog/demenagement-toulouse/:slug*', permanent: true },
      { source: '/blog/prix/:slug*', destination: '/blog/prix-demenagement-toulouse/:slug*', permanent: true },
      // NOTE: Redirection /blog/satellites/:slug* → /blog/satellites/:slug* supprimée (TASK-060)
      // Cette redirection vers soi-même causait une erreur d'indexation dans GSC
    ];

    const blogToMoverz = getMoverzBlogRedirectsForHost(HOST);

    return [...existing, ...blogToMoverz];
  }
};

export default nextConfig;