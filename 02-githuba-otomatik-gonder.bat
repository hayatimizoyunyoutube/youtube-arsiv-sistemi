@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Hayatimiz Oyun - GitHub Gonder
cls
echo ========================================
echo Hayatimiz Oyun - GitHub Otomatik Gonderme
echo Repo: hayatimizoyunyoutube/youtube-arsiv-sistemi
echo Surum: v0.2.5
echo ========================================
echo.
where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git bilgisayarda bulunamadi.
  echo Git indir: https://git-scm.com/download/win
  pause
  exit /b 1
)
if not exist ".git" (
  echo Git deposu baslatiliyor...
  git init
)
git branch -M main
git remote get-url origin >nul 2>nul
if errorlevel 1 (
  git remote add origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git
) else (
  git remote set-url origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git
)
git add -A
git commit -m "v0.2.5 toplu oyun ekleme" || echo Commit atlandi, degisiklik olmayabilir.
git push -u origin main
if errorlevel 1 (
  echo.
  echo HATA: GitHub push basarisiz.
  echo GitHub girisi, internet veya repo yetkisini kontrol et.
  pause
  exit /b 1
)
echo.
echo GitHub gonderme tamamlandi.
pause
