@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo =====================================
echo Hayatimiz Oyun - Temizleme Araci
echo .git ve .bat dosyalari korunur
echo =====================================
echo.
set /p ONAY=Bu klasor temizlenecek. Devam etmek icin EVET yaz: 
if /I not "%ONAY%"=="EVET" (
  echo Islem iptal edildi.
  pause
  exit /b
)
for /d %%d in (*) do (
  if /I not "%%d"==".git" (
    rmdir /s /q "%%d" 2>nul
  )
)
for %%f in (*) do (
  if /I not "%%~xf"==".bat" (
    del /f /q "%%f" 2>nul
  )
)
echo Temizleme tamamlandi.
pause
