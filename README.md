## Déménageurs toulouse – Ossature projet

Stack: Next.js 14 (App Router) + TypeScript, Tailwind CSS, shadcn/ui, MDX (blog), next-seo, next-sitemap.

### Prérequis
- Node 18+
- `.env.local` à la racine avec:
  - `OPENAI_API_KEY=...`
  - `MAKE_WEBHOOK_URL=...`
  - `SITE_URL=https://www.toulouse-demenageur.fr`

### Installation
1. Installer les dépendances
2. Lancer le dev server

Scripts npm:

```bash
npm run dev           # next dev
npm run build         # next build && next-sitemap
npm run start         # next start
npm run seed:content  # tsx scripts/seedContent.ts
```

### Structure
- `app/` App Router, styles globaux Tailwind (`app/globals.css`)
- `components/` UI components
- `lib/` utilitaires (ex: `lib/utils.ts`)
- `content/blog/` billets MDX
- `scripts/` scripts utilitaires (ex: seed de contenu)

### Notes
- Les pages ne sont pas encore codées. Cette base inclut la configuration Tailwind, shadcn/ui (components.json), MDX, SEO et sitemap.
- Modifiez `next-seo.config.ts` et `next-sitemap.config.js` selon le domaine final.

### Déploiement CapRover (GitHub -> CapRover)
Ce repo est prêt pour CapRover:
- `Dockerfile` multi-stage Next.js 14 avec `output: 'standalone'`
- `.dockerignore`
- `captain-definition`

Étapes:
1. Pousser sur GitHub `gdetaisne/moverz-toulouse` (branche `main`).
2. Sur CapRover, créer une app et déployer via GitHub (ou Upload)
3. Définir les variables d’env: `SITE_URL`, `MAKE_WEBHOOK_URL`, `OPENAI_API_KEY` si utilisées.
4. Le conteneur écoute sur le port 3000 (`npm start`).


