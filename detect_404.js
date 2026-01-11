const fs = require('fs');
const path = require('path');

console.log('=== Detection erreurs 404 - WEARING MIND ===\n');

// Fichiers a verifier
const FILES_TO_CHECK = [
  'src/components/Header.tsx',
  'src/components/Footer.tsx',
  'src/components/HeroSection.tsx',
  'src/components/FeaturedCollection.tsx',
  'src/components/BrandStory.tsx',
  'src/components/DropCountdown.tsx',
  'src/components/ProductCard.tsx',
  'src/app/page.tsx',
  'src/app/shop/page.tsx',
  'src/app/shop/[slug]/page.tsx',
  'src/app/cart/page.tsx',
  'src/app/checkout/page.tsx',
  'src/app/admin/layout.tsx',
  'src/app/admin/page.tsx',
  'src/app/admin/products/page.tsx',
  'src/app/admin/orders/page.tsx',
];

// Images requises
const REQUIRED_IMAGES = [
  'public/images/logo.png',
  'public/images/hero-1.jpg',
  'public/images/hero-2.jpg',
  'public/images/hero-3.jpg',
  'public/images/hero-4.jpg',
  'public/images/products/hoodie-black.jpg',
  'public/images/products/hoodie-grey.jpg',
  'public/images/products/tee-white.jpg',
  'public/images/products/sweat-oversized.jpg',
  'public/images/brand/craftsmanship.jpg',
  'public/images/brand/sustainability.jpg',
  'public/images/collections/chaos-theory.jpg',
];

let totalIssues = 0;

// Verifier images
console.log('1. Verification des images...\n');
REQUIRED_IMAGES.forEach((imagePath) => {
  if (fs.existsSync(imagePath)) {
    console.log(`   OK: ${imagePath}`);
  } else {
    console.log(`   404: ${imagePath} - MISSING`);
    totalIssues++;
  }
});

// Verifier liens dans fichiers
console.log('\n2. Verification des liens dans les fichiers...\n');
const imageRegex = /(?:src|image|href)=["']([^"']+\.(?:jpg|jpeg|png|svg|webp|gif))["']/gi;
const linkRegex = /(?:href|to)=["']([^"']+)["']/gi;

FILES_TO_CHECK.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(`   SKIP: ${filePath} - file not found`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const images = [...content.matchAll(imageRegex)];
  const links = [...content.matchAll(linkRegex)];

  if (images.length > 0 || links.length > 0) {
    console.log(`   Checking: ${filePath}`);
    
    images.forEach((match) => {
      const imagePath = match[1];
      if (imagePath.startsWith('/images/')) {
        const fullPath = 'public' + imagePath;
        if (!fs.existsSync(fullPath)) {
          console.log(`      404 IMAGE: ${imagePath}`);
          totalIssues++;
        }
      }
    });

    links.forEach((match) => {
      const link = match[1];
      if (link.startsWith('/') && !link.startsWith('/images/') && !link.includes('http')) {
        // Verifier si la route existe (basic check)
        if (link.includes('/admin/products/new') || 
            link.includes('/admin/products/[id]') ||
            link.includes('/terms') || 
            link.includes('/privacy') || 
            link.includes('/shipping')) {
          console.log(`      WARN: ${link} - page may not exist`);
        }
      }
    });
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\nTotal 404 issues: ${totalIssues}`);

if (totalIssues === 0) {
  console.log('\nAll images and links are valid!');
  process.exit(0);
} else {
  console.log('\nSome resources are missing.');
  process.exit(1);
}
