@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo =====================================
echo Hayatimiz Oyun - GitHub Gonderme
echo =====================================
echo.
where git >nul 2>nul
if errorlevel 1 (
  echo Git kurulu degil. Git kurup tekrar dene.
  pause
  exit /b
)
if not exist ".git" git init
git remote remove origin 2>nul
git remote add origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git
git branch -M main
git add .
git commit -m "v0.0.8 dosya temizligi" 2>nul
git push -u origin main
if errorlevel 1 (
  echo Gonderme basarisiz. GitHub girisi veya yetki gerekebilir.
  pause
  exit /b
)
echo GitHub gonderme tamamlandi.
pause
