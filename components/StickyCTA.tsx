export default function StickyCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:right-6">
      <div className="mx-auto max-w-md">
        <div className="card-glass rounded-2xl p-4 text-center">
          <p className="text-sm text-white/90 mb-3">Prêt pour votre devis ?</p>
          <a 
            href="/inventaire-ia/" 
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300"
          >
            Obtenez vos devis précis gratuitement
          </a>
        </div>
      </div>
    </div>
  );
}