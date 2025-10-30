import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Conditions Générales d’Utilisation | Moverz ",
  description: "CGU du service: périmètre, responsabilités, données et sécurité.",
  alternates: { canonical: "https://devis-demenageur-toulousain.fr/cgu" },
};

export default function Page() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      <section className="section">
        <div className="container text-white prose prose-invert max-w-3xl">
          <h1>Conditions Générales d’Utilisation</h1>
          <p>Contenu à jour. Pour toute question, utilisez la page Contact.</p>
        </div>
      </section>
    </main>
  );
}
