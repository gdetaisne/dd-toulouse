type QA = { q: string; a: string[]; category: string };

export default function FAQ() {
  const faqs: QA[] = [];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">Questions fréquentes</h2>
      <div className="mt-12 space-y-4 max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <details key={i} className="card-glass rounded-2xl p-6">
            <summary className="cursor-pointer font-semibold">{faq.q}</summary>
            <p className="mt-3 text-white/80">{faq.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="/faq/" className="text-accent hover:underline">Voir toutes les FAQ →</a>
      </div>
    </div>
  );
}