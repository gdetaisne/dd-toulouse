import { getMoverzBlogRedirectsForHost } from '../../scripts/blog-moverz-redirects.mjs';

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
      // Blog hub → moverz.fr
      // Blog articles → moverz.fr
      // Quartiers toulouse (6 pages)
      { source: '/toulouse/', destination: 'https://moverz.fr/toulouse/', permanent: true },
      { source: '/toulouse/capitole/', destination: 'https://moverz.fr/toulouse/capitole/', permanent: true },
      { source: '/toulouse/carmes/', destination: 'https://moverz.fr/toulouse/carmes/', permanent: true },
      { source: '/toulouse/compans/', destination: 'https://moverz.fr/toulouse/compans/', permanent: true },
      { source: '/toulouse/jean-jaures/', destination: 'https://moverz.fr/toulouse/jean-jaures/', permanent: true },
      { source: '/toulouse/saint-cyprien/', destination: 'https://moverz.fr/toulouse/saint-cyprien/', permanent: true },
      // Hub quartiers toulouse
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
      { source: '/politique-confidentialite/', destination: 'https://moverz.fr/politique-confidentialite/', permanent: true },
    ];

    const blogToMoverz = getMoverzBlogRedirectsForHost(HOST);

    return [...existing, ...blogToMoverz];
  }
};

export default nextConfig;
