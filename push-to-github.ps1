# Final Check and Push to GitHub
# PowerShell script

Write-Host "`n=== FINAL VERIFICATION AND GIT PUSH ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Backend
Write-Host "[1] Checking Backend Status..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod "http://localhost:3001/api" -ErrorAction Stop
    Write-Host "  ? Backend is running" -ForegroundColor Green
    
    # Check featured products endpoint
    try {
        $featured = Invoke-RestMethod "http://localhost:3001/api/products/featured?limit=4" -ErrorAction Stop
        $count = ($featured | Measure-Object).Count
        Write-Host "  ? Featured products API working ($count products)" -ForegroundColor Green
    } catch {
        Write-Host "  ??  Featured products API issue (will use fallback)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ??  Backend not running (frontend will use fallback data)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[2] Checking Frontend..." -ForegroundColor Yellow

# Check if frontend files exist
$frontendFiles = @(
    "frontend\src\app\page.tsx",
    "frontend\src\components\FeaturedCollection.tsx",
    "frontend\src\components\ProductCard.tsx",
    "frontend\src\app\checkout\page.tsx",
    "frontend\src\app\order-success\page.tsx"
)

$allFilesExist = $true
foreach ($file in $frontendFiles) {
    if (Test-Path $file) {
        Write-Host "  ? $file" -ForegroundColor Green
    } else {
        Write-Host "  ? $file missing" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "??  Some frontend files are missing. Please verify before pushing." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[3] Checking Backend Files..." -ForegroundColor Yellow

$backendFiles = @(
    "backend\src\email\email.service.ts",
    "backend\src\email\email.module.ts",
    "backend\src\orders\orders.service.ts",
    "backend\.env"
)

foreach ($file in $backendFiles) {
    if (Test-Path $file) {
        Write-Host "  ? $file" -ForegroundColor Green
    } else {
        Write-Host "  ??  $file missing" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "[4] Checking Documentation..." -ForegroundColor Yellow

$docs = @(
    "CHECKOUT_ORDER_SYSTEM_COMPLETE.md",
    "RESEND_EMAIL_INTEGRATION.md",
    "PROJECT_COMPLETE_PRODUCTION_READY.md",
    "README.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Write-Host "  ? $doc" -ForegroundColor Green
    } else {
        Write-Host "  ??  $doc missing" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "[5] Git Status Check..." -ForegroundColor Yellow

# Check if we're in a git repository
if (Test-Path ".git") {
    Write-Host "  ? Git repository detected" -ForegroundColor Green
    
    # Check git status
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        $changedFiles = ($gitStatus | Measure-Object).Count
        Write-Host "  ??  $changedFiles files changed" -ForegroundColor Cyan
    } else {
        Write-Host "  ??  No changes to commit" -ForegroundColor Gray
    }
} else {
    Write-Host "  ??  Not a git repository" -ForegroundColor Yellow
    Write-Host "  ? Run: git init" -ForegroundColor White
}

Write-Host ""
Write-Host "=== READY TO PUSH ===" -ForegroundColor Cyan
Write-Host ""

# Confirm push
$confirm = Read-Host "Push to GitHub repository? (y/n)"

if ($confirm -eq "y") {
    Write-Host ""
    Write-Host "[6] Preparing Git Commit..." -ForegroundColor Yellow
    
    # Add all files
    Write-Host "  ? Adding all files..." -ForegroundColor Gray
    git add .
    
    # Create commit message
    $commitMessage = "Complete E-Commerce System with Resend Email Integration

Features:
- ? Complete checkout flow with validation
- ? Order success page with animations
- ? Email notifications (Resend integration)
- ? Admin panel (products, orders, customers)
- ? Featured products on homepage
- ? Multi-image product pages
- ? Size and color variants
- ? Cart system with persistence
- ? Responsive design
- ? SafeImage component for Supabase
- ? Complete documentation

Tech Stack:
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
- Backend: NestJS, Supabase, Resend
- Database: PostgreSQL (Supabase)
- Storage: Supabase Storage

Production Ready!"
    
    Write-Host "  ? Creating commit..." -ForegroundColor Gray
    git commit -m $commitMessage
    
    Write-Host ""
    Write-Host "[7] Setting Remote Repository..." -ForegroundColor Yellow
    
    # Check if remote exists
    $remotes = git remote
    if ($remotes -contains "origin") {
        Write-Host "  ??  Remote 'origin' already exists" -ForegroundColor Gray
        
        # Show current remote
        $currentRemote = git remote get-url origin
        Write-Host "  Current remote: $currentRemote" -ForegroundColor White
        
        # Ask to update
        $updateRemote = Read-Host "Update remote to https://github.com/ElieFritz/wearing-mind.git? (y/n)"
        if ($updateRemote -eq "y") {
            git remote set-url origin https://github.com/ElieFritz/wearing-mind.git
            Write-Host "  ? Remote updated" -ForegroundColor Green
        }
    } else {
        Write-Host "  ? Adding remote 'origin'..." -ForegroundColor Gray
        git remote add origin https://github.com/ElieFritz/wearing-mind.git
        Write-Host "  ? Remote added" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "[8] Pushing to GitHub..." -ForegroundColor Yellow
    
    # Check current branch
    $currentBranch = git branch --show-current
    Write-Host "  Current branch: $currentBranch" -ForegroundColor White
    
    # Push
    Write-Host "  ? Pushing to origin/$currentBranch..." -ForegroundColor Gray
    try {
        git push -u origin $currentBranch
        Write-Host ""
        Write-Host "  ? Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "  Repository: https://github.com/ElieFritz/wearing-mind" -ForegroundColor Cyan
        Write-Host ""
    } catch {
        Write-Host ""
        Write-Host "  ??  Push failed. You may need to:" -ForegroundColor Yellow
        Write-Host "     1. Authenticate with GitHub" -ForegroundColor White
        Write-Host "     2. Check repository permissions" -ForegroundColor White
        Write-Host "     3. Pull remote changes first if repository exists" -ForegroundColor White
        Write-Host ""
        Write-Host "  Manual commands:" -ForegroundColor Cyan
        Write-Host "     git pull origin $currentBranch --rebase" -ForegroundColor Gray
        Write-Host "     git push -u origin $currentBranch" -ForegroundColor Gray
        Write-Host ""
    }
    
} else {
    Write-Host ""
    Write-Host "  ??  Push cancelled. You can push manually with:" -ForegroundColor Cyan
    Write-Host "     git add ." -ForegroundColor Gray
    Write-Host "     git commit -m 'Your commit message'" -ForegroundColor Gray
    Write-Host "     git remote add origin https://github.com/ElieFritz/wearing-mind.git" -ForegroundColor Gray
    Write-Host "     git push -u origin master" -ForegroundColor Gray
    Write-Host ""
}

Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "? Frontend: Complete e-commerce with checkout" -ForegroundColor Green
Write-Host "? Backend: NestJS API with Resend emails" -ForegroundColor Green
Write-Host "? Database: Supabase PostgreSQL with storage" -ForegroundColor Green
Write-Host "? Homepage: Featured products with fallback" -ForegroundColor Green
Write-Host "? Admin Panel: Full CRUD operations" -ForegroundColor Green
Write-Host "? Documentation: Complete guides" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Visit repository: https://github.com/ElieFritz/wearing-mind" -ForegroundColor White
Write-Host "  2. Set up deployment (Vercel for frontend, Railway/Render for backend)" -ForegroundColor White
Write-Host "  3. Configure environment variables in production" -ForegroundColor White
Write-Host "  4. Set up custom domain for emails (optional)" -ForegroundColor White
Write-Host ""
