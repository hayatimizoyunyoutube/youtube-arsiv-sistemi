@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
title Hayatimiz Oyun - Site Temizle

REM Bu BAT dosyasini proje klasorunun icinde calistir.
REM .git klasoru ve .bat dosyalari HARIC her seyi siler.
set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%" || (
  echo HATA: Proje klasorune girilemedi.
  pause
  exit /b 1
)

echo ============================================
echo  Hayatimiz Oyun - Site Temizleme
echo ============================================
echo Proje klasoru: %CD%
echo.
echo KORUNACAKLAR: .git klasoru ve .bat dosyalari
echo SILINECEKLER: diger tum dosya ve klasorler
echo.
echo Devam etmek icin bir tusa bas.
pause >nul

echo.
echo Klasorler siliniyor...
for /f "delims=" %%D in ('dir /ad /b') do (
  if /I not "%%D"==".git" (
    echo Siliniyor klasor: %%D
    rmdir /s /q "%%D"
  )
)

echo.
echo Dosyalar siliniyor...
for /f "delims=" %%F in ('dir /a-d /b') do (
  if /I not "%%~xF"==".bat" (
    echo Siliniyor dosya: %%F
    del /f /q "%%F"
  )
)

echo.
echo TAMAM: .git klasoru ve .bat dosyalari korundu.
pause
