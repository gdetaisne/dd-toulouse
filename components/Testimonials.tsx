import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marie L.",
      location: "Capitole",
      text: "Estimation très précise, équipe pro. Déménagement sans stress.",
      avatar: "/images/testimonials/avatar-1.jpg"
    },
    {
      name: "Thomas B.", 
      location: "Saint-Cyprien",
      text: "L'IA a bien évalué le volume. Prix correct, service impeccable.",
      avatar: "/images/testimonials/avatar-2.jpg"
    },
    {
      name: "Sophie M.",
      location: "Carmes", 
      text: "Gain de temps énorme avec l'estimation photo. Recommande.",
      avatar: "/images/testimonials/avatar-3.jpg"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">Témoignages</h2>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="card-glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                <Image 
                  src={testimonial.avatar}
                  alt={`Photo de ${testimonial.name}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                  quality={85}
                />
              </div>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-white/70">{testimonial.location}</div>
              </div>
            </div>
            <p className="text-white/90 italic">"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}