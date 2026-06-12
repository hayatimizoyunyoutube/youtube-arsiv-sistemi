@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
title Hayatimiz Oyun - GitHub Otomatik Gonderme

set "REPO_URL=https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git"
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%" || (
  echo HATA: Proje klasorune girilemedi.
  pause
  exit /b 1
)

where git >nul 2>nul || (
  echo HATA: Git bilgisayarda bulunamadi.
  echo Git indirip kur: https://git-scm.com/download/win
  pause
  exit /b 1
)

echo ============================================
echo  Hayatimiz Oyun - GitHub Otomatik Gonderme
echo ============================================
echo Proje klasoru: %CD%
echo.

if not exist ".git" (
  git init || goto hata
)

git branch -M main || goto hata
git remote remove origin >nul 2>nul
git remote add origin "%REPO_URL%" || goto hata

git add . || goto hata
git commit -m "site v0.0.4 guncellemesi" || echo Commit icin yeni degisiklik olmayabilir, devam ediliyor.
git push -u origin main || goto hata

echo.
echo TAMAM: GitHub gonderme islemi bitti.
pause
exit /b 0

:hata
echo.
echo HATA: GitHub gonderme tamamlanamadi.
echo GitHub girisi, repo yetkisi veya internet baglantisini kontrol et.
pause
exit /b 1
