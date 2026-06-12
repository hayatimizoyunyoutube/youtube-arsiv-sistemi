@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
title Hayatimiz Oyun - GitHub Oto

REM Bu dosya proje klasorunun icinden calisir. PROJECT_DIR ayarlamana gerek yok.
set "PROJECT_DIR=%~dp0"
set "REPO_URL=https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git"
set "BRANCH=main"
set "COMMIT_MSG=site guncellemesi"

if "%PROJECT_DIR:~-1%"=="\" set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

if not exist "%PROJECT_DIR%\" (
  echo HATA: Proje klasoru bulunamadi.
  echo BAT dosyasini proje klasorunun icine koyup tekrar calistir.
  pause
  exit /b 1
)

where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git bilgisayarda bulunamadi.
  echo Git indirip kur: https://git-scm.com/download/win
  pause
  exit /b 1
)

pushd "%PROJECT_DIR%" || (
  echo HATA: Proje klasorune girilemedi.
  pause
  exit /b 1
)

echo ============================================
echo  Hayatimiz Oyun - GitHub Otomatik Gonderme
echo ============================================
echo Proje klasoru: %CD%
echo Repo: %REPO_URL%
echo Branch: %BRANCH%
echo.

if not exist ".git\" (
  echo Git baslatiliyor...
  git init
)

git branch -M %BRANCH%

git remote get-url origin >nul 2>nul
if errorlevel 1 (
  git remote add origin %REPO_URL%
) else (
  git remote set-url origin %REPO_URL%
)

echo Dosyalar ekleniyor...
git add -A

echo Commit olusturuluyor...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
  echo Commit atlandi. Degisiklik olmayabilir.
)

echo GitHub'a gonderiliyor...
git push -u origin %BRANCH%
if errorlevel 1 (
  echo.
  echo HATA: GitHub push basarisiz oldu.
  echo Cozum:
  echo 1- GitHub Desktop ile giris yap veya git token kullan.
  echo 2- Repo yetkini kontrol et.
  echo 3- Internet baglantini kontrol et.
  popd
  pause
  exit /b 1
)

echo.
echo TAMAM: GitHub'a gonderildi.
popd
pause
