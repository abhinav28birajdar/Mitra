# GitHub Push Preparation Script
# This script helps you prepare your project for pushing to GitHub

Write-Host "🚀 MitraApp - GitHub Push Preparation" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (Test-Path ".env") {
    Write-Host "✅ .env file found (will be ignored by Git)" -ForegroundColor Green
}
else {
    Write-Host "⚠️  .env file not found - create from .env.example" -ForegroundColor Yellow
}

# Check if google-services.json exists
if (Test-Path "google-services.json") {
    Write-Host "✅ google-services.json found (will be ignored by Git)" -ForegroundColor Green
}
else {
    Write-Host "⚠️  google-services.json not found - download from Firebase Console" -ForegroundColor Yellow
}

# Check if .env.example exists
if (Test-Path ".env.example") {
    Write-Host "✅ .env.example exists (safe to commit)" -ForegroundColor Green
}
else {
    Write-Host "❌ .env.example missing - create it!" -ForegroundColor Red
}

# Check if google-services.example.json exists
if (Test-Path "google-services.example.json") {
    Write-Host "✅ google-services.example.json exists (safe to commit)" -ForegroundColor Green
}
else {
    Write-Host "⚠️  google-services.example.json missing" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🔍 Checking for sensitive files in Git..." -ForegroundColor Cyan

# Check if sensitive files are tracked by Git
$sensitiveFiles = @(".env", "google-services.json", "GoogleService-Info.plist")
$trackedSensitiveFiles = @()

foreach ($file in $sensitiveFiles) {
    try {
        $null = git ls-files --error-unmatch $file 2>&1
        if ($LASTEXITCODE -eq 0) {
            $trackedSensitiveFiles += $file
        }
    }
    catch {
        # File not tracked, which is good
    }
}

if ($trackedSensitiveFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "⚠️  WARNING: Sensitive files are tracked by Git!" -ForegroundColor Red
    Write-Host "The following files should be removed from Git:" -ForegroundColor Red
    foreach ($file in $trackedSensitiveFiles) {
        Write-Host "  - $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "To remove them from Git (but keep local copy):" -ForegroundColor Yellow
    foreach ($file in $trackedSensitiveFiles) {
        Write-Host "  git rm --cached $file" -ForegroundColor Yellow
    }
    Write-Host ""
}
else {
    Write-Host "✅ No sensitive files are tracked by Git" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Pre-Push Checklist:" -ForegroundColor Cyan
Write-Host "  [ ] .env is in .gitignore" -ForegroundColor White
Write-Host "  [ ] google-services.json is in .gitignore" -ForegroundColor White
Write-Host "  [ ] .env.example is committed" -ForegroundColor White
Write-Host "  [ ] google-services.example.json is committed" -ForegroundColor White
Write-Host "  [ ] ENVIRONMENT_SETUP.md is committed" -ForegroundColor White
Write-Host "  [ ] No API keys in source code" -ForegroundColor White
Write-Host "  [ ] README.md is updated" -ForegroundColor White

Write-Host ""
Write-Host "🔧 Recommended Git Commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Check status:" -ForegroundColor Yellow
Write-Host "   git status" -ForegroundColor White
Write-Host ""
Write-Host "2. Add all changes:" -ForegroundColor Yellow
Write-Host "   git add ." -ForegroundColor White
Write-Host ""
Write-Host "3. Commit changes:" -ForegroundColor Yellow
Write-Host "   git commit -m ""Enhanced UI components and auth screens with production-level improvements""" -ForegroundColor White
Write-Host ""
Write-Host "4. Push to GitHub:" -ForegroundColor Yellow
Write-Host "   git push origin main" -ForegroundColor White
Write-Host ""
Write-Host "   Or if first time:" -ForegroundColor Yellow
Write-Host "   git remote add origin <your-repo-url>" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""

Write-Host "✨ Done! Review the checklist above before pushing." -ForegroundColor Green
Write-Host ""
