# ?? WEARING MIND - Guide de Démarrage Rapide

## ? Checklist Pré-requis

- [x] Frontend : http://localhost:3000 (LIVE)
- [ ] Database : Schema exécuté sur Supabase
- [ ] Backend : Configuré et démarré

---

## ?? Étapes d'Installation Complète

### 1?? Database Setup (5 min)

**A. Via Supabase Dashboard** :
1. Connectez-vous : https://app.supabase.com
2. Projet : `vbunghyafwsubpjvrvju`
3. SQL Editor ? New Query
4. Copiez tout le contenu de `database/schema.sql`
5. Run ? Attendez "Success"

**B. Vérification** :
- Table Editor ? Vous devez voir 4 tables
- Products ? 4 produits sample
- Customers ? 1 client demo

**C. Récupérez vos clés** :
```
Settings ? API
??? Project URL    ? SUPABASE_URL
??? anon public    ? SUPABASE_ANON_KEY
??? service_role   ? SUPABASE_SERVICE_KEY
```

---

### 2?? Backend Configuration (2 min)

**A. Créez `backend/.env`** :
```bash
cd backend
cp .env.example .env
```

**B. Remplissez les variables** :
```env
SUPABASE_URL=https://vbunghyafwsubpjvrvju.supabase.co
SUPABASE_ANON_KEY=eyJhbGc... (votre clé)
SUPABASE_SERVICE_KEY=eyJhbGc... (votre clé)
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**C. Installez les dépendances** :
```bash
npm install
```

---

### 3?? Démarrage Backend (1 min)

```bash
cd backend
npm run start:dev
```

**Attendez** :
```
Application is running on: http://localhost:3001
```

**Testez l'API** :
```bash
# Products
curl http://localhost:3001/api/products

# Health check
curl http://localhost:3001
```

---

### 4?? Test Complet (2 min)

**A. Frontend toujours actif** :
- http://localhost:3000 ?

**B. Backend répond** :
- http://localhost:3001/api/products ?

**C. Database connectée** :
- Les 4 produits sample s'affichent ?

**D. Admin Panel** :
- http://localhost:3000/admin ?
- Vérifiez que les données apparaissent

---

## ?? Troubleshooting

### Erreur : "Cannot connect to Supabase"
```bash
# Vérifiez vos clés dans .env
cat backend/.env

# Vérifiez que le projet Supabase est actif
# Dashboard ? Project Settings ? General
```

### Erreur : "Port 3001 already in use"
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <process_id> /F

# macOS/Linux
lsof -ti:3001 | xargs kill -9
```

### Erreur : "RLS policy prevents access"
```bash
# Dans Supabase SQL Editor
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
# (Temporairement pour tester)
```

---

## ?? Vérification Finale

### ? Checklist de Succès

**Frontend** :
- [x] Démarre sur :3000
- [x] Pages chargent correctement
- [x] Images s'affichent
- [x] Admin panel accessible

**Backend** :
- [ ] Démarre sur :3001
- [ ] API répond
- [ ] Logs sans erreurs
- [ ] Connexion Supabase OK

**Database** :
- [ ] 4 tables créées
- [ ] 4 produits sample
- [ ] 1 client demo
- [ ] Policies RLS actives

**Integration** :
- [ ] Frontend peut appeler Backend
- [ ] Backend lit depuis Database
- [ ] CRUD fonctionne

---

## ?? Commandes Rapides

### Démarrage Complet
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run start:dev
```

### Vérification Status
```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:3001/api/products

# Database (via Supabase Dashboard)
SELECT COUNT(*) FROM products;
```

### Arrêt
```bash
# Ctrl+C dans chaque terminal
# Ou fermer les fenêtres PowerShell
```

---

## ?? Next Steps

Une fois que tout fonctionne :

1. **Connecter Admin Panel** :
   - Modifier `admin/products/page.tsx`
   - Utiliser `fetch()` vers Backend API

2. **Authentification** :
   - Implémenter JWT
   - Protéger routes admin

3. **Fonctionnalités** :
   - Upload images produits
   - Gestion commandes
   - Paiement Stripe

4. **Déploiement** :
   - Frontend ? Vercel
   - Backend ? Railway/Render
   - Database ? Supabase (déjà hébergé)

---

## ?? Besoin d'Aide ?

**Logs Backend** :
```bash
cd backend
npm run start:dev > backend.log 2>&1
tail -f backend.log
```

**Vérifier Database** :
```sql
-- Dans Supabase SQL Editor
SELECT * FROM products;
SELECT * FROM customers;
SELECT * FROM orders;
```

**Tester API** :
```bash
# Windows PowerShell
Invoke-WebRequest -Uri "http://localhost:3001/api/products" | Select-Object Content

# Bash
curl -X GET http://localhost:3001/api/products | jq
```

---

## ? Status Actuel

**Votre Projet** :
- Frontend : ? 100% (LIVE)
- Database : ? 90% (Schema prêt, à exécuter)
- Backend : ? 80% (Config prête, à démarrer)

**Il ne reste que 10 minutes pour finaliser !** ??

---

**Date** : 2026-01-11  
**Version** : 1.0  
**Status** : Prêt pour déploiement
