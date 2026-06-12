@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 1254 >nul
title Hayatimiz Oyun - GitHub Otomatik Gonder

REM ==========================================================
REM  Hayatimiz Oyun - GitHub Otomatik Gonderme
REM  Repo: https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi
REM ==========================================================

set "PROJECT_DIR=C:\Users\Mevlüt Yeni Pc\Desktop\Youtube Yayýn Hazýrlýklarý\Youtube\projeler\youtube-arsive"
set "REPO_URL=https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git"
set "BRANCH=main"

where git >nul 2>nul
if errorlevel 1 (
    echo HATA: Git bilgisayarda bulunamadi.
    echo Git indirip kur: https://git-scm.com/download/win
    echo Kurduktan sonra bilgisayari yeniden baslat ve tekrar dene.
    pause
    exit /b 1
)

if not exist "%PROJECT_DIR%\" (
    echo HATA: Proje klasoru bulunamadi:
    echo %PROJECT_DIR%
    echo.
    echo BAT dosyasini proje klasorunun icine kopyalayip tekrar calistirabilirsin.
    pause
    exit /b 1
)

cd /d "%PROJECT_DIR%" || (
    echo HATA: Proje klasorune girilemedi.
    pause
    exit /b 1
)

echo.
echo Proje klasoru:
echo %CD%
echo.

if not exist ".git\" (
    echo Git deposu yok, yeni depo baslatiliyor...
    git init
)

git remote remove origin >nul 2>nul
git remote add origin "%REPO_URL%"
git branch -M %BRANCH%

echo.
echo Degisiklikler hazirlaniyor...
git add -A

git diff --cached --quiet
if not errorlevel 1 (
    echo Gonderilecek yeni degisiklik yok.
    echo.
    pause
    exit /b 0
)

set "COMMIT_MSG=Hayatimiz Oyun site guncellemesi"
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo.
    echo HATA: Commit olusturulamadi.
    echo Git kullanici bilgileri eksik olabilir. Su komutlari bir kez calistir:
    echo git config --global user.name "Hayatimiz Oyun"
    echo git config --global user.email "mertdundar05@outlook.com"
    echo.
    pause
    exit /b 1
)

echo.
echo GitHub'a gonderiliyor...
git push -u origin %BRANCH%
if errorlevel 1 (
    echo.
    echo HATA: GitHub'a gonderilemedi.
    echo Kontrol et:
    echo 1- GitHub hesabina giris yaptin mi?
    echo 2- Repo adresi dogru mu?
    echo 3- Internet baglantisi var mi?
    echo 4- GitHub izin penceresi geldiyse onayla.
    echo.
    pause
    exit /b 1
)

echo.
echo BASARILI: Dosyalar GitHub'a gonderildi.
echo Repo: %REPO_URL%
echo Branch: %BRANCH%
echo.
pause
exit /b 0
