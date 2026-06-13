@echo off
setlocal EnableExtensions DisableDelayedExpansion
cd /d "%~dp0"
title Hayatimiz Oyun - GitHub Oto

echo ========================================
echo GitHub Otomatik Gonderme
echo ========================================
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git bilgisayarda bulunamadi.
  echo Git indirip kur: https://git-scm.com/download/win
  pause
  exit /b 1
)

if not exist ".git" (
  git init
)

git remote remove origin >nul 2>nul
git remote add origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git

git branch -M main
git add .
git commit -m "v0.1.1 oyun detay sayfasi" || echo Commit atlanmis olabilir.
git push -u origin main

echo.
echo GitHub gonderme islemi bitti.
pause
