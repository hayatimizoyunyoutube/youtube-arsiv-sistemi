@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"
title Hayatımız Oyun - 01 Temizle
cls
echo ============================================================
echo   HAYATIMIZ OYUN - 01 SITEYI TEMIZLE
echo ============================================================
echo.
echo Bu islem bu klasordeki proje dosyalarini temizler.
echo Korunanlar:
echo   - .git klasoru
echo   - .env ve .env.local dosyalari
echo   - 01-siteyi-temizle-git-ve-bat-haric.bat
echo   - 02-githuba-otomatik-gonder.bat
echo.
echo Komut yazmana gerek yok. Devam etmek icin ENTER'a bas.
echo Vazgecmek icin pencereyi kapat.
pause >nul

echo.
echo [1/2] Klasorler temizleniyor...
for /d %%D in (*) do (
  if /I not "%%D"==".git" (
    echo Siliniyor: %%D
    rmdir /s /q "%%D" 2>nul
  )
)

echo.
echo [2/2] Dosyalar temizleniyor...
for %%F in (*) do (
  set "KEEP="
  if /I "%%F"=="01-siteyi-temizle-git-ve-bat-haric.bat" set "KEEP=1"
  if /I "%%F"=="02-githuba-otomatik-gonder.bat" set "KEEP=1"
  if /I "%%F"==".env" set "KEEP=1"
  if /I "%%F"==".env.local" set "KEEP=1"
  if not defined KEEP (
    echo Siliniyor: %%F
    del /f /q "%%F" 2>nul
  )
)

echo.
echo ============================================================
echo   TEMIZLIK TAMAMLANDI
echo ============================================================
echo Simdi yeni ZIP paketinin icindeki dosyalari bu klasore cikar.
echo Sonra 02-githuba-otomatik-gonder.bat dosyasini calistir.
echo.
echo Kapatmak icin ENTER'a bas.
pause >nul
