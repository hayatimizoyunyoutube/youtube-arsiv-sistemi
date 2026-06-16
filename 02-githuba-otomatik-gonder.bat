@echo off
color 0A
echo ==========================================
echo   YOUTUBE ARSIV SISTEMI - GITHUB GONDERICI
echo ==========================================
echo.

set /p versiyon="Hangi versiyonu gonderiyorsun? (Orn: v0.0.1) : "
set /p mesaj="Guncelleme notu nedir? (Orn: Temel iskelet kuruldu) : "

echo.
echo Gonderiliyor: %versiyon% - %mesaj%
echo.

git add .
git commit -m "%versiyon% - %mesaj%"
git push

echo.
echo ==========================================
echo ISLEM BASARILI! Vercel birazdan siteni guncelleyecek.
echo ==========================================
pause