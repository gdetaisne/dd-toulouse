# Dockerfile spécifique pour toulouse - FORCE REBUILD v4 - COPY SELECTIVE
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN echo "FORCE REBUILD toulouse COPY-SELECTIVE $(date +%s)" > /tmp/force-rebuild-$(date +%s).txt

# Install dependencies
FROM base AS deps
COPY sites/toulouse/package.json ./package.json
RUN npm install --production=false

# Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY sites/toulouse/app ./app
COPY sites/toulouse/components ./components
COPY sites/toulouse/lib ./lib
COPY sites/toulouse/public ./public
COPY sites/toulouse/content ./content
COPY sites/toulouse/scripts ./scripts
COPY sites/toulouse/package.json ./package.json
COPY sites/toulouse/tsconfig.json ./tsconfig.json
COPY sites/toulouse/next.config.mjs ./next.config.mjs
COPY sites/toulouse/next-sitemap.config.js ./next-sitemap.config.js
COPY sites/toulouse/postcss.config.cjs ./postcss.config.cjs
COPY sites/toulouse/middleware.js ./middleware.js
COPY sites/toulouse/tailwind.config.ts ./tailwind.config.ts
COPY sites/toulouse/components.json ./components.json
COPY sites/toulouse/next-env.d.ts ./next-env.d.ts
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production runtime
FROM node:20-alpine AS runner
RUN apk add --no-cache dumb-init && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Copy public directory
RUN mkdir -p ./public
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node_modules/.bin/next", "start"]
