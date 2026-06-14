@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Hayatimiz Oyun - Guvenli Temizleme

echo ========================================
echo Hayatimiz Oyun - Guvenli Temizleme
echo Korunanlar: .git klasoru ve .bat dosyalari
echo ========================================
echo.
set /p ONAY=Bu klasor temizlenecek. Devam etmek icin EVET yaz: 
if /I not "%ONAY%"=="EVET" (
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
