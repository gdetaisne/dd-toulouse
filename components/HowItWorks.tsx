import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Prenez vos photos",
      description: "3 à 5 par pièce, l'essentiel",
      image: "/images/how-it-works/step-1-photos.jpg",
      alt: "Main prenant une photo d'une pièce pour estimation déménagement"
    },
    {
      number: "2", 
      title: "Notre IA calcule votre volume",
      description: "Estimation fiable en 2 minutes",
      image: "/images/how-it-works/step-2-estimation.jpg",
      alt: "Écran montrant l'estimation IA du volume en m³"
    },
    {
      number: "3",
      title: "Vous recevez vos devis précis gratuitement",
      description: "5 offres adaptées sous 7 jours",
      image: "/images/how-it-works/step-3-loading.jpg",
      alt: "Équipe de déménagement chargeant des cartons dans un camion"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-6 md:mb-10">
        Comment ça marche
      </h2>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step, i) => (
          <div key={i} className="text-center">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-white/10 ring-1 ring-white/10">
              <Image 
                src={step.image}
                alt={step.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
                quality={i === 0 ? 65 : 60}
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04163a]/40 to-transparent"></div>
              <div className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#6bcfcf] text-[#04163a] text-sm font-bold ring-1 ring-white/40">
                {step.number}
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-white/80 text-sm md:text-base">{step.description}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-10 md:mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="/inventaire-ia/" className="btn-primary" aria-label="Obtenez vos devis précis gratuitement">Obtenez vos devis précis gratuitement</a>
        <a href="/comment-ca-marche/" className="btn-secondary">Comment ça marche</a>
      </div>
    </div>
  );
}