import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Copie locale du helper de redirections blog -> moverz.fr
// pour que le site Lyon (repo isolé dd-lyon) puisse fonctionner
// sans dépendre du monorepo principal.
//
// Voir aussi: scripts/blog-moverz-redirects.mjs dans le monorepo.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV local au repo dd-lyon (sites/lyon/scripts/moverz_301_redirects.csv dans le monorepo)
const CSV_PATH = path.join(__dirname, 'moverz_301_redirects.csv');

// On ne veut activer les 301 que pour les anciens sites historiques,
// pas pour les 10 nouveaux domaines.
const ALLOWED_HOSTS = new Set([
  'devis-demenageur-nice.fr',
  'devis-demenageur-lyon.fr',
  'devis-demenageur-marseille.fr',
  'devis-demenageur-toulousain.fr',
  'www.bordeaux-demenageur.fr',
  'devis-demenageur-montpellier.fr',
  'devis-demenageur-nantes.fr',
  'devis-demenageur-lille.fr',
  'devis-demenageur-strasbourg.fr',
  'devis-demenageur-rouen.fr',
  'devis-demenageur-rennes.fr',
]);

let redirectsByHostCache = null;

function loadRedirectsByHost() {
  if (!fs.existsSync(CSV_PATH)) {
    return new Map();
  }

  const raw = fs.readFileSync(CSV_PATH, 'utf8');
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return new Map();

  const [header, ...rows] = lines;
  if (!header.startsWith('old_url,new_url')) {
    return new Map();
  }

  const map = new Map();

  for (const line of rows) {
    if (!line) continue;
    const [oldUrl, newUrl] = line.split(',').map((s) => s.trim());
    if (!oldUrl || !newUrl) continue;

    let host;
    let pathname;
    try {
      const u = new URL(oldUrl);
      host = u.host;
      pathname = u.pathname || '/';
    } catch {
      continue;
    }

    if (!ALLOWED_HOSTS.has(host)) continue;

    let sourcePath = pathname;
    if (!sourcePath.endsWith('/')) {
      sourcePath = `${sourcePath}/`;
    }

    const destination = newUrl;

    if (!map.has(host)) {
      map.set(host, []);
    }
    map.get(host).push({
      source: sourcePath,
      destination,
      permanent: true,
    });
  }

  return map;
}

export function getMoverzBlogRedirectsForHost(host) {
  if (!redirectsByHostCache) {
    redirectsByHostCache = loadRedirectsByHost();
  }
  return redirectsByHostCache.get(host) ?? [];
}


