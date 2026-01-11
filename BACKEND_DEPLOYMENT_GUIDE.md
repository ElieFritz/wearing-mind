# ?? Backend Deployment Guide - Railway/Heroku

## ?? Option Recommandée: Railway

Railway offre un déploiement facile avec un plan gratuit généreux.

---

## ?? Déploiement sur Railway

### **Étape 1: Créer un Compte**

1. Aller sur: **https://railway.app**
2. Cliquer sur **"Start a New Project"**
3. Se connecter avec GitHub

### **Étape 2: Nouveau Projet**

1. Cliquer sur **"New Project"**
2. Sélectionner **"Deploy from GitHub repo"**
3. Choisir: **ElieFritz/wearing-mind**
4. Railway détecte automatiquement le monorepo

### **Étape 3: Configuration**

#### **A. Root Directory**
Dans les settings, configurer:
```
Root Directory: backend
```

#### **B. Build Command**
```
npm install && npm run build
```

#### **C. Start Command**
```
npm run start:prod
```

#### **D. Variables d'Environnement**

Ajouter toutes ces variables dans Railway:

```env
# Database (Supabase)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email (Resend)
RESEND_API_KEY=re_xxxxx...

# Configuration
PORT=3001
ADMIN_EMAIL=admin@wearingmind.com
FRONTEND_URL=https://wearing-mind-xxxx.vercel.app
NODE_ENV=production
```

### **Étape 4: Déployer**

1. Cliquer sur **"Deploy"**
2. Attendre 3-5 minutes
3. Railway génère une URL: `https://wearing-mind-production.up.railway.app`

### **Étape 5: Récupérer l'URL**

1. Dans Railway dashboard, copier l'URL publique
2. Format: `https://[project-name]-production.up.railway.app`

---

## ?? Connecter Frontend et Backend

### **Mettre à jour Vercel**

1. Aller sur: https://vercel.com/enollafritzs-projects/wearing-mind
2. Settings ? Environment Variables
3. Modifier `NEXT_PUBLIC_API_URL`:
   ```
   https://wearing-mind-production.up.railway.app/api
   ```
4. Redéployer (Deployments ? Latest ? Redeploy)

### **Mettre à jour Railway**

1. Aller dans Railway project
2. Variables ? `FRONTEND_URL`
3. Mettre à jour:
   ```
   https://wearing-mind-xxxx.vercel.app
   ```
4. Redéployer automatiquement

---

## ?? Alternative: Heroku

### **Étape 1: Installation Heroku CLI**

```powershell
# Télécharger et installer
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login
```

### **Étape 2: Créer l'Application**

```powershell
cd backend

# Créer app
heroku create wearing-mind-api

# Ajouter buildpack Node.js
heroku buildpacks:set heroku/nodejs
```

### **Étape 3: Variables d'Environnement**

```powershell
heroku config:set SUPABASE_URL=https://xxxxx.supabase.co
heroku config:set SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
heroku config:set RESEND_API_KEY=re_xxxxx
heroku config:set ADMIN_EMAIL=admin@wearingmind.com
heroku config:set FRONTEND_URL=https://wearing-mind-xxxx.vercel.app
heroku config:set NODE_ENV=production
```

### **Étape 4: Déployer**

```powershell
# Push vers Heroku
git push heroku master

# Ouvrir l'app
heroku open
```

**URL:** `https://wearing-mind-api.herokuapp.com`

---

## ?? Alternative: Render

### **Déploiement sur Render**

1. Aller sur: **https://render.com**
2. New ? Web Service
3. Connect Repository: ElieFritz/wearing-mind
4. Configurer:
   - **Name:** wearing-mind-backend
   - **Root Directory:** backend
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`

5. Ajouter les variables d'environnement

**URL:** `https://wearing-mind-backend.onrender.com`

---

## ? Vérification Backend

### **Test 1: Health Check**

```powershell
# Tester que l'API répond
curl https://your-backend-url.com/api/products

# Ou dans le navigateur
https://your-backend-url.com/api/products
```

### **Test 2: CORS**

```powershell
# Depuis la console du frontend (F12)
fetch('https://your-backend-url.com/api/products')
  .then(r => r.json())
  .then(console.log)
```

Si erreur CORS, vérifier:
1. `FRONTEND_URL` est bien configuré dans le backend
2. Le backend a redémarré après modification

---

## ?? Sécurité Production

### **Variables Sensibles**

?? **Ne JAMAIS commit:**
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- Credentials de base de données

? **Toujours utiliser:**
- Variables d'environnement
- Secrets managers (Railway Secrets, Heroku Config Vars)

### **CORS Configuration**

Le backend est déjà configuré pour accepter uniquement:
```typescript
origin: process.env.FRONTEND_URL || 'http://localhost:3000'
```

Mettre à jour `FRONTEND_URL` avec l'URL Vercel exacte.

---

## ?? Monitoring

### **Railway**
- Logs en temps réel
- Métriques CPU/RAM
- Déploiements automatiques

### **Heroku**
- `heroku logs --tail`
- Metrics dashboard
- Alertes par email

### **Render**
- Dashboard monitoring
- Logs streaming
- Health checks automatiques

---

## ?? Workflow Complet

```
1. Code push sur GitHub (master)
   ?
2. Railway/Heroku détecte le push
   ?
3. Build automatique du backend
   ?
4. Déploiement automatique
   ?
5. Backend disponible sur l'URL publique
   ?
6. Frontend Vercel peut appeler l'API
```

---

## ?? URLs Finales

Après déploiement complet:

- **Frontend (Vercel):** `https://wearing-mind-xxxx.vercel.app`
- **Backend (Railway):** `https://wearing-mind-production.up.railway.app`
- **API Endpoints:** `https://wearing-mind-production.up.railway.app/api`

---

## ? Checklist Backend

- [ ] Backend déployé (Railway/Heroku/Render)
- [ ] Toutes les variables d'environnement configurées
- [ ] URL publique obtenue
- [ ] API accessible (test avec /api/products)
- [ ] CORS configuré avec URL Vercel
- [ ] Frontend mis à jour avec l'URL backend
- [ ] Tests complets (products, orders, checkout)

---

**Dernière mise à jour:** 2026-01-11  
**Status:** ? Prêt pour le déploiement backend
