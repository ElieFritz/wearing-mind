# ?? Migration Base de Données - Ajout Tailles & Couleurs

## ? Erreur Rencontrée

```
ERROR: 42703: column "variant_id" does not exist
```

**Cause** : Le fichier `schema.sql` complet essaie de créer des références à `variant_id` avant que la colonne n'existe.

---

## ? Solution : Migration Progressive

### **Méthode 1 : Migration Automatique (Recommandée)**

**Fichier** : `database/migrate-add-sizes-colors.sql`

**Étapes** :

1. **Ouvrez Supabase Dashboard**
   ```
   https://app.supabase.com
   ? Votre projet
   ? SQL Editor
   ```

2. **Créez une nouvelle Query**
   ```
   ? "+ New Query"
   ```

3. **Copiez/Collez le contenu**
   ```
   Ouvrez : database/migrate-add-sizes-colors.sql
   Copiez tout le contenu
   Collez dans SQL Editor
   ```

4. **Exécutez**
   ```
   ? Cliquez "Run" (F5)
   ? Attendez confirmation
   ```

5. **Vérifiez le résultat**
   ```sql
   -- Devrait afficher :
   products | has_sizes: true | has_colors: true
   product_variants | table_exists: true
   order_items | has_variant_id: true | has_size: true | has_color: true
   ```

---

### **Méthode 2 : Migration Manuelle (Si erreur)**

Si la migration automatique échoue, exécutez étape par étape :

#### **Étape 1 : Ajouter colonnes à products**
```sql
-- Sizes
ALTER TABLE products ADD COLUMN IF NOT EXISTS sizes JSONB DEFAULT '["S","M","L","XL"]'::jsonb;

-- Colors
ALTER TABLE products ADD COLUMN IF NOT EXISTS colors JSONB DEFAULT '[]'::jsonb;
```

#### **Étape 2 : Créer table product_variants**
```sql
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(10),
  color VARCHAR(50),
  sku VARCHAR(100) UNIQUE,
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  price_adjustment DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, size, color)
);
```

#### **Étape 3 : Ajouter colonnes à order_items**
```sql
-- Variant ID
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS variant_id UUID;
ALTER TABLE order_items ADD CONSTRAINT fk_order_items_variant FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE SET NULL;

-- Size & Color
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS size VARCHAR(10);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS color VARCHAR(50);
```

#### **Étape 4 : Créer indexes**
```sql
CREATE INDEX IF NOT EXISTS idx_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_variants_sku ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_order_items_variant_id ON order_items(variant_id);
```

#### **Étape 5 : Activer RLS**
```sql
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Variants are viewable by everyone" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Variants are insertable by everyone" ON product_variants FOR INSERT WITH CHECK (true);
CREATE POLICY "Variants are updatable by everyone" ON product_variants FOR UPDATE USING (true);
CREATE POLICY "Variants are deletable by everyone" ON product_variants FOR DELETE USING (true);
```

#### **Étape 6 : Mettre à jour produits existants**
```sql
-- Ajouter tailles par défaut
UPDATE products
SET sizes = '["S","M","L","XL"]'::jsonb
WHERE sizes IS NULL OR sizes = '[]'::jsonb;

-- Détecter couleurs depuis nom
UPDATE products
SET colors = CASE
  WHEN LOWER(name) LIKE '%black%' THEN '["#000000"]'::jsonb
  WHEN LOWER(name) LIKE '%white%' THEN '["#FFFFFF"]'::jsonb
  WHEN LOWER(name) LIKE '%grey%' OR LOWER(name) LIKE '%gray%' THEN '["#808080"]'::jsonb
  ELSE '[]'::jsonb
END
WHERE colors IS NULL OR colors = '[]'::jsonb;
```

---

## ?? Vérification Post-Migration

### **Test 1 : Vérifier colonnes products**
```sql
SELECT 
  column_name, 
  data_type,
  column_default
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name IN ('sizes', 'colors');
```

**Résultat attendu** :
```
sizes  | jsonb | '["S","M","L","XL"]'::jsonb
colors | jsonb | '[]'::jsonb
```

### **Test 2 : Vérifier table product_variants**
```sql
SELECT COUNT(*) as variant_count FROM product_variants;
```

**Résultat attendu** : `0` (table vide au début)

### **Test 3 : Vérifier colonnes order_items**
```sql
SELECT 
  column_name, 
  data_type
FROM information_schema.columns
WHERE table_name = 'order_items'
  AND column_name IN ('variant_id', 'size', 'color');
```

**Résultat attendu** :
```
variant_id | uuid
size       | character varying
color      | character varying
```

### **Test 4 : Vérifier produits mis à jour**
```sql
SELECT 
  name,
  sizes,
  colors
FROM products
LIMIT 5;
```

