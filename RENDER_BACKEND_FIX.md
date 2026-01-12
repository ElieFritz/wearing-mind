# ?? Fix Backend Render - Supabase Configuration

## ? Problème Identifié

**Erreur** : `Cannot read properties of undefined (reading 'from')`

**Cause** : Les variables d'environnement Supabase ne sont pas configurées sur Render.

---

## ? Solution - Configuration Render

### 1. Aller sur Render Dashboard

?? https://dashboard.render.com/

### 2. Sélectionner le service `wearing-mind`

### 3. Aller dans l'onglet **Environment**

### 4. Ajouter/Vérifier ces variables :

```env
SUPABASE_URL=https://[votre-projet].supabase.co
SUPABASE_KEY=[votre-anon-public-key]
FRONTEND_URL=https://frontend-iota-flax-11.vercel.app
PORT=10000
NODE_ENV=production
```

---

## ?? Comment Obtenir vos Identifiants Supabase

### Option A : Depuis Supabase Dashboard

1. Aller sur https://supabase.com/dashboard
2. Sélectionner votre projet
3. Aller dans **Settings** ? **API**
4. Copier :
   - **Project URL** ? `SUPABASE_URL`
   - **anon public** key ? `SUPABASE_KEY`

### Option B : Depuis votre fichier local

Si vous avez le backend configuré localement :

```powershell
# Afficher les variables locales
Get-Content backend\.env
```

---

## ?? Tests Effectués

### ? Endpoint Racine
```
GET https://wearing-mind.onrender.com/api
Response: 200 OK - "Hello World!"
```

### ? Endpoint Products
```
GET https://wearing-mind.onrender.com/api/products
Response: 500 Internal Server Error
Error: "Cannot read properties of undefined (reading 'from')"
```

### ? Endpoint Featured Products
```
GET https://wearing-mind.onrender.com/api/products/featured?limit=4
Response: 500 Internal Server Error
Error: "Cannot read properties of undefined (reading 'from')"
```

### ? Endpoint Orders
```
GET https://wearing-mind.onrender.com/api/orders
Response: 500 Internal Server Error
Error: "Cannot read properties of undefined (reading 'from')"
```

### ? Endpoint Customers
```
GET https://wearing-mind.onrender.com/api/customers
Response: 500 Internal Server Error
Error: "Cannot read properties of undefined (reading 'from')"
```

---

## ?? Vérification de la Configuration

### Variables Actuellement Manquantes

- ? `SUPABASE_URL` - **NON CONFIGURÉ**
- ? `SUPABASE_KEY` - **NON CONFIGURÉ**
- ? `FRONTEND_URL` - Configuré (mais avec erreur de format corrigée)

---

## ?? Après Configuration

1. **Sauvegarder** les variables sur Render
2. Le service va **redémarrer automatiquement** (2-3 minutes)
3. **Attendre** que le statut passe à "Live"
4. **Retester** les APIs

---

## ?? Script de Test

Après avoir configuré, utilisez ce script PowerShell pour tester :

```powershell
# Test complet
Write-Host "Testing Render Backend..." -ForegroundColor Cyan

# Test Products
try {
    $response = Invoke-RestMethod -Uri "https://wearing-mind.onrender.com/api/products" -Method GET
    Write-Host "? Products API working!" -ForegroundColor Green
    Write-Host "Found $($response.length) products" -ForegroundColor White
} catch {
    Write-Host "? Products API failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Test Featured
try {
    $response = Invoke-RestMethod -Uri "https://wearing-mind.onrender.com/api/products/featured?limit=4" -Method GET
    Write-Host "? Featured API working!" -ForegroundColor Green
    Write-Host "Found $($response.length) featured products" -ForegroundColor White
} catch {
    Write-Host "? Featured API failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Test Orders
try {
    $response = Invoke-RestMethod -Uri "https://wearing-mind.onrender.com/api/orders" -Method GET
    Write-Host "? Orders API working!" -ForegroundColor Green
    Write-Host "Found $($response.length) orders" -ForegroundColor White
} catch {
    Write-Host "? Orders API failed" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
}
```

---

## ?? Variables Render - Template

Copiez ces lignes et remplacez les valeurs :

```
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3...
FRONTEND_URL=https://frontend-iota-flax-11.vercel.app
PORT=10000
NODE_ENV=production
ADMIN_EMAIL=admin@wearingmind.com
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

---

## ?? Notes Importantes

1. **Ne jamais** utiliser l'IP privée Supabase (10.x.x.x)
2. Toujours utiliser l'URL **publique** : `https://[projet].supabase.co`
3. Utiliser la clé **anon public**, pas la service_role key
4. Après chaque modification, Render redémarre automatiquement

---

## ?? Résultat Attendu

Une fois configuré correctement, vous devriez voir :

```json
// GET /api/products/featured?limit=4
[
  {
    "id": "uuid",
    "name": "Product Name",
    "price": 120,
    "images": ["url"],
    "category": "Hoodie",
    "is_featured": true
  }
]
```

---

**Dernière mise à jour** : 2026-01-12  
**Status** : ? Variables Supabase manquantes sur Render
