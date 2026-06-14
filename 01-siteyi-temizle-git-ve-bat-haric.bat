@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Hayatimiz Oyun - Guvenli Temizleme

echo ========================================
echo Hayatimiz Oyun - Guvenli Temizleme
echo Silinmeyecekler: .git klasoru ve .bat dosyalari
echo ========================================
echo.

echo Bu klasor temizlenecek:
echo %CD%
echo.
choice /C EH /N /M "Devam etmek icin E, iptal icin H bas: "
if errorlevel 2 (
  echo Islem iptal edildi.
  pause
  exit /b 0
)

for /d %%D in (*) do (
  if /I not "%%~nxD"==".git" (
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
echo Temizleme tamamlandi. .git ve .bat dosyalari korundu.
pause
