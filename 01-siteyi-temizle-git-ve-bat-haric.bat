@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
cd /d "%~dp0"
echo =====================================
echo Hayatimiz Oyun - Proje Temizleme
echo .git ve .bat dosyalari korunur
echo =====================================
echo.
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
echo Temizleme tamamlandi. .git ve .bat dosyalari korundu.
pause
