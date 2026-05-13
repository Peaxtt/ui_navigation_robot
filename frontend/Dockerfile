# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline

COPY . .
RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

RUN rm /etc/nginx/conf.d/default.conf

# nginx:1.19+ automatically runs envsubst on files in /etc/nginx/templates/
# GATEWAY_URL is substituted at container start → supports runtime config
COPY nginx.conf /etc/nginx/templates/b2_web_rviz.conf.template

COPY --from=builder /app/dist /usr/share/nginx/html

# Default: backend on the same host port 8080 (override via docker-compose .env)
ENV GATEWAY_URL=http://localhost:8080

EXPOSE 80
