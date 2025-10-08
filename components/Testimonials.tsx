import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marie L.",
      location: "Chartrons",
      text: "Estimation très précise, équipe pro. Déménagement sans stress.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&q=80"
    },
    {
      name: "Thomas B.", 
      location: "Caudéran",
      text: "L'IA a bien évalué le volume. Prix correct, service impeccable.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&q=80"
    },
    {
      name: "Sophie M.",
      location: "Saint-Pierre", 
      text: "Gain de temps énorme avec l'estimation photo. Recommande.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&q=80"
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