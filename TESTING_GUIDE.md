# PowerShell API Testing Scripts

## Scripts Available

### 1. **run-tests.ps1** (Main Menu)
Interactive menu to launch all tests.

```powershell
.\run-tests.ps1
```

**Options:**
- Quick Health Check (30 sec)
- Full API Test Suite (2 min)
- Products API Only
- Performance Benchmark
- Run All Tests

### 2. **quick-test.ps1** (Health Check)
Fast verification that backend is running.

```powershell
.\quick-test.ps1
```

Tests 5 main endpoints in seconds.

### 3. **test-api.ps1** (Complete Test Suite)
Comprehensive testing of all 23 endpoints.

```powershell
.\test-api.ps1
```

**Tests:**
- Products CRUD (8 tests)
- Orders management (6 tests)
- Customers management (7 tests)
- Creates, updates, and deletes test data
- Auto cleanup

### 4. **test-products.ps1** (Products Only)
Detailed testing of products API.

```powershell
.\test-products.ps1
```

**Tests:**
- List all products
- Get featured products
- Create product
- Update product
- Delete product
- Search & filters

### 5. **benchmark-api.ps1** (Performance)
Measures response times of all endpoints.

```powershell
.\benchmark-api.ps1
```

Runs each endpoint 5 times and shows:
- Average response time
- Min/Max times
- Performance rating

### 6. **view-data.ps1** (Live Data Viewer)
Interactive viewer for database content.

```powershell
.\view-data.ps1
```

**Views:**
- Products table
- Orders table
- Customers table
- Statistics dashboard

## Prerequisites

**Backend must be running:**
```powershell
cd backend
npm run start:dev
```

**Backend URL:** http://localhost:3001/api

## Quick Start

1. **Start backend:**
```powershell
cd backend
npm run start:dev
```

2. **Run main test menu:**
```powershell
cd ..
.\run-tests.ps1
```

3. **Or run individual tests:**
```powershell
.\quick-test.ps1          # Quick check
.\test-api.ps1            # Full suite
.\test-products.ps1       # Products only
.\benchmark-api.ps1       # Performance
.\view-data.ps1           # View data
```

## Test Results

### Success Indicators
- ? Green = Test passed
- ?? Yellow = Warning
- ? Red = Test failed

### Expected Results
- **Quick Test:** All 5 endpoints OK
- **Full Suite:** 20+ tests passing
- **Benchmark:** <200ms average response time

## Common Issues

### "Backend is not running"
```powershell
cd backend
npm run start:dev
```

### "Connection refused"
Check that backend is on port 3001:
```powershell
netstat -ano | findstr :3001
```

### Timeout errors
Increase timeout in scripts (default: 5-10 sec)

## Integration Test Workflow

The scripts test this complete workflow:

```
1. Create Product (POST)
   ?
2. Fetch Products (GET)
   ?
3. Update Stock (PUT)
   ?
4. Search/Filter (GET)
   ?
5. Delete Product (DELETE)
```

## Performance Benchmarks

**Expected response times:**
- GET /products: <100ms
- GET /products/featured: <100ms
- POST /products: <200ms
- PUT /products: <150ms
- DELETE /products: <100ms

## Automated Testing

Run all tests automatically:
```powershell
.\run-tests.ps1
# Select option 5 (Run All Tests)
```

This will execute:
1. Health check
2. Products tests
3. Performance benchmark
4. Full test suite

Total time: ~5 minutes

## Output Examples

### Quick Test Output
```
WEARING MIND - Quick API Check

  OK  Products (4 items)
  OK  Featured Products (4 items)
  OK  Orders (5 items)
  OK  Order Stats (1 items)
  OK  Customers (1 items)

Result: 5/5 endpoints working
```

### Benchmark Output
```
=== PERFORMANCE SUMMARY ===

Products List        : 85.4ms [EXCELLENT]
Featured Products    : 92.1ms [EXCELLENT]
Orders List          : 105.3ms [GOOD]
Order Stats          : 78.6ms [EXCELLENT]
Customers List       : 68.2ms [EXCELLENT]

Overall Average: 85.92 ms
```

## Advanced Usage

### Run specific test
```powershell
# Test only products creation
Invoke-RestMethod -Uri "http://localhost:3001/api/products" -Method POST -Body (@{
    name = "Test Product"
    sku = "TEST-001"
    price = 99.99
    category = "Test"
    stock = 10
} | ConvertTo-Json) -ContentType "application/json"
```

### Check backend health
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/products" -Method GET
```

### View logs in real-time
```powershell
# In backend directory
npm run start:dev
```

## Scripts Summary

| Script | Purpose | Duration | Tests |
|--------|---------|----------|-------|
| run-tests.ps1 | Main menu | N/A | All |
| quick-test.ps1 | Health check | 30s | 5 |
| test-api.ps1 | Full suite | 2min | 20+ |
| test-products.ps1 | Products | 1min | 8 |
| benchmark-api.ps1 | Performance | 2min | 5 |
| view-data.ps1 | Data viewer | N/A | N/A |

## Support

For issues or questions:
- Check backend logs
- Verify .env configuration
- Ensure Supabase is connected
- Check network connectivity

---

**Author:** WEARING MIND Team  
**Last Updated:** 2026-01-11
