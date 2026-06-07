@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo Hayatimiz Oyun - Temiz Kurulum Hazirligi
echo .git ve guvenli dosyalar korunacak
echo ========================================
echo.

echo Bu islem mevcut klasordeki eski proje dosyalarini temizler.
echo Korunacaklar: .git, .env.local, 01-projeyi-temizle-git-koru.bat, 02-githuba-gonder.bat
pause

for /d %%D in (*) do (
  if /I not "%%D"==".git" (
    echo Klasor siliniyor: %%D
    rmdir /s /q "%%D"
  )
)

for %%F in (*) do (
  if /I not "%%F"=="01-projeyi-temizle-git-koru.bat" if /I not "%%F"=="02-githuba-gonder.bat" if /I not "%%F"==".env.local" (
    echo Dosya siliniyor: %%F
    del /f /q "%%F"
  )
)

echo.
echo Temizlik tamamlandi. Simdi yeni ZIP icerigini bu klasore cikartabilirsin.
pause
