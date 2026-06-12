@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ==================================================
echo  HAYATIMIZ OYUN - GITHUB'A GONDER
echo ==================================================
echo.

echo Bu dosya projeyi GitHub'a gonderir.
echo Ilk kullanimda repo adresini sorar.
echo Ornek repo adresi:
echo https://github.com/kullanici/repo-adi.git
echo.
pause

cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
  echo.
  echo HATA: Git yuklu degil veya PATH'e ekli degil.
  echo Git indir: https://git-scm.com/downloads
  echo.
  pause
  exit /b 1
)

if not exist ".git" (
  echo.
  echo [1/7] Git deposu baslatiliyor...
  git init
) else (
  echo.
  echo [1/7] Git deposu zaten var.
)

echo [2/7] Branch main olarak ayarlaniyor...
git branch -M main >nul 2>nul

REM Remote kontrol
for /f "tokens=*" %%R in ('git remote get-url origin 2^>nul') do set CURRENT_REMOTE=%%R

if "%CURRENT_REMOTE%"=="" (
  echo.
  set /p REPO_URL=GitHub repo adresini yapistir: 
  if "%REPO_URL%"=="" (
    echo HATA: Repo adresi bos birakildi.
    pause
    exit /b 1
  )
  git remote add origin "%REPO_URL%"
) else (
  echo [3/7] Mevcut remote bulundu:
  echo %CURRENT_REMOTE%
  echo.
  set /p CHANGE_REMOTE=Remote degissin mi? E/H: 
  if /i "%CHANGE_REMOTE%"=="E" (
    set /p REPO_URL=Yeni GitHub repo adresini yapistir: 
    git remote set-url origin "%REPO_URL%"
  )
)

echo.
echo [4/7] Dosyalar hazirlaniyor...
git add .

echo [5/7] Commit mesaji hazirlaniyor...
set COMMIT_MSG=v0.0.1 temiz baslangic
set /p CUSTOM_MSG=Commit mesaji yaz veya bos birak: 
if not "%CUSTOM_MSG%"=="" set COMMIT_MSG=%CUSTOM_MSG%

git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
  echo.
  echo Commit olusturulamadi. Muhtemelen yeni degisiklik yok.
  echo Devam edip push denenecek.
)

echo.
echo [6/7] GitHub'a gonderiliyor...
git push -u origin main
if errorlevel 1 (
  echo.
  echo HATA: Push basarisiz oldu.
  echo Kontrol et:
  echo - GitHub repo adresi dogru mu?
  echo - GitHub hesabina giris yaptin mi?
  echo - Repo bos mu veya yetkin var mi?
  echo.
  pause
  exit /b 1
)

echo.
echo [7/7] TAMAM: Proje GitHub'a gonderildi.
echo.
pause
