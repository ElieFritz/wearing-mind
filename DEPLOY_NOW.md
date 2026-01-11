# ?? Déploiement Vercel - Guide Rapide

## ? Étape 1: Code Push (TERMINÉ)

Le code a été pushé sur GitHub avec succès! ?

---

## ?? Étape 2: Déployer sur Vercel

### **A. Accéder à Vercel**
Ouvrez votre navigateur sur: **https://vercel.com/enollafritzs-projects**

### **B. Créer un Nouveau Projet**

1. Cliquez sur le bouton **"Add New"** (en haut à droite)
2. Sélectionnez **"Project"**

### **C. Importer depuis GitHub**

1. Dans la liste, trouvez: **"ElieFritz/wearing-mind"**
   - Si vous ne le voyez pas, cliquez sur **"Adjust GitHub App Permissions"**
   - Autorisez l'accès au repository

2. Cliquez sur **"Import"** à côté du repository

### **D. Configuration du Projet**

#### ?? IMPORTANT - Root Directory

Dans **"Root Directory"**, cliquez sur **"Edit"** et entrez:
```
frontend
```

#### Framework Preset
Vercel devrait détecter automatiquement: **Next.js**

#### Build Settings (devrait être automatique)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### **E. Variables d'Environnement**

Cliquez sur **"Environment Variables"**

Ajoutez la variable suivante:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.com/api` |

**?? Important:** Remplacez `https://your-backend-url.com/api` par l'URL réelle de votre backend.

**Exemples:**
- Si backend sur Railway: `https://wearing-mind-production.up.railway.app/api`
- Si backend sur Heroku: `https://wearing-mind-api.herokuapp.com/api`
- Si backend local (test): `http://localhost:3001/api`

**Environnements à cocher:**
- ? Production
- ? Preview
- ? Development

### **F. Déployer**

1. Cliquez sur le bouton bleu **"Deploy"**
2. Attendez 2-5 minutes pendant le build
3. ?? Votre site sera disponible sur: `https://wearing-mind-xxxx.vercel.app`

---

## ?? Après le Déploiement

### **1. Tester le Site**

Visitez les pages principales:
- ? Homepage: `/`
- ? Shop: `/shop`
- ? Product page: `/shop/[slug]`
- ? Cart: `/cart`
- ? Checkout: `/checkout`
- ? Admin: `/admin`

### **2. Vérifier la Connexion API**

Ouvrez la console du navigateur (F12) et vérifiez:
```javascript
// Sur la page /shop, vous devriez voir les requêtes API réussir
// Network tab ? Filter: Fetch/XHR
```

Si les produits ne se chargent pas:
- ? Vérifiez la variable `NEXT_PUBLIC_API_URL`
- ? Vérifiez que le backend autorise le domaine Vercel dans CORS

### **3. Configurer CORS Backend**

Dans votre backend (`backend/src/main.ts`), ajoutez le domaine Vercel:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://wearing-mind-xxxx.vercel.app', // Remplacer par votre URL
  ],
  credentials: true,
});
```

---

## ?? Configuration Avancée

### **Domaine Personnalisé (Optionnel)**

1. Aller dans **Settings** ? **Domains**
2. Cliquer sur **"Add"**
3. Entrer votre domaine: `wearingmind.com`
4. Suivre les instructions DNS

### **Déploiement Automatique**

? Déjà configuré! Chaque fois que vous push sur `master`:
- Vercel déploie automatiquement
- Vous recevez une notification par email
- L'URL reste la même

### **Preview Deployments**

Pour chaque Pull Request ou branche:
- Vercel crée un preview deployment
- URL unique: `https://wearing-mind-git-[branch].vercel.app`

---

## ?? Dépannage

### **Build Failed**

**Erreur:** `npm run build` échoue

**Solution:**
1. Tester localement:
   ```powershell
   cd frontend
   npm run build
   ```
2. Si ça marche localement, vérifier Node.js version sur Vercel
3. Settings ? General ? Node.js Version ? Sélectionner **20.x**

### **API Calls Failing**

**Erreur:** Les produits ne se chargent pas

**Solutions:**
1. Vérifier `NEXT_PUBLIC_API_URL` dans Vercel Settings
2. Vérifier que le backend est accessible publiquement
3. Tester l'API directement:
   ```
   https://your-backend-url.com/api/products
   ```
4. Mettre à jour CORS dans le backend

### **Images 404**

**Erreur:** Images Supabase ne s'affichent pas

**Solution:**
1. Vérifier que le bucket Supabase est public
2. Aller dans Supabase ? Storage ? `product-images`
3. Settings ? Make bucket public

---

## ?? Monitoring

### **Vercel Dashboard**

Accès aux métriques:
- **Deployments:** Historique complet
- **Analytics:** Visiteurs, pages vues
- **Logs:** Erreurs en temps réel
- **Speed Insights:** Performance

### **URLs Importantes**

- **Dashboard:** https://vercel.com/enollafritzs-projects/wearing-mind
- **Deployments:** https://vercel.com/enollafritzs-projects/wearing-mind/deployments
- **Settings:** https://vercel.com/enollafritzs-projects/wearing-mind/settings
- **Analytics:** https://vercel.com/enollafritzs-projects/wearing-mind/analytics

---

## ? Checklist Finale

- [ ] Site déployé sur Vercel
- [ ] Variable `NEXT_PUBLIC_API_URL` configurée
- [ ] Homepage accessible
- [ ] Shop page charge les produits
- [ ] Images s'affichent correctement
- [ ] Cart fonctionne
- [ ] Checkout fonctionne
- [ ] Admin panel accessible
- [ ] CORS configuré dans le backend
- [ ] Domaine personnalisé (optionnel)

---

## ?? Félicitations!

Votre site WEARING MIND est maintenant en ligne! ??

**URL de production:** `https://wearing-mind-xxxx.vercel.app`

---

**Besoin d'aide?**
- ?? Guide complet: `VERCEL_DEPLOYMENT_GUIDE.md`
- ?? Documentation Vercel: https://vercel.com/docs
- ?? Support: https://vercel.com/support

---

**Dernière mise à jour:** 2026-01-11  
**Status:** ? Prêt pour le déploiement
