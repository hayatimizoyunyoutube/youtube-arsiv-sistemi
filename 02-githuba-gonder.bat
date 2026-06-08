@echo off
chcp 65001 >nul
setlocal

echo ========================================
echo Hayatimiz Oyun - GitHub'a Gonder
echo Repo: https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git
echo ========================================
echo.

git --version >nul 2>&1
if errorlevel 1 (
  echo Git bulunamadi. Once Git kurulu olmali.
  pause
  exit /b 1
)

if not exist .git (
  echo .git bulunamadi, yeni git baslatiliyor...
  git init
  git branch -M main
)

git remote remove origin >nul 2>&1
git remote add origin https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git

echo Guvenlik kontrolu: .env.local GitHub'a gonderilmeyecek.
git rm --cached .env.local >nul 2>&1

git add .
git commit -m "v1.1.3 supabase kategori auth admin iskeleti" 
if errorlevel 1 (
  echo Commit olusturulamadi. Degisiklik yoksa bu normal olabilir.
)

git push -u origin main
if errorlevel 1 (
  echo Normal push basarisiz oldu. Force push denensin mi?
  choice /C EH /M "E=Evet force push, H=Hayir"
  if errorlevel 2 exit /b 1
  git push -f origin main
)

echo.
echo GitHub gonderimi tamamlandi. Vercel otomatik deploy baslatmali.
pause
