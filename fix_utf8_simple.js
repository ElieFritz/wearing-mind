const fs = require('fs');
const path = require('path');

console.log('=== Correction UTF-8 - WEARING MIND ===\n');

const FILES_TO_FIX = [
  'frontend/src/components/ProductCard.tsx',
  'frontend/src/components/FeaturedCollection.tsx',
  'frontend/src/components/BrandStory.tsx',
  'frontend/src/components/DropCountdown.tsx',
  'frontend/src/app/shop/page.tsx',
  'frontend/src/app/shop/[slug]/page.tsx',
  'frontend/src/app/cart/page.tsx',
  'frontend/src/app/checkout/page.tsx',
  'frontend/src/app/admin/layout.tsx',
  'frontend/src/app/admin/page.tsx',
  'frontend/src/app/admin/products/page.tsx',
  'frontend/src/app/admin/products/new/page.tsx',
  'frontend/src/app/admin/orders/page.tsx',
  'frontend/src/app/admin/customers/page.tsx',
  'frontend/src/app/admin/analytics/page.tsx',
  'frontend/src/app/admin/settings/page.tsx',
  'frontend/src/app/terms/page.tsx',
  'frontend/src/app/privacy/page.tsx',
  'frontend/src/app/shipping/page.tsx',
];

let totalFixed = 0;

FILES_TO_FIX.forEach((filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} (not found)`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Fix replacement character (U+FFFD) to Euro
    content = content.replace(/\uFFFD/g, '\u20AC');

    // Fix any escaped quotes
    content = content.replace(/\\"/g, '"');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`FIXED: ${filePath}`);
      totalFixed++;
    } else {
      console.log(`OK: ${filePath}`);
    }
  } catch (error) {
    console.log(`ERROR: ${filePath} - ${error.message}`);
  }
});

console.log(`\n=== Total files fixed: ${totalFixed} ===\n`);
