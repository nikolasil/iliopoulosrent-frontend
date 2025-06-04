# --- Stage 1: Build ---
FROM node:18-alpine AS builder

# Update system packages to reduce vulnerabilities
RUN apk update && apk upgrade --no-cache

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f pnpm-lock.yaml ]; then \
    npm install -g pnpm && pnpm install; \
    elif [ -f package-lock.json ]; then \
    npm ci; \
    else \
    npm install; \
    fi

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# --- Stage 2: Production image ---
FROM node:18-alpine AS runner

# Update system packages to reduce vulnerabilities
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f pnpm-lock.yaml ]; then \
    npm install -g pnpm && pnpm install --prod; \
    elif [ -f package-lock.json ]; then \
    npm ci --only=production; \
    else \
    npm install --production; \
    fi

# Copy the built output and necessary files from the build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json

# Expose port (default 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]