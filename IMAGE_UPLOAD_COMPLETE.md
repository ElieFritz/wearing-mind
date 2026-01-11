# ??? Image Upload avec Supabase Storage - Guide Complet

## ? Ce qui a été implémenté

### Backend (NestJS)
- ? **UploadService** : Gestion upload/delete avec Supabase Storage
- ? **UploadController** : API `/api/upload/image`
- ? **UploadModule** : Configuration Multer (5MB max, images uniquement)
- ? Génération UUID pour noms de fichiers uniques
- ? Support multi-upload
- ? Validation type de fichier et taille

### Frontend (Next.js)
- ? **ImageUploader Component** : Composant réutilisable
- ? Drag & Drop support
- ? Preview images avec grille
- ? Delete images (local + storage)
- ? Loading states
- ? Validation côté client
- ? Indication image principale
- ? Intégré au formulaire produit

## ?? Configuration Requise

### 1. Créer le Bucket Supabase

**Option A - Via Dashboard** :
```
1. https://app.supabase.com
2. Projet: vbunghyafwsubpjvrvju
3. Storage ? Create Bucket
4. Name: "products"
5. ? Public bucket
6. Create
```

**Option B - Via SQL** :
```sql
-- Exécutez database/create-storage-bucket.sql dans SQL Editor
```

### 2. Configurer les Policies

Les policies permettent :
- ?? **Public** : Lecture des images (SELECT)
- ?? **Authenticated** : Upload, Update, Delete

### 3. Vérifier le Backend

Backend doit être redémarré pour charger `UploadModule` :
```powershell
cd backend
npm run start:dev
```

Vérifiez les logs :
```
[Nest] ... LOG [RoutesResolver] UploadController {/api/upload}:
[Nest] ... LOG [RouterExplorer] Mapped {/api/upload/image, POST} route
```

## ?? Utilisation

### Upload d'Image

**1. Via Interface Admin** :
```
1. http://localhost:3000/admin/products/new
2. Section "Product Images"
3. Drag & Drop ou Click to Upload
4. Images uploadées automatiquement vers Supabase
5. URLs stockées dans le produit
```

**2. Via API (cURL)** :
```bash
curl -X POST http://localhost:3001/api/upload/image \
  -F "file=@/path/to/image.jpg"
```

**3. Via PowerShell** :
```powershell
$file = "C:\path\to\image.jpg"
$form = @{
    file = Get-Item -Path $file
}
Invoke-RestMethod -Uri "http://localhost:3001/api/upload/image" `
  -Method POST -Form $form
```

### Response Format

```json
{
  "success": true,
  "url": "https://vbunghyafwsubpjvrvju.supabase.co/storage/v1/object/public/products/products/abc-123.jpg",
  "message": "Image uploaded successfully"
}
```

## ?? Features

### ImageUploader Component

**Props** :
- `images`: string[] - Array d'URLs existantes
- `onImagesChange`: (urls: string[]) => void - Callback
- `maxImages`: number - Max images (défaut: 5)

**Fonctionnalités** :
- ? Drag & Drop area
- ? Multi-select files
- ? Preview grid responsive
- ? Hover effects pour supprimer
- ? Badge "Main" sur première image
- ? Loading spinner pendant upload
- ? Validation instantanée
- ? Error handling avec alerts

### Validations

**Backend** :
- Max 5MB par fichier
- Types autorisés : JPG, JPEG, PNG, GIF, WEBP
- Filenames avec UUID unique

**Frontend** :
- Vérification type MIME
- Limite taille client-side
- Max images configurable
- Feedback visuel immédiat

## ?? Structure Storage

```
Supabase Storage
??? products/
    ??? products/
        ??? uuid-1.jpg
        ??? uuid-2.png
        ??? uuid-3.webp
```

**URLs Publiques** :
```
https://vbunghyafwsubpjvrvju.supabase.co/storage/v1/object/public/products/products/[UUID].[EXT]
```

## ?? Workflow Complet

```
1. User drag & drop image
   ?
2. Frontend valide (type + size)
   ?
3. Upload vers /api/upload/image
   ?
4. Backend génère UUID unique
   ?
5. Upload vers Supabase Storage
   ?
6. Retour URL publique
   ?
7. Frontend ajoute URL à la liste
   ?
8. Enregistrement produit avec URLs
   ?
9. Database stocke JSON d'URLs
   ?
10. Images affichées partout
```

## ??? Troubleshooting

### Erreur "Bucket not found"
```sql
-- Créez le bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true);
```

### Erreur "Permission denied"
```sql
-- Ajoutez les policies
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'products');
```

### Upload échoue à 413
```typescript
// Augmentez la limite dans upload.module.ts
limits: {
  fileSize: 10 * 1024 * 1024, // 10MB
}
```

### CORS errors
```typescript
// backend/src/main.ts
app.enableCors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
});
```

## ?? Customisation

### Changer la limite d'images

```typescript
<ImageUploader
  images={imageUrls}
  onImagesChange={setImageUrls}
  maxImages={10} // Au lieu de 5
/>
```

### Changer la taille max

```typescript
// backend/src/upload/upload.module.ts
limits: {
  fileSize: 10 * 1024 * 1024, // 10MB
}
```

### Ajouter d'autres formats

```typescript
fileFilter: (req, file, cb) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg)$/)) {
    return cb(new Error('Only image files!'), false);
  }
  cb(null, true);
}
```

## ?? API Endpoints

### POST /api/upload/image
Upload une image unique

**Request** :
```
Content-Type: multipart/form-data
Body: file=[binary]
```

**Response** :
```json
{
  "success": true,
  "url": "https://...",
  "message": "Image uploaded successfully"
}
```

### DELETE /api/upload/image
Supprimer une image

**Request** :
```json
{
  "path": "products/products/abc-123.jpg"
}
```

**Response** :
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

## ? Checklist de Configuration

- [ ] Bucket "products" créé dans Supabase
- [ ] Policies configurées (public read + auth write)
- [ ] Backend redémarré avec UploadModule
- [ ] Dépendances installées (multer, uuid)
- [ ] CORS configuré pour uploads
- [ ] Tester upload via admin panel

## ?? Résultat Final

**Avant** :
- ? URLs manuelles uniquement
- ? Pas de preview
- ? Pas de validation

**Maintenant** :
- ? Upload direct depuis navigateur
- ? Drag & Drop intuitif
- ? Preview immédiat
- ? Storage Supabase sécurisé
- ? URLs publiques générées
- ? Gestion complète (add/delete)
- ? Validation automatique
- ? Expérience UX moderne

---

**Dernière mise à jour** : 2026-01-11  
**Status** : ? Production Ready
