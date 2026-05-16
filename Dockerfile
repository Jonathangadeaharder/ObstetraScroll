ARG PNPM_VERSION=10.12.1

FROM node:22-slim AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build
RUN pnpm prune --prod --ignore-scripts

FROM node:22-slim AS runner

RUN apt-get update && apt-get install -y --no-install-recommends tini curl && \
    rm -rf /var/lib/apt/lists/* && \
    groupadd -r app && useradd -r -g app -d /app -s /sbin/nologin app

WORKDIR /app

COPY --from=builder --chown=app:app /app/build ./build
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --from=builder --chown=app:app /app/package.json ./

USER app

EXPOSE 3000

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:${PORT:-3000}/ || exit 1

ENTRYPOINT ["tini", "--"]
CMD ["node", "build"]
