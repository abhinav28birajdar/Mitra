@echo off
echo.
echo ========================================
echo MitraApp - GitHub Push Preparation
echo ========================================
echo.

REM Check if .env exists
if exist ".env" (
    echo [OK] .env file found ^(will be ignored by Git^)
) else (
    echo [WARNING] .env file not found - create from .env.example
)

REM Check if google-services.json exists
if exist "google-services.json" (
    echo [OK] google-services.json found ^(will be ignored by Git^)
) else (
    echo [WARNING] google-services.json not found - download from Firebase Console
)

REM Check if .env.example exists
if exist ".env.example" (
    echo [OK] .env.example exists ^(safe to commit^)
) else (
    echo [ERROR] .env.example missing - create it!
)

REM Check if google-services.example.json exists
if exist "google-services.example.json" (
    echo [OK] google-services.example.json exists ^(safe to commit^)
) else (
    echo [WARNING] google-services.example.json missing
)

echo.
echo ========================================
echo Pre-Push Checklist:
echo ========================================
echo [ ] .env is in .gitignore
echo [ ] google-services.json is in .gitignore
echo [ ] .env.example is committed
echo [ ] google-services.example.json is committed
echo [ ] ENVIRONMENT_SETUP.md is committed
echo [ ] No API keys in source code
echo [ ] README.md is updated
echo.

echo ========================================
echo Recommended Git Commands:
echo ========================================
echo.
echo 1. Check status:
echo    git status
echo.
echo 2. Add all changes:
echo    git add .
echo.
echo 3. Commit changes:
echo    git commit -m "Enhanced UI components and auth screens with production-level improvements"
echo.
echo 4. Push to GitHub:
echo    git push origin main
echo.
echo    Or if first time:
echo    git remote add origin ^<your-repo-url^>
echo    git push -u origin main
echo.
echo ========================================
echo Done! Review the checklist above.
echo ========================================
echo.
pause
