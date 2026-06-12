@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 1254 >nul
title Hayatimiz Oyun - Site Temizle

REM ==========================================================
REM  Hayatimiz Oyun - Site Temizleme
REM  SILINMEYECEKLER: .git klasoru ve tum .bat dosyalari
REM ==========================================================

set "PROJECT_DIR=C:\Users\Mevlüt Yeni Pc\Desktop\Youtube Yayýn Hazýrlýklarý\Youtube\projeler\youtube-arsive"

if not exist "%PROJECT_DIR%\" (
    echo HATA: Proje klasoru bulunamadi:
    echo %PROJECT_DIR%
    echo.
    echo BAT dosyasini proje klasorunun icine kopyalayip tekrar calistirabilirsin.
    pause
    exit /b 1
)

cd /d "%PROJECT_DIR%" || (
    echo HATA: Proje klasorune girilemedi.
    pause
    exit /b 1
)

echo.
echo Temizlenecek klasor:
echo %CD%
echo.
echo .git klasoru ve .bat dosyalari KORUNACAK.
echo.
set /p CONFIRM=Devam etmek icin EVET yaz: 
if /I not "%CONFIRM%"=="EVET" (
    echo Islem iptal edildi.
    pause
    exit /b 0
)

echo.
echo Dosyalar temizleniyor...

for /f "delims=" %%F in ('dir /a:-d /b') do (
    if /I not "%%~xF"==".bat" (
        del /f /q "%%F" 2^>nul
    )
)

for /f "delims=" %%D in ('dir /a:d /b') do (
    if /I not "%%D"==".git" (
        rmdir /s /q "%%D" 2^>nul
    )
)

echo.
echo TEMIZLIK TAMAMLANDI.
echo Korundu: .git klasoru ve .bat dosyalari.
echo.
pause
exit /b 0
