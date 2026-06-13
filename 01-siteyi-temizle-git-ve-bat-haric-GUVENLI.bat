@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"
title Hayatimiz Oyun - Guvenli Temizleme

echo ========================================
echo Hayatimiz Oyun - Guvenli Temizleme
echo ========================================
echo.
echo Bu dosya .git ve .bat dosyalarini SILMEZ.
echo Ancak diger dosya ve klasorleri siler.
echo.
echo Proje klasoru: %CD%
echo.
set /p ONAY=Devam etmek icin EVET yaz: 
if /I not "%ONAY%"=="EVET" (
  echo Islem iptal edildi.
  pause
  exit /b 0
)

for /d %%D in (*) do (
  if /I not "%%D"==".git" (
    echo Klasor siliniyor: %%D
    rmdir /s /q "%%D"
  )
)

for %%F in (*) do (
  if /I not "%%~xF"==".bat" (
    echo Dosya siliniyor: %%F
    del /f /q "%%F"
  )
)

echo.
echo BASARILI: .git ve .bat haric temizlendi.
echo.
pause
exit /b 0
