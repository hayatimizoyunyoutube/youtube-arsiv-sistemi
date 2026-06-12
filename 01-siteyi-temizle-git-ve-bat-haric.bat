@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
title Hayatimiz Oyun - Site Temizle

REM Bu dosya proje klasorunun icinden calisir. PROJECT_DIR ayarlamana gerek yok.
set "PROJECT_DIR=%~dp0"

if "%PROJECT_DIR:~-1%"=="\" set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

if not exist "%PROJECT_DIR%\" (
  echo HATA: Proje klasoru bulunamadi.
  echo BAT dosyasini proje klasorunun icine koyup tekrar calistir.
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
echo Korunacaklar: .git klasoru ve .bat dosyalari
echo Silinecekler: node_modules, dist, .vercel, .vite, coverage, log/tmp dosyalari
echo.

for /d %%D in (node_modules dist .vercel .vite coverage) do (
  if exist "%%D" (
    echo Siliniyor: %%D
    rmdir /s /q "%%D"
  )
)

for %%F in (*.log *.tmp npm-debug.log yarn-error.log pnpm-debug.log) do (
  if exist "%%F" (
    echo Siliniyor: %%F
    del /q "%%F"
  )
)

echo.
echo TAMAM: .git ve BAT dosyalari korunarak temizlik tamamlandi.
popd
pause
