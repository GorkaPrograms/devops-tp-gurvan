# 🚀 DevOps TP — Pipeline Demo

Application de démonstration pour le TP DevOps.  
Fil rouge : **commit → CI/CD → Docker Hub → n8n → notification**

---

## 📋 Prérequis

- Node.js 20+
- Docker Desktop installé et lancé
- Compte GitHub
- Compte Docker Hub
- Accès à l'instance n8n (URL fournie par le formateur)

---

## 🏗️ Structure du projet

```
devops-tp/
├── .github/
│   └── workflows/
│       └── ci.yml          ← Pipeline à compléter (TP1 + TP3)
├── public/
│   └── index.html          ← Interface web
├── src/
│   ├── app.js              ← Application Express
│   └── server.js           ← Point d'entrée
├── tests/
│   └── app.test.js         ← Tests Jest
├── Dockerfile              ← À lire et comprendre
├── netlify.toml            ← Config Netlify (challenge bonus)
└── package.json
```

---

## 🚦 Démarrage rapide en local

```bash
# 1. Cloner le repo (après fork)
git clone https://github.com/VOTRE_USERNAME/devops-tp.git
cd devops-tp

# 2. Installer les dépendances
npm install

# 3. Lancer les tests
npm test

# 4. Démarrer l'app
npm start
# → http://localhost:3000
```

---

## 🐳 Démarrage avec Docker

```bash
# Builder l'image
docker build -t devops-tp:local .

# Lancer le conteneur
docker run -p 3000:3000 devops-tp:local

# Ou depuis Docker Hub (après le TP)
docker pull VOTRE_USERNAME/devops-tp:latest
docker run -p 3000:3000 VOTRE_USERNAME/devops-tp:latest
```

---

## 🔑 Secrets GitHub à configurer

Aller dans **Settings → Secrets and variables → Actions** et créer :

| Secret | Description |
|--------|-------------|
| `DOCKER_USERNAME` | Votre nom d'utilisateur Docker Hub |
| `DOCKER_TOKEN` | Token généré sur Docker Hub (Account Settings → Security) |
| `N8N_WEBHOOK_URL` | URL du webhook n8n (fournie après le TP2) |

---

## 📡 API disponible

| Route | Description |
|-------|-------------|
| `GET /` | Interface web |
| `GET /api/health` | Statut de l'application |
| `GET /api/hello/:name` | Retourne une salutation |

### Exemple

```bash
curl http://localhost:3000/api/health
# {"status":"ok","message":"App is running!","timestamp":"...","version":"1.0.0"}

curl http://localhost:3000/api/hello/Alice
# {"message":"Hello, Alice! 👋","name":"Alice"}
```

---

## 🎯 Objectifs des TP

### TP1 — Pipeline CI + Docker
- [ ] Compléter le fichier `ci.yml` (chercher les `???`)
- [ ] Configurer les secrets GitHub
- [ ] Observer le pipeline tourner dans l'onglet Actions
- [ ] Vérifier l'image sur Docker Hub
- [ ] Faire tourner l'image en local avec `docker run`

### TP2 — Workflow n8n
- [ ] Créer un workflow Webhook → IF → notification
- [ ] Tester avec `curl` sur l'URL du webhook
- [ ] Valider les deux branches (succès / échec)

### TP3 — Tout connecter
- [ ] Ajouter `N8N_WEBHOOK_URL` dans les secrets GitHub
- [ ] Compléter l'étape `notify` dans `ci.yml`
- [ ] Pousser un commit et observer le flux complet
- [ ] **Challenge** : push Docker Hub uniquement sur `main`
- [ ] **Bonus** : connecter à Netlify et comparer les deux approches CI

---

## 💡 Payload envoyé à n8n

```json
{
  "status": "success | failure",
  "branch": "main",
  "author": "github-username",
  "image": "username/devops-tp:abc1234",
  "run_url": "https://github.com/.../actions/runs/...",
  "commit_message": "feat: ajout de la route hello"
}
```

---

## 🐛 En cas de blocage

**Les tests ne passent pas en local**
```bash
npm install   # Vérifier que les dépendances sont installées
npm test      # Lancer les tests et lire les erreurs
```

**Le pipeline échoue sur "Login Docker Hub"**
→ Vérifier que `DOCKER_USERNAME` et `DOCKER_TOKEN` sont bien créés dans les secrets (pas dans les variables !)

**Le webhook n8n ne répond pas**
→ Vérifier que le workflow n8n est bien **activé** (toggle en haut à droite dans l'éditeur)

**`docker run` : port déjà utilisé**
```bash
docker run -p 3001:3000 VOTRE_USERNAME/devops-tp:latest
# Accéder sur http://localhost:3001
```

---

*TP réalisé dans le cadre du cours DevOps — Master SI/Cyber*
