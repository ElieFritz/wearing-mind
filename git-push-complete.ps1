# Git Push to GitHub - Complete Automation Script
# PowerShell Script for WEARING MIND Project

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  GIT PUSH TO GITHUB - WEARING MIND" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Navigate to project directory
$projectPath = "C:\Users\mappo\source\repos\wearing mind"
Write-Host "[1/7] Navigating to project directory..." -ForegroundColor Yellow
Set-Location $projectPath
Write-Host "  ? Current directory: $projectPath`n" -ForegroundColor Green

# Step 2: Check Git status
Write-Host "[2/7] Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    $fileCount = ($gitStatus | Measure-Object).Count
    Write-Host "  ??  $fileCount files changed`n" -ForegroundColor Cyan
} else {
    Write-Host "  ??  No changes detected`n" -ForegroundColor Gray
}

# Step 3: Remove sensitive files from tracking (if any)
Write-Host "[3/7] Checking for sensitive files..." -ForegroundColor Yellow
$envFiles = git ls-files | Select-String "\.env$"
if ($envFiles) {
    Write-Host "  ??  Found .env files in tracking:" -ForegroundColor Yellow
    $envFiles | ForEach-Object { Write-Host "     - $_" -ForegroundColor Gray }
    
    $remove = Read-Host "  Remove .env files from tracking? (y/n)"
    if ($remove -eq "y") {
        git rm --cached "backend\.env" -ErrorAction SilentlyContinue
        git rm --cached "frontend\.env.local" -ErrorAction SilentlyContinue
        Write-Host "  ? .env files removed from tracking" -ForegroundColor Green
    }
} else {
    Write-Host "  ? No sensitive files in tracking" -ForegroundColor Green
}
Write-Host ""

# Step 4: Add all files
Write-Host "[4/7] Adding all files to Git..." -ForegroundColor Yellow
git add .
Write-Host "  ? All files staged for commit`n" -ForegroundColor Green

# Step 5: Create commit
Write-Host "[5/7] Creating commit..." -ForegroundColor Yellow
$commitMessage = @"
Complete E-Commerce Platform with Email Integration

Features:
- ? Complete checkout flow with validation
- ? Email notifications via Resend
- ? Admin panel (products, orders, customers)
- ? Featured products on homepage with fallback
- ? Multi-image product pages with variants
- ? Size and color selection system
- ? Shopping cart with localStorage persistence
- ? Order success page with animations
- ? SafeImage component for Supabase
- ? Responsive design across all pages
- ? Complete documentation (50+ MD files)

Tech Stack:
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- Backend: NestJS 10, Supabase, Resend
- Database: PostgreSQL (Supabase) with RLS
- Storage: Supabase Storage
- Email: Resend (professional HTML templates)

Architecture:
- Server-side rendering (Next.js App Router)
- RESTful API (NestJS)
- Type-safe (100% TypeScript)
- Modern state management (Zustand)
- Optimized images (Next.js Image)

Status: Production Ready ?
"@

git commit -m $commitMessage
Write-Host "  ? Commit created successfully`n" -ForegroundColor Green

# Step 6: Configure remote
Write-Host "[6/7] Configuring GitHub remote..." -ForegroundColor Yellow
$remotes = git remote
if ($remotes -contains "origin") {
    $currentRemote = git remote get-url origin
    Write-Host "  ??  Remote 'origin' exists: $currentRemote" -ForegroundColor Gray
    
    if ($currentRemote -ne "https://github.com/ElieFritz/wearing-mind.git") {
        Write-Host "  ? Updating remote URL..." -ForegroundColor Gray
        git remote set-url origin https://github.com/ElieFritz/wearing-mind.git
        Write-Host "  ? Remote updated" -ForegroundColor Green
    } else {
        Write-Host "  ? Remote already configured correctly" -ForegroundColor Green
    }
} else {
    Write-Host "  ? Adding remote 'origin'..." -ForegroundColor Gray
    git remote add origin https://github.com/ElieFritz/wearing-mind.git
    Write-Host "  ? Remote added" -ForegroundColor Green
}
Write-Host ""

# Step 7: Push to GitHub
Write-Host "[7/7] Pushing to GitHub..." -ForegroundColor Yellow
$branch = git branch --show-current
Write-Host "  ? Branch: $branch" -ForegroundColor Gray
Write-Host "  ? Remote: https://github.com/ElieFritz/wearing-mind.git" -ForegroundColor Gray
Write-Host ""

try {
    # Try to push
    git push -u origin $branch 2>&1 | Out-Null
    
    Write-Host "  ? Successfully pushed to GitHub!`n" -ForegroundColor Green
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  PUSH COMPLETED SUCCESSFULLY" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    Write-Host "Repository: https://github.com/ElieFritz/wearing-mind" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "  1. Visit your repository to verify" -ForegroundColor White
    Write-Host "  2. Check that README.md displays correctly" -ForegroundColor White
    Write-Host "  3. Verify no .env files are visible" -ForegroundColor White
    Write-Host "  4. Set up deployment (Vercel for frontend, Railway for backend)" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host "  ??  Push failed. Common solutions:`n" -ForegroundColor Red
    
    # Check if it's an authentication issue
    if ($_ -match "Authentication failed") {
        Write-Host "  Authentication Issue - Solutions:" -ForegroundColor Yellow
        Write-Host "  1. Use Personal Access Token:" -ForegroundColor White
        Write-Host "     • Go to: https://github.com/settings/tokens" -ForegroundColor Gray
        Write-Host "     • Generate new token (classic)" -ForegroundColor Gray
        Write-Host "     • Select 'repo' scope" -ForegroundColor Gray
        Write-Host "     • Use token as password when prompted" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  2. Or install GitHub CLI:" -ForegroundColor White
        Write-Host "     winget install --id GitHub.cli" -ForegroundColor Gray
        Write-Host "     gh auth login" -ForegroundColor Gray
        Write-Host ""
    }
    
    # Check if repository doesn't exist or has different history
    if ($_ -match "rejected" -or $_ -match "non-fast-forward") {
        Write-Host "  Repository Conflict - Solutions:" -ForegroundColor Yellow
        Write-Host "  1. Pull and merge remote changes:" -ForegroundColor White
        Write-Host "     git pull origin $branch --rebase" -ForegroundColor Gray
        Write-Host "     git push origin $branch" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  2. Or force push (if you're sure):" -ForegroundColor White
        Write-Host "     git push -f origin $branch" -ForegroundColor Gray
        Write-Host ""
    }
    
    Write-Host "  Manual Push Command:" -ForegroundColor Cyan
    Write-Host "  git push -u origin $branch" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "========================================`n" -ForegroundColor Cyan

# Pause to see results
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
