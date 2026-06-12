@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
set REPO_URL=https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git
set COMMIT_MSG=Hayatimiz Oyun site v0.0.7 guncellemesi

echo =====================================
echo Hayatimiz Oyun - GitHub Gonderme
echo =====================================
echo.
where git >nul 2>nul
if errorlevel 1 (
  echo HATA: Git kurulu degil veya PATH icinde yok.
  pause
  exit /b 1
)
if not exist ".git" (
  git init
)
git branch -M main
git remote get-url origin >nul 2>nul
if errorlevel 1 (
  git remote add origin %REPO_URL%
) else (
  git remote set-url origin %REPO_URL%
)
git add -A
git commit -m "%COMMIT_MSG%" || echo Commit atlanmis olabilir, degisiklik yoksa normaldir.
git push -u origin main
if errorlevel 1 (
  echo.
  echo HATA: GitHub gonderme basarisiz. GitHub girisi veya repo yetkisini kontrol et.
  pause
  exit /b 1
)
echo.
echo Basarili: GitHub'a gonderildi.
pause
