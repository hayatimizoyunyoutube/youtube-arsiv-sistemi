@echo off
chcp 65001 >nul
setlocal

set VERSION=v1.3.2
set REPO_URL=https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git

echo ========================================
echo Hayatimiz Oyun - GitHub'a Gonder - %VERSION%
echo Repo: %REPO_URL%
echo ========================================
echo.

git --version >nul 2>&1
if errorlevel 1 (
  echo Git bulunamadi. Once Git for Windows kurulmali.
  echo Indirme: https://git-scm.com/download/win
  pause
  exit /b 1
)

if not exist package.json (
  echo package.json bulunamadi. Bu BAT dosyasini proje klasorunun icinde calistir.
  pause
  exit /b 1
)

if not exist .git (
  echo .git bulunamadi. Git baslatiliyor...
  git init
)

git branch -M main

git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo Guvenlik kontrolu yapiliyor...
git rm --cached .env >nul 2>&1
git rm --cached .env.local >nul 2>&1
git rm --cached .env.production >nul 2>&1
git rm --cached .env.development >nul 2>&1
git rm -r --cached node_modules >nul 2>&1
git rm -r --cached dist >nul 2>&1

echo Dosyalar ekleniyor...
git add .

echo Commit olusturuluyor...
git commit -m "%VERSION% youtube bolum cekme altyapisi"
if errorlevel 1 (
  echo Commit olusturulamadi. Degisiklik yoksa bu normal olabilir.
)

echo GitHub'a gonderiliyor...
git push -u origin main
if errorlevel 1 (
  echo Normal push basarisiz oldu.
  choice /C EH /M "E=Force push dene, H=Iptal"
  if errorlevel 2 exit /b 1
  git push -f origin main
)

echo.
echo GitHub gonderimi tamamlandi. Vercel otomatik deploy baslatmali.
pause
