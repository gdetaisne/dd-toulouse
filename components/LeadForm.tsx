"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  volume: string;
  message: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export default function LeadForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const utmDefaults = useMemo(() => {
    return {
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      utm_term: searchParams.get("utm_term") || "",
      utm_content: searchParams.get("utm_content") || "",
    } as const;
  }, [searchParams]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitting(true);
      setError(null);

      const formData = new FormData(e.currentTarget);
      const payload: LeadPayload = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        pickup: String(formData.get("pickup") || ""),
        dropoff: String(formData.get("dropoff") || ""),
        date: String(formData.get("date") || ""),
        volume: String(formData.get("volume") || ""),
        message: String(formData.get("message") || ""),
        utm_source: String(formData.get("utm_source") || utmDefaults.utm_source || ""),
        utm_medium: String(formData.get("utm_medium") || utmDefaults.utm_medium || ""),
        utm_campaign: String(formData.get("utm_campaign") || utmDefaults.utm_campaign || ""),
        utm_term: String(formData.get("utm_term") || utmDefaults.utm_term || ""),
        utm_content: String(formData.get("utm_content") || utmDefaults.utm_content || ""),
      };

      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || `Erreur d'envoi (${res.status})`);
        }

        router.push("/merci");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Une erreur est survenue.";
        setError(message);
      } finally {
        setSubmitting(false);
      }
    },
    [router, utmDefaults]
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Hidden UTM fields derived from URL */}
      <input type="hidden" name="utm_source" value={utmDefaults.utm_source} />
      <input type="hidden" name="utm_medium" value={utmDefaults.utm_medium} />
      <input type="hidden" name="utm_campaign" value={utmDefaults.utm_campaign} />
      <input type="hidden" name="utm_term" value={utmDefaults.utm_term} />
      <input type="hidden" name="utm_content" value={utmDefaults.utm_content} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
          <input id="name" name="name" required placeholder="Jean Dupont" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required placeholder="Votre email" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
          <input id="phone" name="phone" type="tel" required placeholder="Votre numéro (optionnel)" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm font-medium">Date du déménagement</label>
          <input id="date" name="date" type="date" required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="pickup" className="text-sm font-medium">Adresse de départ</label>
          <input id="pickup" name="pickup" required placeholder="Adresse de départ" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="dropoff" className="text-sm font-medium">Adresse d'arrivée</label>
          <input id="dropoff" name="dropoff" required placeholder="Adresse d'arrivée" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="volume" className="text-sm font-medium">Volume approximatif (m³)</label>
          <input id="volume" name="volume" type="number" min={0} step="0.1" placeholder="Ex: 20" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea id="message" name="message" rows={4} placeholder="Précisions utiles..." className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition duration-300 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {submitting ? "Envoi..." : "Obtenez vos devis précis gratuitement"}
      </button>
    </form>
  );
}


