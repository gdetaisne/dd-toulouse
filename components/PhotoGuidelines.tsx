"use client";

import { Camera, Lightbulb, RotateCcw } from "lucide-react";
import clsx from "clsx";

type Card = {
  icon: React.ElementType;
  title: string;
  caption: string;
};

const items: Card[] = [
  {
    icon: Camera,
    title: "3 à 10 photos par pièce, cadrage large à hauteur de poitrine",
    caption: "Capturez l'essentiel de chaque pièce.",
  },
  {
    icon: Lightbulb,
    title: "Inclure plafonniers, lampes, objets fragiles",
    caption: "Montrez tous les éléments importants.",
  },
  {
    icon: RotateCcw,
    title: "Plusieurs angles ok → un objet compté une seule fois",
    caption: "Vous pouvez photographier sous différents angles.",
  },
];

interface PhotoGuidelinesProps {
  className?: string;
  compact?: boolean;
}

export default function PhotoGuidelines({
  className,
  compact = false,
}: PhotoGuidelinesProps) {
  return (
    <section
      aria-labelledby="photo-guidelines-title"
      className={clsx(
        "relative isolate overflow-hidden rounded-3xl",
        compact ? "px-4 py-6" : "px-6 py-10 md:px-10 md:py-14",
        "text-white",
        // Fond uni bleu nuit
        "bg-[#04163a]",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="photo-guidelines-title"
          className={clsx(
            "font-semibold tracking-tight",
            compact ? "text-xl" : "text-2xl md:text-3xl"
          )}
        >
          Bien préparer vos photos
        </h2>
        <p
          className={clsx(
            "mt-2 text-white/80",
            compact ? "text-sm" : "text-base"
          )}
        >
          3 conseils pour une estimation précise
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-3 md:gap-6">
          {items.map(({ icon: Icon, title, caption }) => (
            <div
              key={title}
              className={clsx(
                "rounded-2xl bg-white/5 border border-white/10 backdrop-blur",
                compact ? "p-4" : "p-5 md:p-6",
                "hover:bg-white/10 transition-colors duration-300",
                "cursor-pointer focus-within:ring-2 focus-within:ring-white/50 focus-within:ring-offset-2 focus-within:ring-offset-transparent"
              )}
              role="button"
              tabIndex={0}
              aria-label={`${title}: ${caption}`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl p-2 border border-white/15 bg-white/5">
                  <Icon
                    aria-hidden="true"
                    className={clsx(
                      compact ? "h-6 w-6" : "h-7 w-7"
                    )}
                    style={{ color: "#6bcfcf" }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className={clsx(
                      "font-medium",
                      compact ? "text-base" : "text-lg"
                    )}
                  >
                    {title}
                  </h3>
                  <p
                    className={clsx(
                      "mt-1 text-white/80",
                      compact ? "text-sm" : "text-[15px]"
                    )}
                  >
                    {caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton optionnel - masqué car la route /exemples-photos n'existe pas encore */}
        {false && (
          <div className="mt-6 md:mt-8">
            <a
              href="/exemples-photos"
              className={clsx(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2",
                "border-white/20 bg-white/0 text-white hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                "transition-colors duration-300",
                compact ? "text-sm" : "text-base"
              )}
              aria-label="Voir des exemples de bonnes photos"
            >
              Voir des exemples
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
