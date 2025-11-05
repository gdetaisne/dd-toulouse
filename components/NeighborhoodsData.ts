export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "capitole",      title: "Capitole" },
  { slug: "saint-cyprien",      title: "Saint-Cyprien" },
  { slug: "carmes",      title: "Carmes" },
  { slug: "jean-jaures",      title: "Jean Jaurès" },
  { slug: "compans",      title: "Compans" },
];

export const COMMUNES: Item[] = [];
// Communes satellites à créer ultérieurement

export function urlForQuartier(slug: string) {
  return `/toulouse/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
