@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ==================================================
echo  HAYATIMIZ OYUN - PROJE TEMIZLE / GIT KORU
echo ==================================================
echo.

echo Bu islem gereksiz gecici dosyalari temizler.
echo .git klasoru, README, docs ve kaynak dosyalar korunur.
echo.
pause

REM Ana dizine gec
cd /d "%~dp0"

echo.
echo [1/8] Gecici Windows dosyalari temizleniyor...
for /r %%F in (Thumbs.db desktop.ini .DS_Store) do (
  if exist "%%F" del /f /q "%%F" >nul 2>nul
)

echo [2/8] Node/Vite/Next build klasorleri temizleniyor...
for %%D in (node_modules dist build .next out .vercel .turbo coverage .cache) do (
  if exist "%%D" (
    echo  - Siliniyor: %%D
    rmdir /s /q "%%D"
  )
)

echo [3/8] Log dosyalari temizleniyor...
for /r %%F in (*.log npm-debug.log* yarn-debug.log* yarn-error.log* pnpm-debug.log*) do (
  if exist "%%F" del /f /q "%%F" >nul 2>nul
)

echo [4/8] Eski ZIP paketleri temizleniyor...
for /r %%F in (*.zip *.rar *.7z) do (
  if exist "%%F" del /f /q "%%F" >nul 2>nul
)

echo [5/8] Ortam dosyalari korunuyor mu kontrol ediliyor...
if exist ".env" (
  echo  - .env bulundu: SILINMEDI.
) else (
  echo  - .env yok: sorun degil, bu surum envsiz baslangic.
)

echo [6/8] Git klasoru kontrol ediliyor...
if exist ".git" (
  echo  - .git bulundu: KORUNDU.
) else (
  echo  - .git yok: 02-githuba-gonder.bat ilk gonderimde git init yapacak.
)

echo [7/8] README ve docs kontrol ediliyor...
if exist "README.md" echo  - README.md tamam.
if exist "docs" echo  - docs klasoru tamam.

echo [8/8] Temizlik tamamlandi.
echo.
echo ==================================================
echo  TAMAM: Proje temizlendi, .git korunarak hazirlandi.
echo ==================================================
echo.
pause
