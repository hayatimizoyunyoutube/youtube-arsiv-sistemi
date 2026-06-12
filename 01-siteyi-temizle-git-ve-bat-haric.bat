@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
title Hayatimiz Oyun - Site Temizle

echo.
echo ===============================================
echo  HAYATIMIZ OYUN - SITE TEMIZLEME
echo ===============================================
echo Bu islem .git klasorunu ve .bat dosyalarini SILMEZ.
echo Proje klasoru: %~dp0
echo.
set /p ONAY=Devam etmek icin EVET yaz: 
if /I not "%ONAY%"=="EVET" (
  echo Islem iptal edildi.
  pause
  exit /b 0
)
cd /d "%~dp0"
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
