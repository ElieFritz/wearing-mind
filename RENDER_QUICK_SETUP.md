# ?? Guide Rapide - Ajouter Variables Render

## ? Variables Copiées dans le Presse-Papiers

Les 8 variables suivantes sont dans votre presse-papiers :

```
SUPABASE_URL=https://vbunghyafwsubpjvrvju.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZidW5naHlhZndzdWJwanZydmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NTY3NTksImV4cCI6MjA1MjEzMjc1OX0.kjJGXbPNBfhZfaJFzmBJ_qfkmNKzApHYYlpV9vWQdYQ
FRONTEND_URL=https://frontend-iota-flax-11.vercel.app
RESEND_API_KEY=re_4MNyCY58_8EEggjyHy1CnsMChTxyBypHg
ADMIN_EMAIL=admin@wearingmind.com
PORT=10000
NODE_ENV=production
EMAIL_FROM=WEARING MIND <onboarding@resend.dev>
```

---

## ?? Comment les Ajouter sur Render (5 minutes)

### Étape 1 : Ouvrir Render Dashboard
```powershell
Start-Process "https://dashboard.render.com/"
```

### Étape 2 : Navigation
1. Cliquez sur votre service **"wearing-mind"**
2. Allez dans l'onglet **"Environment"** (à gauche)

### Étape 3 : Ajouter Chaque Variable

Pour chaque variable dans le presse-papiers :

1. **Cliquez** sur le bouton **"Add Environment Variable"**
2. **Key** : Collez le nom (ex: `SUPABASE_URL`)
3. **Value** : Collez la valeur (ex: `https://vbunghyafwsubpjvrvju.supabase.co`)
4. **Répétez** pour les 8 variables

### Étape 4 : Sauvegarder
1. **Cliquez** sur **"Save Changes"** (en bas)
2. ? **Attendez** 2-3 minutes que le service redémarre
3. Le statut va passer de "Deploying" à "Live"

---

## ?? Tester Après Configuration

Une fois que le service est "Live", testez :

```powershell
.\test-render-apis.ps1
```

**Résultat Attendu** :
```
Test 1: Health Check (/api)
   ? PASSED - Status: 200

Test 2: Products List (/api/products)
   ? PASSED - Found 0 products

Test 3: Featured Products (/api/products/featured)
   ? PASSED - Found 0 featured products

... etc ...

Passed: 6
Failed: 0

?? ALL TESTS PASSED!
```

---

## ?? En Cas de Problème

Si les tests échouent encore :

### Vérifier 1 : Nom des Variables
Les noms doivent être EXACTEMENT :
- ? `SUPABASE_URL` (pas `SUPABASE_URL_KEY`)
- ? `SUPABASE_KEY` (pas `SUPABASE_ANON_KEY`)

### Vérifier 2 : Service Redémarré
- Le badge doit être **vert "Live"**
- Pas **orange "Deploying"**

### Vérifier 3 : Logs Render
Si erreur, consultez les logs :
```
Render Dashboard > wearing-mind > Logs
```

Cherchez des messages comme :
- ? `Supabase client initialized`
- ? `SUPABASE_URL is not defined`

---

## ?? Raccourcis PowerShell

```powershell
# Afficher les variables à copier
.\show-render-env-vars.ps1

# Configurer (avec copie presse-papiers)
.\configure-render-env.ps1

# Tester après config
.\test-render-apis.ps1

# Ouvrir dashboard Render
Start-Process "https://dashboard.render.com/"

# Ouvrir logs Render
Start-Process "https://dashboard.render.com/web/srv-cug93m68ii6s73cp87vg/logs"
```

---

## ? Checklist Complète

- [ ] Ouvrir Render Dashboard
- [ ] Aller dans Environment
- [ ] Ajouter SUPABASE_URL
- [ ] Ajouter SUPABASE_KEY
- [ ] Ajouter FRONTEND_URL
- [ ] Ajouter RESEND_API_KEY
- [ ] Ajouter ADMIN_EMAIL
- [ ] Ajouter PORT (10000)
- [ ] Ajouter NODE_ENV (production)
- [ ] Ajouter EMAIL_FROM
- [ ] Cliquer "Save Changes"
- [ ] Attendre redémarrage (2-3 min)
- [ ] Lancer `.\test-render-apis.ps1`
- [ ] Vérifier tous les tests passent ?

---

**Temps estimé** : 5-10 minutes  
**Dernière mise à jour** : 2026-01-12
