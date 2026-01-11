# WEARING MIND - Hero Images

## Instructions pour ajouter vos images

Placez 4 images captivantes haute résolution dans ce dossier avec les noms suivants :

- `hero-1.jpg` - Image principale lifestyle (recommandé: 1920x1080px minimum)
- `hero-2.jpg` - Produit phare ou lookbook (recommandé: 1920x1080px minimum)
- `hero-3.jpg` - Ambiance streetwear urbaine (recommandé: 1920x1080px minimum)
- `hero-4.jpg` - Collection ou détails produit (recommandé: 1920x1080px minimum)

## ?? Images temporaires disponibles

### Option 1 : Utiliser des URLs directes (Recommandé)

Vous pouvez utiliser ces images temporaires en modifiant `HeroSection.tsx` :

```tsx
const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    gradient: 'from-[#1E2A5A] via-[#2D3A6A] to-[#3B4D80]',
    title: 'Wear Your',
    subtitle: 'Mind',
  },
  {
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1920&q=80',
    gradient: 'from-[#3B4D80] via-[#2D3A6A] to-[#1E2A5A]',
    title: 'Conscious',
    subtitle: 'Style',
  },
  {
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1920&q=80',
    gradient: 'from-[#2D3A6A] via-[#1E2A5A] to-[#3B4D80]',
    title: 'Premium',
    subtitle: 'Streetwear',
  },
  {
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea8c732a?w=1920&q=80',
    gradient: 'from-[#1E2A5A] via-[#3B4D80] to-[#2D3A6A]',
    title: 'Collection',
    subtitle: '2026',
  },
];
```

### ?? Description des images Unsplash

1. **hero-1** (Wear Your Mind)
   - URL: `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80`
   - Style: Mode streetwear premium, fond neutre
   - Mood: Minimaliste, confiant

2. **hero-2** (Conscious Style)
   - URL: `https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1920&q=80`
   - Style: Lifestyle urbain, vêtements de qualité
   - Mood: Moderne, épuré

3. **hero-3** (Premium Streetwear)
   - URL: `https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1920&q=80`
   - Style: Fashion editorial, composition artistique
   - Mood: Élégant, professionnel

4. **hero-4** (Collection 2026)
   - URL: `https://images.unsplash.com/photo-1558769132-cb1aea8c732a?w=1920&q=80`
   - Style: Détails textile, matières premium
   - Mood: Qualité, artisanal

---

## ?? Alternative : Pexels (Autres sources)

### Images streetwear premium alternatives

```
1. https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?w=1920&q=80
   - Mannequin fashion streetwear, ambiance urbaine

2. https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?w=1920&q=80
   - Mode minimaliste, fond propre

3. https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?w=1920&q=80
   - Lifestyle moderne, vêtements premium

4. https://images.pexels.com/photos/1448667/pexels-photo-1448667.jpeg?w=1920&q=80
   - Détails vêtements, texture premium
```

---

## ?? Pour activer les images

### Méthode rapide (URLs directes)

1. Ouvrez `frontend/src/components/HeroSection.tsx`
2. Remplacez le tableau `HERO_SLIDES` (lignes 8-33) par celui ci-dessus
3. Décommentez les lignes 67-75 (section Image Next.js)
4. Sauvegardez et rafraîchissez le navigateur

### Code à décommenter dans HeroSection.tsx

Trouvez cette section et décommentez-la :

```tsx
{/* Décommentez pour utiliser de vraies images: */}
<Image
  src={HERO_SLIDES[currentSlide].image}
  alt={`${HERO_SLIDES[currentSlide].title} ${HERO_SLIDES[currentSlide].subtitle}`}
  fill
  priority={currentSlide === 0}
  className="object-cover"
  quality={90}
/>
```

---

## ?? Télécharger localement (Optionnel)

Si vous préférez héberger les images localement :

### Avec PowerShell

```powershell
# Dans le dossier frontend/public/images/
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80" -OutFile "hero-1.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1920&q=80" -OutFile "hero-2.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1920&q=80" -OutFile "hero-3.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1558769132-cb1aea8c732a?w=1920&q=80" -OutFile "hero-4.jpg"
```

### Ou manuellement

1. Cliquez sur chaque lien ci-dessus
2. Téléchargez l'image
3. Renommez-la en `hero-1.jpg`, `hero-2.jpg`, etc.
4. Placez-les dans `frontend/public/images/`

---

## ? Configuration Next.js pour images externes

Si vous utilisez des URLs externes, ajoutez dans `next.config.js` :

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

module.exports = nextConfig;
```

---

## ?? Recommandations visuelles

### Style des images
- **Esthétique premium** : Éclairage professionnel, composition épurée
- **Palette de couleurs** : Harmonisée avec le bleu profond #1E2A5A
- **Sujet** : Produits portés en contexte lifestyle, détails matières, ambiances urbaines élégantes
- **Mood** : Calme, confiant, intelligent, moderne

### Spécifications techniques
- **Format** : JPG ou WebP optimisé
- **Résolution** : Minimum 1920x1080px (Full HD)
- **Ratio** : 16:9 ou 16:10 recommandé
- **Poids** : Maximum 500KB par image (optimisé pour le web)
- **Qualité** : 85-90% pour équilibrer qualité et performance

---

## ?? Licences

- **Unsplash** : Licence gratuite, utilisation commerciale autorisée
- **Pexels** : Licence gratuite, utilisation commerciale autorisée
- Aucune attribution requise, mais recommandée

---

## ? Statut actuel

- ? Gradients bleus premium comme placeholder
- ?? URLs d'images temporaires disponibles ci-dessus
- ?? Prêt à télécharger vos propres images de marque

---

**Note** : Ces images sont des placeholders temporaires. Pour la production, utilisez vos propres photos de marque WEARING MIND pour garantir l'unicité et la cohérence visuelle.
