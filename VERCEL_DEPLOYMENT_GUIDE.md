# ?? Guide de Déploiement Vercel - WEARING MIND

## ? Prérequis

- ? Compte Vercel: https://vercel.com/enollafritzs-projects
- ? Repository GitHub: https://github.com/ElieFritz/wearing-mind
- ? Backend déployé (Railway, Heroku, ou autre)
- ? Variables d'environnement prêtes

---

## ?? Étape 1: Installation Vercel CLI (Optionnel)

```powershell
# Installer Vercel CLI globalement
npm install -g vercel

# Se connecter
vercel login
```

---

## ?? Étape 2: Déploiement via Dashboard Vercel

### **Option A: Import depuis GitHub (Recommandé)**

1. **Aller sur Vercel Dashboard**
   - URL: https://vercel.com/enollafritzs-projects
   - Cliquer sur **"Add New"** ? **"Project"**

2. **Importer le Repository**
   - Sélectionner **"Import Git Repository"**
   - Autoriser l'accès à GitHub si nécessaire
   - Chercher: `ElieFritz/wearing-mind`
   - Cliquer sur **"Import"**

3. **Configurer le Projet**
   
   **Root Directory:**
   ```
   frontend
   ```
   ?? **Important**: Spécifier `frontend` comme root directory car c'est un monorepo

   **Framework Preset:**
   ```
   Next.js
   ```
   
   **Build Command:**
   ```
   npm run build
   ```
   
   **Output Directory:**
   ```
   .next
   ```
   
   **Install Command:**
   ```
   npm install
   ```

4. **Variables d'Environnement**
   
   Ajouter les variables suivantes:
   
   | Key | Value | Note |
   |-----|-------|------|
   | `NEXT_PUBLIC_API_URL` | `https://your-backend-api.com/api` | URL de votre backend déployé |
   
   **Exemple:**
   ```
   NEXT_PUBLIC_API_URL=https://wearing-mind-api.railway.app/api
   ```

5. **Déployer**
   - Cliquer sur **"Deploy"**
   - Attendre la fin du build (2-5 minutes)
   - Votre site sera disponible sur: `https://wearing-mind-xxxx.vercel.app`

---

### **Option B: Déploiement via CLI**

```powershell
# Aller dans le dossier frontend
cd "C:\Users\mappo\source\repos\wearing mind\frontend"

# Premier déploiement
vercel

# Suivre les prompts:
# ? Set up and deploy "~\frontend"? [Y/n] y
# ? Which scope do you want to deploy to? enollafritzs-projects
# ? Link to existing project? [y/N] n
# ? What's your project's name? wearing-mind
# ? In which directory is your code located? ./

# Après le déploiement, configurer les variables d'environnement
vercel env add NEXT_PUBLIC_API_URL

# Redéployer en production
vercel --prod
```

---

## ?? Étape 3: Configuration des Variables d'Environnement

### **Via Dashboard:**

1. Aller dans votre projet: https://vercel.com/enollafritzs-projects/wearing-mind
2. Cliquer sur **"Settings"** ? **"Environment Variables"**
3. Ajouter chaque variable:

```
NEXT_PUBLIC_API_URL
```
**Value:** `https://your-backend-url.com/api`

**Environments:** 
- ? Production
- ? Preview
- ? Development

4. Cliquer sur **"Save"**

### **Via CLI:**

```powershell
cd frontend

# Ajouter une variable
vercel env add NEXT_PUBLIC_API_URL production
# Entrer la valeur: https://your-backend-url.com/api

# Lister les variables
vercel env ls

# Redéployer avec les nouvelles variables
vercel --prod
```

---

## ?? Étape 4: Configuration du Domaine Personnalisé (Optionnel)

### **Ajouter un domaine custom:**

1. **Via Dashboard:**
   - Aller dans **"Settings"** ? **"Domains"**
   - Cliquer sur **"Add"**
   - Entrer votre domaine: `wearingmind.com`
   - Suivre les instructions DNS

2. **Configurer les DNS:**
   
   Chez votre registrar (GoDaddy, Namecheap, etc.):
   
   **Type A:**
   ```
   @ ? 76.76.21.21
   ```
   
   **Type CNAME:**
   ```
   www ? cname.vercel-dns.com
   ```

