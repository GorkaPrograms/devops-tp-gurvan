# ================================
# Étape 1 — Build & install 
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances en premier (optimise le cache Docker)
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# ================================
# Étape 2 — Image finale légère
# ================================
FROM node:20-alpine

WORKDIR /app

# Copier les dépendances installées depuis le builder
COPY --from=builder /app/node_modules ./node_modules

# Copier le code source
COPY src/ ./src/
COPY public/ ./public/
COPY package.json ./

# Exposer le port de l'application
EXPOSE 3000

# Variable d'environnement pour la version (injectée par GitHub Actions)
ENV APP_VERSION=1.0.0
ENV NODE_ENV=production

# Démarrer l'application
CMD ["node", "src/server.js"]
