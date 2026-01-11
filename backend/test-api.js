#!/usr/bin/env node

console.log('?? Testing WEARING MIND Backend APIs...\n');

const BASE_URL = 'http://localhost:3001/api';

async function testEndpoint(method, endpoint, description, body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    
    console.log(`? ${description}`);
    console.log(`   Status: ${response.status}`);
    console.log(`   Data: ${JSON.stringify(data).substring(0, 100)}...`);
    return { success: true, data };
  } catch (error) {
    console.log(`? ${description}`);
    console.log(`   Error: ${error.message}`);
    return { success: false, error };
  }
}

async function runTests() {
  console.log('?? Products API\n');
  await testEndpoint('GET', '/products', 'Get all products');
  await testEndpoint('GET', '/products/featured', 'Get featured products');
  
  console.log('\n?? Orders API\n');
  await testEndpoint('GET', '/orders', 'Get all orders');
  await testEndpoint('GET', '/orders/stats', 'Get order stats');
  
  console.log('\n?? Customers API\n');
  await testEndpoint('GET', '/customers', 'Get all customers');
  
  console.log('\n? All tests completed!\n');
}

runTests().catch(console.error);
