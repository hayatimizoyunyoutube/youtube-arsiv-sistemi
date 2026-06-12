@echo off
setlocal
title Hayatimiz Oyun - GitHub Oto Gonder
cd /d "%~dp0"
echo =====================================
echo GitHub Otomatik Gonderme
echo =====================================
echo.
where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git bulunamadi. Git kur: https://git-scm.com/download/win
  pause
  exit /b 1
)
if not exist ".git" (
  git init
  git branch -M main
)
git remote remove origin >nul 2>nul
git remote add origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git
git add .
git commit -m "v0.0.9 temel test surumu" || echo Commit olusturulmadi, degisiklik olmayabilir.
git branch -M main
git push -u origin main
pause
