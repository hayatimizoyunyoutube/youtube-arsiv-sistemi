@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Hayatimiz Oyun - Site Temizle
echo.
echo ================================
echo  Hayatimiz Oyun - Guvenli Temizlik
echo ================================
echo Bu klasor temizlenecek: %CD%
echo Korunacaklar: .git klasoru ve .bat dosyalari
echo.
set /p ONAY=Devam etmek icin EVET yaz: 
if /I not "%ONAY%"=="EVET" (
  echo Islem iptal edildi.
  pause
  exit /b 0
)
for /d %%D in (*) do (
  if /I not "%%~nxD"==".git" (
    echo Klasor siliniyor: %%D
    rmdir /s /q "%%D" 2>nul
  )
)
for %%F in (*) do (
  if /I not "%%~xF"==".bat" (
    echo Dosya siliniyor: %%F
    del /f /q "%%F" 2>nul
  )
)
echo.
echo Temizlik tamamlandi. .git ve .bat dosyalari korundu.
pause
