@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"
title Hayatimiz Oyun - GitHub Otomatik Gonderme

echo ========================================
echo Hayatimiz Oyun - GitHub Otomatik Gonderme
echo ========================================
echo.
echo Proje klasoru: %CD%
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git bilgisayarda bulunamadi.
  echo Git kur: https://git-scm.com/download/win
  echo Kurulumdan sonra CMD/Terminali kapatip yeniden ac.
  echo.
  pause
  exit /b 1
)

if not exist "index.html" (
  echo HATA: Bu BAT dosyasi proje ana klasorunde degil.
  echo BAT dosyasini index.html, package.json, vercel.json ile ayni klasore koy.
  echo.
  pause
  exit /b 1
)

if not exist ".git" (
  echo Git reposu yok, baslatiliyor...
  git init
)

git branch -M main

git remote remove origin >nul 2>nul
git remote add origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git

echo.
echo Git durumu kontrol ediliyor...
git status --short

echo.
echo Dosyalar ekleniyor...
git add -A

echo.
echo Commit olusturuluyor...
git commit -m "site guncelleme" >nul 2>nul
if errorlevel 1 (
  echo Commit atlandi veya degisiklik yok.
) else (
  echo Commit olusturuldu.
)

echo.
echo GitHub'a gonderiliyor...
git push -u origin main
if errorlevel 1 (
  echo.
  echo HATA: GitHub push basarisiz.
  echo Sebep genelde GitHub girisi/token veya internet baglantisi olur.
  echo GitHub Desktop ile giris yap veya Git Credential Manager penceresini onayla.
  echo.
  pause
  exit /b 1
)

echo.
echo BASARILI: Dosyalar GitHub'a gonderildi.
echo Repo: https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi
echo.
pause
exit /b 0
