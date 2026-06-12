@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"
title Hayatımız Oyun - 02 GitHub'a Gonder
cls
echo ============================================================
echo   HAYATIMIZ OYUN - 02 GITHUB'A OTOMATIK GONDER
echo ============================================================
echo.
echo Bu dosya klasordeki mevcut dosyalari GitHub main dalina gonderir.
echo Hizli kullanim: Ac, ENTER'a bas, bitince tekrar ENTER'a bas.
echo.
set "REPO=https://github.com/hayatimizoyunyoutube/HayatimizOyunYoutubeArsivi.git"
set "DEFAULT_COMMIT=v4.0.5 temiz final tam paket"

where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git bulunamadi. Once Git for Windows kurulu olmali.
  echo Kapatmak icin ENTER'a bas.
  pause >nul
  exit /b 1
)

echo Commit mesaji yazmak istersen yaz.
echo Bos birakip ENTER'a basarsan varsayilan mesaj kullanilir:
echo %DEFAULT_COMMIT%
echo.
set /p "COMMIT_MSG=Commit mesaji: "
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=%DEFAULT_COMMIT%"

if not exist ".git" (
  echo.
  echo .git bulunamadi. Yeni git deposu olusturuluyor...
  git init
)

git config --global --add safe.directory "%CD%" >nul 2>nul
git branch -M main

git remote remove origin >nul 2>nul
git remote add origin %REPO%

echo.
echo [1/4] Dosyalar Git'e ekleniyor...
git add -A
if errorlevel 1 goto :git_error

echo.
echo [2/4] Commit olusturuluyor...
git commit -m "%COMMIT_MSG%" >nul 2>nul
if errorlevel 1 (
  git commit --allow-empty -m "%COMMIT_MSG%" >nul 2>nul
)

echo.
echo [3/4] GitHub'a force push yapiliyor...
git push -f origin main
if errorlevel 1 goto :git_error

echo.
echo [4/4] TAMAM.
echo GitHub yuklemesi bitti.
echo Vercel tarafinda Deployments ^> Redeploy ^> Clear Build Cache yap.
echo.
echo Kapatmak icin ENTER'a bas.
pause >nul
exit /b 0

:git_error
echo.
echo HATA: GitHub islemi basarisiz oldu.
echo GitHub girisi, token izni veya internet baglantisini kontrol et.
echo.
echo Kapatmak icin ENTER'a bas.
pause >nul
exit /b 1
