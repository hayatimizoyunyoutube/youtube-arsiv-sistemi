@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
title Hayatimiz Oyun - GitHub Otomatik Gonderme
cd /d "%~dp0"

echo.
echo ===============================================
echo  HAYATIMIZ OYUN - GITHUB GONDERME
echo ===============================================
echo.
where git >nul 2>nul
if errorlevel 1 (
  echo Git bulunamadi. Once Git for Windows kur.
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
git commit -m "Hayatimiz Oyun site guncellemesi v0.0.6" || echo Commit icin yeni degisiklik olmayabilir.
git push -u origin main
if errorlevel 1 (
  echo.
  echo Gonderme basarisiz oldu. GitHub girisi, repo yetkisi veya internet baglantisini kontrol et.
  pause
  exit /b 1
)
echo.
echo GitHub gonderme tamamlandi.
pause
