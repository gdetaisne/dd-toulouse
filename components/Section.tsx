import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}

export default function Section({ 
  children, 
  className = "", 
  id,
  "aria-labelledby": ariaLabelledBy 
}: SectionProps) {
  return (
    <section 
      className={`py-12 md:py-16 ${className}`}
      id={id}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  );
}
