@echo off
setlocal EnableExtensions EnableDelayedExpansion
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
        rmdir /s /q "%%D" 2>nul
    ) else (
        echo Korundu: %%D
    )
)

for %%F in (*) do (
    if /I not "%%~xF"==".bat" (
        echo Dosya siliniyor: %%F
        del /f /q "%%F" 2>nul
    ) else (
        echo Korundu: %%F
    )
)

echo.
echo Temizleme tamamlandi. .git ve .bat dosyalari korundu.
pause
