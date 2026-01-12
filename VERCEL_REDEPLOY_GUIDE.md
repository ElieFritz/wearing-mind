# ?? Guide Redéploiement Vercel - WEARING MIND

## ? Option 1: Via Dashboard (RECOMMANDÉ - Le plus simple)

### Étapes:

1. **Dashboard ouvert automatiquement**: https://vercel.com/enollafritzs-projects/wearing-mind

2. **Si le projet "wearing-mind" existe:**
   - Cliquez sur le projet
   - Onglet **"Deployments"**
   - Sur le dernier déploiement ? Cliquez sur **"..."** (3 points)
   - Sélectionnez **"Redeploy"**
   - Confirmez

3. **Si le projet n'existe PAS encore:**
   - Cliquez sur **"Add New"** ? **"Project"**
   - Import depuis GitHub: **"ElieFritz/wearing-mind"**
   - **?? IMPORTANT:** Root Directory = `frontend`
   - Ajoutez la variable: `NEXT_PUBLIC_API_URL`
   - Cliquez sur **"Deploy"**

---

## ?? Option 2: Via CLI (Avancé)

### Méthode A: Lier manuellement au bon projet

```powershell
cd "C:\Users\mappo\source\repos\wearing mind\frontend"

# Supprimer le lien actuel
Remove-Item -Path .vercel -Recurse -Force

# Déployer et lier au bon projet
vercel --prod

# Quand demandé:
# ? Link to existing project? Yes
# ? Which project? wearing-mind (sélectionner avec les flèches)
```

### Méthode B: Forcer le lien au projet

```powershell
cd "C:\Users\mappo\source\repos\wearing mind\frontend"

# Créer le dossier .vercel si nécessaire
New-Item -Path .vercel -ItemType Directory -Force

# Créer le fichier de configuration
@"
{
  "projectId": "prj_xxxxx",
  "orgId": "team_xxxxx"
}
"@ | Out-File -FilePath .vercel\project.json -Encoding UTF8

# Puis déployer
vercel --prod
```

**Note:** Vous devez obtenir `projectId` et `orgId` depuis le dashboard Vercel.

---

## ?? Vérifier le Déploiement

Après le déploiement:

1. **URL du site**: Notez l'URL finale (ex: `https://wearing-mind.vercel.app`)

2. **Tester les pages principales**:
   - Homepage: `/`
   - Shop: `/shop`
   - Admin: `/admin`
   - Cart: `/cart`
   - Checkout: `/checkout`

3. **Vérifier la connexion API**:
   - Ouvrir la console (F12)
   - Aller sur `/shop`
   - Vérifier que les produits se chargent

---

## ?? Variables d'Environnement

**À configurer dans Vercel:**

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | URL de votre backend (voir ci-dessous) |

**Exemples:**

```
# Backend local (pour test)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Backend sur Railway
NEXT_PUBLIC_API_URL=https://wearing-mind-production.up.railway.app/api

# Backend sur Heroku
NEXT_PUBLIC_API_URL=https://wearing-mind-api.herokuapp.com/api
```

**Comment ajouter/modifier:**
1. Dashboard Vercel ? Projet "wearing-mind"
2. **Settings** ? **Environment Variables**
3. Modifier `NEXT_PUBLIC_API_URL`
4. Redéployer pour appliquer

---

## ?? Dépannage

### Problème: CLI lie au mauvais projet

**Solution:**
```powershell
cd frontend
Remove-Item -Path .vercel -Recurse -Force
vercel --prod
# Sélectionner manuellement "wearing-mind"
```

### Problème: Build échoue

**Tester localement:**
```powershell
cd frontend
npm run build
```

Si ça marche localement:
- Vérifier Node.js version sur Vercel (Settings ? General ? Node.js 20.x)

### Problème: API calls ne fonctionnent pas

**Vérifier:**
1. Variable `NEXT_PUBLIC_API_URL` dans Vercel
2. Backend accessible publiquement
3. CORS configuré dans le backend pour autoriser l'URL Vercel

---

## ?? Déploiement Automatique

**Configuré par défaut:**
- Push sur `master` ? Déploiement automatique en production
- Push sur autre branche ? Déploiement preview

**Pour désactiver:**
- Dashboard ? Settings ? Git ? Désactiver "Production Branch"

---

## ?? Checklist Post-Déploiement

- [ ] Site accessible sur l'URL Vercel
- [ ] Homepage charge correctement
- [ ] Images s'affichent
- [ ] Shop page montre les produits
- [ ] Cart fonctionne
- [ ] Admin accessible
- [ ] Variable `NEXT_PUBLIC_API_URL` configurée
- [ ] Backend CORS autorise l'URL Vercel

---

## ?? Liens Utiles

- **Dashboard projet**: https://vercel.com/enollafritzs-projects/wearing-mind
- **Deployments**: https://vercel.com/enollafritzs-projects/wearing-mind/deployments
- **Settings**: https://vercel.com/enollafritzs-projects/wearing-mind/settings
- **Analytics**: https://vercel.com/enollafritzs-projects/wearing-mind/analytics

---

**Dernière mise à jour**: 2026-01-11  
**Status**: ? Prêt pour le redéploiement
