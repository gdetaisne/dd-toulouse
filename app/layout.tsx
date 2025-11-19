import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GAListener from "./ga-listener";
import { env } from "@/lib/env";
import { getCityDataFromUrl } from "@/lib/cityData";
import { buildSiteMetadata } from "@/lib/seo-builders";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// Résoudre les données de ville dynamiquement
const city = getCityDataFromUrl(env.SITE_URL);

// Metadata centralisée - wording intent transactionnel (isMoneyPage: true)
export const metadata: Metadata = buildSiteMetadata({
  isMoneyPage: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2b7a78',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* Favicons - URLs absolues pour meilleure compatibilité Google SERP */}
        <link rel="icon" href={`${env.SITE_URL}/favicon.ico`} sizes="32x32" />
        <link rel="icon" type="image/png" sizes="16x16" href={`${env.SITE_URL}/icons/favicon-16x16.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${env.SITE_URL}/icons/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="48x48" href={`${env.SITE_URL}/icons/favicon-48x48.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${env.SITE_URL}/icons/android-chrome-192x192.png`} />
        <link rel="icon" type="image/png" sizes="512x512" href={`${env.SITE_URL}/icons/android-chrome-512x512.png`} />
        <link rel="apple-touch-icon" href={`${env.SITE_URL}/icons/apple-touch-icon.png`} />
        <Script 
          async 
          src="https://plausible.io/js/pa-dkllRxPvwLXCFTjJ29RRI.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
            plausible.init()
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen bg-[#04163a] text-white`}>        
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <GAListener />
        </Suspense>
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}


function Footer() {
  // Résoudre la ville dynamiquement pour le footer
  const city = getCityDataFromUrl(env.SITE_URL);
  
  return (
    <footer className="mt-24 border-t border-white/10 bg-white/5">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-sm" />
            <div className="text-white font-semibold tracking-wide text-sm md:text-base leading-tight flex flex-col w-28 md:w-32 text-justify">
              <span>Devis</span>
              <span>Déménageur</span>
              <span>{city.nameCapitalized}</span>
            </div>
          </div>
          <p className="mt-3 text-white/90 max-w-xs">
            Dossier anonyme · 0 spam · 5+ devis comparables. Déménageurs contrôlés (solvabilité vérifiée, 0 litige). 100% gratuit, sans harcèlement.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            Comparateur anti-arnaque
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Navigation</div>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><Link href="/services/" className="hover:text-white">Services</Link></li>
            <li><Link href={`/${city.slug}`} className="hover:text-white">Zones desservies</Link></li>
            <li><Link href="/partenaires/" className="hover:text-white">Partenaires</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Ressources</div>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/faq/" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Légal</div>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><Link href="/mentions-legales/" className="hover:text-white">Mentions légales</Link></li>
            <li><Link href="/politique-confidentialite/" className="hover:text-white">Confidentialité</Link></li>
            <li><Link href="/cgv/" className="hover:text-white">CGV</Link></li>
            <li><Link href="/cgu/" className="hover:text-white">CGU</Link></li>
          </ul>
        </div>
      </div>
      <div className="pb-10 text-center text-xs text-white/50">© {new Date().getFullYear()} Déménageurs {city.nameCapitalized}</div>
    </footer>
  );
}
