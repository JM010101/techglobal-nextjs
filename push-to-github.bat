@echo off
echo ========================================
echo    TechGlobal Next.js - GitHub Push
echo ========================================
echo.

echo Step 1: Checking git status...
git status

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Committing changes...
git commit -m "Update TechGlobal Next.js website with contact form and email functionality"

echo.
echo Step 4: Pushing to GitHub...
echo Please make sure you have:
echo 1. Created the repository on GitHub.com
echo 2. Have your GitHub credentials ready
echo.
pause

git push -u origin main

echo.
echo ========================================
echo    Push Complete!
echo ========================================
pause