**Résultat attendu** :
```
Mind Hoodie Black | ["XS","S","M","L","XL","XXL"] | ["#000000"]
Logo Tee White    | ["S","M","L","XL"]             | ["#FFFFFF"]
...
```

---

## ?? Diagnostic Erreurs

### **Erreur : "column already exists"**
```
Cause : Migration déjà partiellement exécutée
Solution : Normal, continuez avec le reste
```

### **Erreur : "relation does not exist"**
```
Cause : Table parent manquante
Solution : Créez d'abord products, puis variants
```

### **Erreur : "permission denied"**
```
Cause : Pas de droits suffisants
Solution : Utilisez service_role key ou owner
```

---

## ?? État Final Attendu

### **Structure Tables**

```
products
??? id (UUID)
??? name
??? slug
??? sku
??? price
??? stock
??? images (JSONB)
??? sizes (JSONB) ? NOUVEAU
??? colors (JSONB) ? NOUVEAU
??? ...

product_variants ? NOUVEAU
??? id (UUID)
??? product_id (FK ? products)
??? size
??? color
??? sku (unique)
??? stock
??? price_adjustment
??? ...

order_items
??? id (UUID)
??? order_id (FK ? orders)
??? product_id (FK ? products)
??? variant_id (FK ? product_variants) ? NOUVEAU
??? size ? NOUVEAU
??? color ? NOUVEAU
??? ...
```

---

## ? Checklist Post-Migration

Après avoir exécuté la migration :

**Database** :
- [ ] Colonne `products.sizes` existe
- [ ] Colonne `products.colors` existe
- [ ] Table `product_variants` créée
- [ ] Colonne `order_items.variant_id` existe
- [ ] Colonne `order_items.size` existe
- [ ] Colonne `order_items.color` existe
- [ ] Indexes créés
- [ ] RLS policies actives

**Data** :
- [ ] Produits existants ont sizes par défaut
- [ ] Produits existants ont colors détectées
- [ ] Aucune erreur de foreign key

**API** :
- [ ] GET /api/products retourne sizes & colors
- [ ] POST /api/products accepte sizes & colors
- [ ] PUT /api/products met à jour sizes & colors

**Frontend** :
- [ ] Admin panel affiche sélecteurs
- [ ] Page produit affiche tailles depuis DB
- [ ] Page produit affiche couleurs depuis DB

---

## ?? Commandes Rapides

### **PowerShell - Test API après migration**
```powershell
# Vérifier qu'un produit a bien sizes & colors
$product = Invoke-RestMethod "http://localhost:3001/api/products" | Select-Object -First 1
$product | Select-Object name, sizes, colors | Format-List
```

**Résultat attendu** :
```
name   : Mind Hoodie Black
sizes  : {XS, S, M, L, XL, XXL}
colors : {#000000}
```

### **SQL - Voir tous les produits avec sizes**
```sql
SELECT 
  name,
  jsonb_array_length(sizes) as size_count,
  jsonb_array_length(colors) as color_count
FROM products;
```

---

## ?? Notes Importantes

### **1. Migration est Idempotente**
```
? Peut être exécutée plusieurs fois sans erreur
? Utilise IF NOT EXISTS
? Skip si déjà fait
```

### **2. Données Existantes Préservées**
```
? Aucune donnée supprimée
? Colonnes ajoutées avec valeurs par défaut
? Produits existants mis à jour automatiquement
```

### **3. Rollback Possible**
```sql
-- Si besoin de rollback
ALTER TABLE products DROP COLUMN IF EXISTS sizes;
ALTER TABLE products DROP COLUMN IF EXISTS colors;
DROP TABLE IF EXISTS product_variants CASCADE;
ALTER TABLE order_items DROP COLUMN IF EXISTS variant_id;
ALTER TABLE order_items DROP COLUMN IF EXISTS size;
ALTER TABLE order_items DROP COLUMN IF EXISTS color;
```

---

## ?? Prochaines Étapes

**1. Exécuter migration** :
```
? Supabase SQL Editor
? Copier/coller migrate-add-sizes-colors.sql
? Run
```

**2. Vérifier résultats** :
```sql
-- Doit afficher "true" partout
SELECT ...
```

**3. Tester API** :
```powershell
.\test-product-page.ps1
```

**4. Tester Frontend** :
```
http://localhost:3000/admin/products/new
? Voir sélecteurs tailles/couleurs
```

**5. Migrer données existantes (optionnel)** :
```powershell
.\migrate-sizes-colors.ps1
```

---

**Exécutez maintenant la migration !** ??

Fichier : `database/migrate-add-sizes-colors.sql`  
Méthode : SQL Editor Supabase

Une fois fait, tout fonctionnera ! ?
