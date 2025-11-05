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
    return [
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
      
      // PAGES LÉGALES : Trailing slash
      { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
      { source: '/cgv/', destination: '/cgv', permanent: true },
      { source: '/politique-confidentialite/', destination: '/politique-confidentialite', permanent: true },
      
      // ANCIENNES URLs
      { source: '/estimation-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },
      { source: '/prix-demenagement-toulouse/', destination: '/blog', permanent: true },
      { source: '/devis-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },

      // CATÉGORIES BLOG RÉELLEMENT VIDES → /blog (Fix CSV 30/10/2025)
      { source: '/blog/devis', destination: '/blog', permanent: true },
    ];
  }
};

export default nextConfig;