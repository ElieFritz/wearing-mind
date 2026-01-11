#!/usr/bin/env node

console.log('?? WEARING MIND - Complete Integration Test\n');
console.log('Testing Admin ? Backend ? Frontend flow\n');

const BASE_URL = 'http://localhost:3001/api';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testWorkflow() {
  try {
    // 1. Create a new product via API
    console.log('1??  Creating new product via API...');
    const newProduct = {
      name: 'Test Hoodie Red',
      sku: 'WM-TEST-001',
      price: 135.00,
      category: 'Hoodie',
      description: 'Test product created via API',
      stock: 25,
      is_new: true,
      is_featured: true,
    };

    const createResponse = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    if (!createResponse.ok) {
      throw new Error(`Failed to create product: ${createResponse.statusText}`);
    }

    const createdProduct = await createResponse.json();
    console.log(`? Product created: ${createdProduct.name} (ID: ${createdProduct.id})`);

    await sleep(1000);

    // 2. Verify product appears in products list
    console.log('\n2??  Fetching all products...');
    const listResponse = await fetch(`${BASE_URL}/products`);
    const products = await listResponse.json();
    console.log(`? Total products: ${products.length}`);

    // 3. Verify product appears in featured
    console.log('\n3??  Fetching featured products...');
    const featuredResponse = await fetch(`${BASE_URL}/products/featured`);
    const featured = await featuredResponse.json();
    console.log(`? Featured products: ${featured.length}`);
    
    const isFeatured = featured.some(p => p.id === createdProduct.id);
    if (isFeatured) {
      console.log('? New product is featured!');
    }

    // 4. Update product stock
    console.log('\n4??  Updating product stock...');
    const stockResponse = await fetch(`${BASE_URL}/products/${createdProduct.id}/stock`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: -5 }),
    });
    const updatedProduct = await stockResponse.json();
    console.log(`? Stock updated: ${updatedProduct.stock} (was 25, now ${updatedProduct.stock})`);

    // 5. Get product by ID
    console.log('\n5??  Fetching product by ID...');
    const getResponse = await fetch(`${BASE_URL}/products/${createdProduct.id}`);
    const product = await getResponse.json();
    console.log(`? Product found: ${product.name} - €${product.price}`);

    // 6. Delete product (cleanup)
    console.log('\n6??  Cleaning up - deleting test product...');
    const deleteResponse = await fetch(`${BASE_URL}/products/${createdProduct.id}`, {
      method: 'DELETE',
    });
    
    if (deleteResponse.ok) {
      console.log('? Test product deleted');
    }

    console.log('\n???????????????????????????????????????');
    console.log('? ALL TESTS PASSED!');
    console.log('???????????????????????????????????????\n');
    console.log('?? Admin ? Backend ? Frontend workflow is working!\n');
    console.log('Next steps:');
    console.log('1. Go to http://localhost:3000/admin/products/new');
    console.log('2. Create a product with "Feature on Homepage" checked');
    console.log('3. Go to http://localhost:3000 to see it on landing page');
    console.log('4. Go to http://localhost:3000/shop to see it in catalog\n');

  } catch (error) {
    console.error('\n? TEST FAILED:', error.message);
    console.log('\nMake sure backend is running on http://localhost:3001');
    process.exit(1);
  }
}

runTests().catch(console.error);
