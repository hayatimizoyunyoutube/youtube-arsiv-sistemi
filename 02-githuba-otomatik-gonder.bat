@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Hayatimiz Oyun - GitHub Otomatik Gonderme

echo ========================================
echo Hayatimiz Oyun - GitHub Otomatik Gonderme
echo Surum: v0.2.2
echo Repo: https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi
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
  echo Git deposu baslatiliyor...
  git init
)

git remote remove origin >nul 2>nul
git remote add origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git

git branch -M main
git add -A
git commit -m "v0.2.2 supabase kapak sistemi"
if errorlevel 1 (
  echo Commit atlandi veya degisiklik yok.
)

git push -u origin main
if errorlevel 1 (
  echo.
  echo HATA: GitHub push basarisiz.
  echo GitHub girisi, repo yetkisi veya internet baglantisini kontrol et.
  pause
  exit /b 1
)

echo.
echo GitHub gonderme tamamlandi.
pause
