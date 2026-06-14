@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
title Hayatimiz Oyun - Site Temizle
cd /d "%~dp0"

echo ==========================================
echo Hayatimiz Oyun - Guvenli Site Temizleme
echo ==========================================
echo.
echo Bu klasor temizlenecek:
echo %CD%
echo.
echo Korunacaklar:
echo - .git klasoru
echo - .bat dosyalari
echo.
set /p ONAY=Devam etmek icin EVET yaz: 
if /I not "%ONAY%"=="EVET" (
  echo Islem iptal edildi.
  pause
  exit /b 0
)

echo.
echo Klasorler siliniyor...
for /d %%D in (*) do (
  if /I not "%%~nxD"==".git" (
    echo Siliniyor: %%D
    rmdir /s /q "%%D" 2>nul
  )
)

echo.
echo Dosyalar siliniyor...
for %%F in (*) do (
  if /I not "%%~xF"==".bat" (
    echo Siliniyor: %%F
    del /f /q "%%F" 2>nul
  )
)

echo.
echo Temizleme tamamlandi. .git ve .bat dosyalari korundu.
pause
