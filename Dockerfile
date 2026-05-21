FROM node:22-slim AS builder
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=4096"
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod=false
# Source + config only; skip static/generated-media to keep build mem low.
COPY src ./src
COPY svelte.config.js vite.config.ts vitest.setup.ts tsconfig.json biome.json ./
RUN pnpm run build

FROM node:22-slim AS runner
RUN apt-get update && apt-get install -y --no-install-recommends tini curl && rm -rf /var/lib/apt/lists/*
RUN groupadd -r app && useradd -r -g app -d /app -s /sbin/nologin app
WORKDIR /app
COPY --from=builder --chown=app:app /app/build ./build
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/package.json ./
# Static media goes straight into the runtime layer's served path so SvelteKit
# adapter-node finds it at /generated-media/* without bloating the builder.
COPY --chown=app:app static/generated-media ./build/client/generated-media
USER app
EXPOSE 3000
ENV NODE_ENV=production
ENTRYPOINT ["tini", "--"]
CMD ["node", "build"]
