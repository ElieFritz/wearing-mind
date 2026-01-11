# Supabase Storage Buckets Structure

## 1. Bucket: `products`
- **Access**: Public
- **Content**: Product images and videos.
- **Folder Structure**:
  - `/{product_slug}/general/{filename}` (General product images)
  - `/{product_slug}/{variant_sku}/{filename}` (Specific variant images)

## 2. Bucket: `avatars`
- **Access**: Public
- **Content**: User profile pictures.
- **Folder Structure**:
  - `/{user_id}/{filename}`

## 3. Bucket: `assets`
- **Access**: Public
- **Content**: Static site assets (hero videos, banners, logos).
- **Folder Structure**:
  - `/hero/{filename}`
  - `/banners/{filename}`
  - `/brand/{filename}`

## Policies (RLS)
- `products`: Read public, Write authenticated (admin role only)
- `avatars`: Read public, Write authenticated (owner only)
- `assets`: Read public, Write authenticated (admin role only)
