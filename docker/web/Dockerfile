# ========= Base deps =========
FROM node:20-bullseye AS base
WORKDIR /app
ENV CI=true
COPY package*.json ./
RUN npm ci

# ========= Dev =========
FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ========= Build (Prod) =========
FROM node:20-bullseye AS build
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ========= Runtime (Prod) =========
FROM node:20-bullseye AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
RUN echo 'const { spawn } = require("child_process"); const p=spawn("npx",["next","start","-p","3000"],{stdio:"inherit"}); p.on("exit",c=>process.exit(c));' > server.js
EXPOSE 3000
CMD ["node", "server.js"]
