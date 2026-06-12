@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Hayatimiz Oyun - GitHub Otomatik Gonderme
set "REPO_URL=https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git"
set "BRANCH=main"
echo.
echo ================================
echo  GitHub Otomatik Gonderme
echo ================================
where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git bulunamadi. https://git-scm.com/download/win adresinden kur.
  pause
  exit /b 1
)
if not exist ".git" (
  git init
)
git remote remove origin >nul 2>nul
git remote add origin "%REPO_URL%"
git branch -M %BRANCH%
git add -A
git commit -m "Hayatimiz Oyun site guncelleme v0.0.8 build fix" || echo Commit icin yeni degisiklik olmayabilir.
git push -u origin %BRANCH%
echo.
echo GitHub gonderme islemi tamamlandi.
pause
