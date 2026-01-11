# ? DÉMARRAGE RAPIDE

## ? Repository GitHub: PRÊT
https://github.com/ElieFritz/wearing-mind

---

## ?? DÉPLOYER MAINTENANT (20 minutes)

### 1?? FRONTEND ? VERCEL (5 min)

**Aller sur:** https://vercel.com/enollafritzs-projects

**Actions:**
1. Cliquer **"Add New"** ? **"Project"**
2. Importer **"ElieFritz/wearing-mind"**
3. ?? **Root Directory:** `frontend`
4. Variable: `NEXT_PUBLIC_API_URL` = `https://temp-url.com/api` (on changera après)
5. Cliquer **"Deploy"**
6. ? Noter l'URL: `https://wearing-mind-xxxx.vercel.app`

**?? Guide:** `DEPLOY_NOW.md`

---

### 2?? BACKEND ? RAILWAY (10 min)

**Aller sur:** https://railway.app

**Actions:**
1. **"New Project"** ? **"Deploy from GitHub"**
2. Choisir **"ElieFritz/wearing-mind"**
3. ?? **Root Directory:** `backend`
4. Ajouter toutes les variables d'environnement (voir ci-dessous)
5. Cliquer **"Deploy"**
6. ? Noter l'URL: `https://wearing-mind-xxx.railway.app`

**Variables requises:**
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=admin@wearingmind.com
FRONTEND_URL=https://wearing-mind-xxxx.vercel.app
PORT=3001
NODE_ENV=production
```

**?? Guide:** `BACKEND_DEPLOYMENT_GUIDE.md`

---

### 3?? CONNECTER (2 min)

**Mettre à jour Vercel:**
1. Settings ? Environment Variables
2. Modifier `NEXT_PUBLIC_API_URL`:
   ```
   https://wearing-mind-xxx.railway.app/api
   ```
3. Redéployer

---

### 4?? TESTER (3 min)

Visiter: `https://wearing-mind-xxxx.vercel.app`

- [ ] Homepage charge
- [ ] Shop affiche les produits
- [ ] Cart fonctionne
- [ ] Checkout fonctionne

---

## ?? GUIDES DISPONIBLES

| Fichier | Description |
|---------|-------------|
| **DEPLOY_NOW.md** | Guide rapide étape par étape |
| **VERCEL_DEPLOYMENT_GUIDE.md** | Guide complet Vercel |
| **BACKEND_DEPLOYMENT_GUIDE.md** | Guide complet Railway/Heroku |
| **DEPLOYMENT_COMPLETE_SUMMARY.md** | Vue d'ensemble complète |

---

## ?? C'EST TOUT!

**Votre site sera en ligne dans 20 minutes!**

**Questions?** Consultez les guides ci-dessus.

---

**Repository:** https://github.com/ElieFritz/wearing-mind  
**Vercel Account:** https://vercel.com/enollafritzs-projects
