# syntax=docker/dockerfile:1

# Next.js standalone self-host build (Next 14, pnpm).
# Public vars are baked at build via build-args; server-only secrets arrive at runtime via env_file.

ARG NODE_VERSION=18-alpine

ARG PNPM_VERSION=10.23.0

# --- deps ---
FROM node:${NODE_VERSION} AS deps
RUN apk add --no-cache libc6-compat \
 && corepack enable \
 && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# --- builder ---
FROM node:${NODE_VERSION} AS builder
RUN corepack enable \
 && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /app

# Public env (baked into client bundle during next build)
ARG NEXT_PUBLIC_BACKEND_API_URL
ARG NEXT_PUBLIC_AUTH_FRONTEND_URL
ARG NEXT_PUBLIC_THIS_APP_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_BACKEND_API_URL=${NEXT_PUBLIC_BACKEND_API_URL} \
    NEXT_PUBLIC_AUTH_FRONTEND_URL=${NEXT_PUBLIC_AUTH_FRONTEND_URL} \
    NEXT_PUBLIC_THIS_APP_URL=${NEXT_PUBLIC_THIS_APP_URL} \
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# next.config.mjs ignores eslint/ts errors during build; disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# --- runner ---
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Standalone output: copy the pre-built server and static assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]