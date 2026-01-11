# Script de telechargement des images produits et sections pour WEARING MIND
# Images libres de droits depuis Unsplash

Write-Host "?? Telechargement des images WEARING MIND - Sections completes..." -ForegroundColor Cyan
Write-Host ""

# Creer les dossiers necessaires
$folders = @(
    "frontend\public\images\products",
    "frontend\public\images\brand",
    "frontend\public\images\collections"
)

foreach ($folder in $folders) {
    if (-Not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "? Dossier cree: $folder" -ForegroundColor Green
    }
}

Write-Host ""

# Images de produits (FeaturedCollection)
Write-Host "?? Images Produits..." -ForegroundColor Yellow
$productImages = @{
    "hoodie-black.jpg" = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=85"
    "tee-white.jpg" = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85"
    "sweat-oversized.jpg" = "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=85"
    "hoodie-grey.jpg" = "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800&q=85"
}

# Images de brand story
Write-Host "??? Images Brand Story..." -ForegroundColor Yellow
$brandImages = @{
    "craftsmanship.jpg" = "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200&q=85"
    "sustainability.jpg" = "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&q=85"
}

# Image de collection Drop
Write-Host "? Image Drop Collection..." -ForegroundColor Yellow
$collectionImages = @{
    "chaos-theory.jpg" = "https://images.unsplash.com/photo-1558769132-cb1aea8c732a?w=1920&q=85"
}

$totalDownloads = 0
$totalErrors = 0

# Fonction de telechargement
function Download-Image {
    param($url, $outputPath, $name)
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -ErrorAction Stop
        $fileSize = (Get-Item $outputPath).Length / 1KB
        $fileSizeMB = [Math]::Round($fileSize / 1024, 2)
        Write-Host "   ? $name ($fileSizeMB MB)" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "   ? $name - Erreur" -ForegroundColor Red
        return $false
    }
}

# Telecharger images produits
foreach ($fileName in $productImages.Keys) {
    $url = $productImages[$fileName]
    $outputPath = "frontend\public\images\products\$fileName"
    
    if (Download-Image $url $outputPath $fileName) {
        $totalDownloads++
    } else {
        $totalErrors++
    }
}

Write-Host ""

# Telecharger images brand
foreach ($fileName in $brandImages.Keys) {
    $url = $brandImages[$fileName]
    $outputPath = "frontend\public\images\brand\$fileName"
    
    if (Download-Image $url $outputPath $fileName) {
        $totalDownloads++
    } else {
        $totalErrors++
    }
}

Write-Host ""

# Telecharger image collection
foreach ($fileName in $collectionImages.Keys) {
    $url = $collectionImages[$fileName]
    $outputPath = "frontend\public\images\collections\$fileName"
    
    if (Download-Image $url $outputPath $fileName) {
        $totalDownloads++
    } else {
        $totalErrors++
    }
}

Write-Host ""
Write-Host "????????????????????????????????????????????" -ForegroundColor Cyan
Write-Host "?? Resume:" -ForegroundColor Cyan
Write-Host "   ? Images telechargees: $totalDownloads" -ForegroundColor Green
if ($totalErrors -gt 0) {
    Write-Host "   ? Erreurs: $totalErrors" -ForegroundColor Red
}
Write-Host "????????????????????????????????????????????" -ForegroundColor Cyan
Write-Host ""

if ($totalDownloads -gt 0) {
    Write-Host "?? Images telechargees avec succes!" -ForegroundColor Green
    Write-Host ""
    Write-Host "?? Prochaines etapes:" -ForegroundColor Yellow
    Write-Host "   1. Les composants seront mis a jour automatiquement" -ForegroundColor White
    Write-Host "   2. Rafraichissez http://localhost:3000" -ForegroundColor White
    Write-Host ""
    Write-Host "?? Images produits: frontend\public\images\products\" -ForegroundColor Cyan
    Write-Host "??? Images brand: frontend\public\images\brand\" -ForegroundColor Cyan
    Write-Host "? Images collections: frontend\public\images\collections\" -ForegroundColor Cyan
}

Write-Host ""
