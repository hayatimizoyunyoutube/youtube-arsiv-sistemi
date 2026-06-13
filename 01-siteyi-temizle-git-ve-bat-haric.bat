@echo off
setlocal

REM Hayatimiz Oyun - Site Temizleme
REM .git klasoru ve .bat dosyalari silinmez.

cd /d "%~dp0"

echo =========================================
echo Hayatimiz Oyun - Site Temizleme
echo Silinmeyecekler: .git klasoru ve .bat dosyalari
echo Klasor: %CD%
echo =========================================
echo.

set /p ONAY=Devam etmek icin EVET yaz: 
if /I not "%ONAY%"=="EVET" (
  echo Islem iptal edildi.
  pause
  exit /b 0
)

for /d %%D in (*) do (
  if /I not "%%D"==".git" (
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
echo Temizleme tamamlandi. .git ve .bat dosyalari korundu.
pause
