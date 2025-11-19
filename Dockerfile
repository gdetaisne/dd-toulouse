# Dockerfile multi-sites Moverz - toulouse
# Version canonique: 2025-10-31 (fixed SITE_URL default + trailing slash)
# Cache invalidation: 2025-10-31-15h00
#
# ⚠️  WARNING: Ce fichier est généré depuis .templates/Dockerfile.template
# ⚠️  NE PAS MODIFIER CE FICHIER DIRECTEMENT
# ⚠️  Pour modifications: éditer .templates/Dockerfile.template puis ./scripts/sync-config-files.sh
#
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ARG SITE_URL=https://devis-demenageur-toulousain.fr/
ENV SITE_URL=${SITE_URL}
RUN echo "Build timestamp: 2025-10-31-15h00"

# Install dependencies
FROM base AS deps
COPY package.json ./
RUN npm install --production=false

# Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG SITE_URL=https://devis-demenageur-toulousain.fr/
ENV SITE_URL=${SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=https://moverz-backoffice.gslv.cloud
RUN npm run build

# Production runtime
FROM node:20-alpine AS runner
RUN apk add --no-cache dumb-init && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app
ARG SITE_URL=https://devis-demenageur-toulousain.fr/
ENV NODE_ENV=production
ENV PORT=3000
ENV SITE_URL=${SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=https://moverz-backoffice.gslv.cloud

# Copy standalone server
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets (required for standalone mode)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy public directory (logos, favicons, images)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy content directory (blog articles)
COPY --from=builder --chown=nextjs:nodejs /app/content ./content

USER nextjs
EXPOSE 3000

# Use standalone server (not next start)
CMD ["dumb-init", "node", "server.js"]
