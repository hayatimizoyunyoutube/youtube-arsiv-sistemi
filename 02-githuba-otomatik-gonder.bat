@echo off
setlocal

REM Hayatimiz Oyun - GitHub Otomatik Gonderme
REM Bu BAT dosyasi hangi klasordeyse o klasoru GitHub'a gonderir.

cd /d "%~dp0"
set "REPO_URL=https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git"
set "VERSION=v0.1.9"

echo =========================================
echo Hayatimiz Oyun - GitHub Otomatik Gonderme
echo Surum: %VERSION%
echo Klasor: %CD%
echo =========================================
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git bilgisayarda bulunamadi.
  echo Once Git kurman gerekiyor:
  echo https://git-scm.com/download/win
  echo.
  pause
  exit /b 1
)

if not exist "package.json" (
  echo HATA: Bu klasorde package.json yok.
  echo ZIP icindeki dosyalari proje klasorune cikartip bu BAT dosyasini oradan calistir.
  echo.
  pause
  exit /b 1
)

if not exist ".git" (
  echo Git baslatiliyor...
  git init
)

git branch -M main
git remote remove origin >nul 2>nul
git remote add origin "%REPO_URL%"

echo Dosyalar ekleniyor...
git add .

echo Commit olusturuluyor...
git commit -m "%VERSION% gorsel arayuz guncellemesi" 
if errorlevel 1 (
  echo Commit olusturulamadi veya yeni degisiklik yok. Devam ediliyor...
)

echo GitHub'a gonderiliyor...
git push -u origin main
if errorlevel 1 (
  echo.
  echo HATA: GitHub gonderme basarisiz oldu.
  echo GitHub girisi veya repo yetkisini kontrol et.
  echo.
  pause
  exit /b 1
)

echo.
echo GitHub gonderme tamamlandi: %VERSION%
pause
