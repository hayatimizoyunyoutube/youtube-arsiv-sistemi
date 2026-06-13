@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cd /d "%~dp0"
title Hayatımız Oyun - Site Temizleme

echo.
echo ==========================================
echo  SITE TEMIZLEME - .git ve .bat KORUNUR
echo ==========================================
echo Klasor: %cd%
echo.
set /p ONAY=Bu klasorde .git ve .bat haric her sey silinsin mi? (EVET yaz): 
if /I not "%ONAY%"=="EVET" (
  echo Islem iptal edildi.
  pause
  exit /b
)
for /d %%D in (*) do (
  if /I not "%%D"==".git" (
    echo Siliniyor klasor: %%D
    rmdir /s /q "%%D" 2>nul
  )
)
for %%F in (*) do (
  if /I not "%%~xF"==".bat" (
    echo Siliniyor dosya: %%F
    del /f /q "%%F" 2>nul
  )
)
echo.
echo ✅ Temizleme tamamlandi. .git ve .bat dosyalari korundu.
pause
