@echo off
setlocal EnableExtensions DisableDelayedExpansion
cd /d "%~dp0"
title Hayatimiz Oyun - Site Temizle

echo ========================================
echo Hayatimiz Oyun - Site Temizleme
echo Silinmeyecekler: .git klasoru ve .bat dosyalari
echo ========================================
echo.

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
