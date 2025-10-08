export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "capitole",      title: "Capitole" },
  { slug: "saint-cyprien",      title: "Saint-Cyprien" },
  { slug: "carmes",      title: "Carmes" },
  { slug: "jean-jaures",      title: "Jean Jaurès" },
  { slug: "compans",      title: "Compans" },
  { slug: "matabiau",      title: "Matabiau" },
  { slug: "mirail",      title: "Mirail" },
  { slug: "rangueil",      title: "Rangueil" },
  { slug: "purpan",      title: "Purpan" },
  { slug: "borderouge",     title: "Borderouge" },
];

export const COMMUNES: Item[] = [
  { slug: "blagnac",       title: "Blagnac" },
  { slug: "colomiers",       title: "Colomiers" },
  { slug: "tournefeuille",       title: "Tournefeuille" },
  { slug: "muret",       title: "Muret" },
  { slug: "cugnaux",       title: "Cugnaux" },
];

export function urlForQuartier(slug: string) {
  return `/devis-demenagement-Toulouse-${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
