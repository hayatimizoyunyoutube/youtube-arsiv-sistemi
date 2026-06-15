@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Hayatimiz Oyun - Guvenli Temizleme
cls
echo ========================================
echo Hayatimiz Oyun - Guvenli Temizleme
echo Silinmeyecekler: .git klasoru ve .bat dosyalari
echo ========================================
echo.
set /p ONAY=Bu klasordeki .git ve .bat haric her sey silinsin mi? (E/H): 
if /I not "%ONAY%"=="E" (
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
echo Temizleme tamamlandi.
pause
