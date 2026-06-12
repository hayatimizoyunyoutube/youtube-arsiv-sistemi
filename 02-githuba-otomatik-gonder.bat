@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"
title Hayatimiz Oyun - GitHub Oto Gonder

echo ========================================
echo Hayatimiz Oyun - GitHub Otomatik Gonderme
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
git commit -m "v0.1.0 arsiv sistemi baslangici" 
if errorlevel 1 (
  echo Commit atlandi veya degisiklik yok. Gonderme devam ediyor.
)

git push -u origin main
if errorlevel 1 (
  echo.
  echo HATA: GitHub gonderme basarisiz.
  echo GitHub login, internet veya repo yetkisini kontrol et.
  pause
  exit /b 1
)

echo.
echo GitHub gonderme tamamlandi.
pause