3. **Attendre la propagation DNS** (jusqu'à 48h)

---

## ?? Étape 5: Déploiement Automatique (CI/CD)

Vercel déploie automatiquement:

- **Production:** Chaque push sur la branche `master`
- **Preview:** Chaque push sur d'autres branches ou Pull Requests

### **Configuration GitHub:**

1. Vercel crée automatiquement un webhook GitHub
2. Chaque commit déclenche un nouveau déploiement
3. Les commentaires de déploiement apparaissent dans les PRs

---

## ?? Étape 6: Vérification du Déploiement

### **Checklist Post-Déploiement:**

```powershell
# 1. Vérifier que le site est en ligne
curl https://wearing-mind-xxxx.vercel.app

# 2. Tester les pages principales
https://wearing-mind-xxxx.vercel.app/
https://wearing-mind-xxxx.vercel.app/shop
https://wearing-mind-xxxx.vercel.app/admin

# 3. Vérifier les variables d'environnement
# Ouvrir la console du navigateur:
console.log(process.env.NEXT_PUBLIC_API_URL)

# 4. Tester l'API connection
# Sur /shop, vérifier que les produits se chargent
```

### **Tests Critiques:**

- ? Homepage charge correctement
- ? Images s'affichent (Supabase Storage)
- ? Shop page affiche les produits
- ? Product pages fonctionnent
- ? Cart fonctionne
- ? Checkout fonctionne
- ? Admin panel accessible

---

## ?? Dépannage

### **Erreur: Build Failed**

**Problème:** Le build échoue sur Vercel

**Solution:**
```powershell
# Tester le build localement
cd frontend
npm run build

# Si ça marche localement, vérifier:
# 1. Node.js version dans Vercel (Settings ? General ? Node.js Version)
# 2. Mettre Node.js 20.x ou 18.x
```

### **Erreur: API Calls Failing**

**Problème:** Les appels API ne fonctionnent pas

**Solution:**
1. Vérifier `NEXT_PUBLIC_API_URL` dans Vercel
2. Vérifier que le backend autorise le domaine Vercel dans CORS
3. Mettre à jour `backend/src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://wearing-mind-xxxx.vercel.app', // Ajouter votre domaine Vercel
  ],
  credentials: true,
});
```

### **Erreur: Images 404**

**Problème:** Images Supabase ne se chargent pas

**Solution:**
1. Vérifier les politiques RLS de Supabase Storage
2. S'assurer que le bucket est public:

```sql
-- Dans Supabase SQL Editor
ALTER TABLE storage.objects 
  SET (security_invoker = true);

-- Ajouter une policy publique
CREATE POLICY "Public read access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');
```

### **Erreur: Environment Variables Not Working**

**Problème:** Les variables d'environnement ne sont pas accessibles

**Solution:**
1. S'assurer que toutes les variables commencent par `NEXT_PUBLIC_`
2. Redéployer après l'ajout de variables:
   ```powershell
   vercel --prod
   ```

---

## ?? Sécurité en Production

### **Variables Sensibles:**

?? **Ne JAMAIS exposer côté client:**
- ? `SUPABASE_SERVICE_ROLE_KEY`
- ? `RESEND_API_KEY`
- ? Database credentials

? **Seulement côté client (frontend):**
- ? `NEXT_PUBLIC_API_URL`
- ? `NEXT_PUBLIC_SUPABASE_URL` (si nécessaire)
- ? `NEXT_PUBLIC_SUPABASE_ANON_KEY` (si nécessaire)

### **Backend CORS:**

Mettre à jour le backend pour autoriser le domaine Vercel:

```typescript
// backend/src/main.ts
app.enableCors({
  origin: [
    'http://localhost:3000',
    process.env.FRONTEND_URL, // Ajouter dans .env
  ],
  credentials: true,
});
```

Puis ajouter dans `backend/.env`:
```env
FRONTEND_URL=https://wearing-mind-xxxx.vercel.app
```

---

## ?? Monitoring et Analytics

### **Vercel Analytics:**

1. Activer Analytics dans le dashboard Vercel
2. Aller dans **"Analytics"** ? **"Enable"**
3. Suivre:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### **Vercel Speed Insights:**

1. Installer le package:
   ```powershell
   cd frontend
   npm install @vercel/speed-insights
   ```

2. Ajouter dans `frontend/src/app/layout.tsx`:
   ```typescript
   import { SpeedInsights } from '@vercel/speed-insights/next';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <SpeedInsights />
         </body>
       </html>
     );
   }
   ```

3. Redéployer

---

## ?? Workflow de Déploiement Recommandé

### **Développement:**

```powershell
# 1. Créer une branche feature
git checkout -b feature/new-feature

# 2. Faire vos modifications
# ...

# 3. Commit et push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# 4. Vercel crée automatiquement un preview deployment
# URL: https://wearing-mind-git-feature-new-feature.vercel.app
```

### **Production:**

```powershell
# 1. Merger dans master
git checkout master
git merge feature/new-feature
git push origin master

# 2. Vercel déploie automatiquement en production
# URL: https://wearing-mind-xxxx.vercel.app
```

---

## ?? Configuration Finale

### **Fichier vercel.json** (déjà créé):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "@next_public_api_url"
  }
}
```

### **Fichier .vercelignore:**

```
node_modules
.next
.env.local
*.log
.DS_Store
```

---

## ? Checklist Complète

### **Avant le Déploiement:**
- [ ] Backend déployé et accessible
- [ ] Variables d'environnement préparées
- [ ] Repository GitHub à jour
- [ ] Build fonctionne localement (`npm run build`)

### **Pendant le Déploiement:**
- [ ] Root directory configuré sur `frontend`
- [ ] Variables d'environnement ajoutées
- [ ] Framework détecté (Next.js)
- [ ] Build réussit

### **Après le Déploiement:**
- [ ] Site accessible
- [ ] Toutes les pages chargent
- [ ] Images s'affichent
- [ ] API fonctionne
- [ ] Checkout fonctionne
- [ ] Admin panel accessible
- [ ] Domaine custom configuré (optionnel)

---

## ?? URLs Finales

Après déploiement, vous aurez:

- **Production:** `https://wearing-mind-xxxx.vercel.app`
- **Dashboard:** `https://vercel.com/enollafritzs-projects/wearing-mind`
- **Analytics:** `https://vercel.com/enollafritzs-projects/wearing-mind/analytics`
- **Logs:** `https://vercel.com/enollafritzs-projects/wearing-mind/logs`

---

## ?? Support

**Problèmes de déploiement:**
- Documentation Vercel: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- GitHub Issues: https://github.com/ElieFritz/wearing-mind/issues

---

**Dernière mise à jour:** 2026-01-11  
**Status:** ? Prêt pour le déploiement
