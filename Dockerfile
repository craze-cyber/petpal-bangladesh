# Multi-stage Docker build for TanStack Start (SSR) on Hostinger VPS Docker Manager
# Stage 1: build the SSR bundle
FROM oven/bun:1.1-alpine AS builder
WORKDIR /app

# Build-time Supabase vars (VITE_* get inlined into the client bundle)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile || bun install

COPY . .
RUN bun run build

# Stage 2: minimal runtime image
FROM oven/bun:1.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy build output + manifest for runtime deps
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb* ./

# Install only production deps the SSR server actually needs
RUN bun install --production --frozen-lockfile || bun install --production

EXPOSE 3000
CMD ["bun", "run", ".output/server/index.mjs"]
