@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
title Hayatimiz Oyun - GitHub Otomatik Gonder
cd /d "%~dp0"

echo ==========================================
echo Hayatimiz Oyun - GitHub Otomatik Gonderme
echo ==========================================
echo.
echo Proje klasoru:
echo %CD%
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git bilgisayarda bulunamadi.
  echo Git indirip kur: https://git-scm.com/download/win
  echo Kurduktan sonra bilgisayari yeniden baslat ve tekrar dene.
  pause
  exit /b 1
)

if not exist ".git" (
  echo Git deposu bulunamadi. Yeni depo baslatiliyor...
  git init
)

git branch -M main

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  git remote add origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git
) else (
  git remote set-url origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git
)

echo.
echo Dosyalar ekleniyor...
git add -A

echo.
echo Commit olusturuluyor...
git commit -m "Hayatimiz Oyun site guncellemesi" 
if errorlevel 1 (
  echo Commit atlanmis olabilir. Degisiklik yoksa bu normaldir.
)

echo.
echo GitHub'a gonderiliyor...
git push -u origin main
if errorlevel 1 (
  echo.
  echo HATA: GitHub'a gonderilemedi.
  echo 1- GitHub girisi yapili mi kontrol et.
  echo 2- Repo adresi dogru mu kontrol et.
  echo 3- Internet baglantisini kontrol et.
  echo 4- Git Credential Manager acilirsa GitHub hesabinla giris yap.
  pause
  exit /b 1
)

echo.
echo Basarili: Dosyalar GitHub'a gonderildi.
pause
