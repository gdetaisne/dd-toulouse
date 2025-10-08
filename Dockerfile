# Force rebuild - Next.js production build v3 - FORCE FULL REBUILD
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
# SUPER Cache buster - forces rebuild of ALL layers
RUN echo "FORCE REBUILD $(date +%s)" > /tmp/force-rebuild-$(date +%s).txt

# Install dependencies
FROM base AS deps
COPY package.json ./
RUN npm install --production=false

# Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production runtime
FROM node:18-alpine AS runner
RUN apk add --no-cache dumb-init && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application (standalone if exists, otherwise full .next)
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Copy public directory if it exists
RUN mkdir -p ./public
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node_modules/.bin/next", "start"]


