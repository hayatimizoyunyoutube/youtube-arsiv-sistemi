@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
title Hayatimiz Oyun - Site Temizle

REM Bu BAT dosyasini proje klasorunun icinde calistir.
REM Amac: .git klasoru ve .bat dosyalari HARIC her seyi silmek.
set "PROJECT_DIR=%~dp0"
if "%PROJECT_DIR:~-1%"=="\" set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

if not exist "%PROJECT_DIR%\" (
  echo HATA: Proje klasoru bulunamadi.
  pause
  exit /b 1
)

pushd "%PROJECT_DIR%" || (
  echo HATA: Proje klasorune girilemedi.
  pause
  exit /b 1
)

echo ============================================
echo  Hayatimiz Oyun - Site Temizleme
echo ============================================
echo Proje klasoru: %CD%
echo.
echo KORUNACAKLAR:
echo  - .git klasoru
echo  - Tum .bat dosyalari
echo.
echo SILINECEKLER:
echo  - .git ve .bat haric tum dosya/klasorler
echo.
echo Devam etmek icin bir tusa bas.
echo Iptal icin pencereyi kapat.
pause >nul

echo.
echo Klasorler siliniyor...
for /d %%D in (*) do (
  if /I not "%%~nxD"==".git" (
    echo Siliniyor klasor: %%D
    rmdir /s /q "%%D" 2>nul
  )
)

echo.
echo Dosyalar siliniyor...
for %%F in (*) do (
  if /I not "%%~xF"==".bat" (
    echo Siliniyor dosya: %%F
    del /f /q "%%F" 2>nul
  )
)

echo.
echo TAMAM: .git klasoru ve .bat dosyalari korundu.
echo Diger tum dosya ve klasorler temizlendi.
popd
pause
