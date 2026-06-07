$ErrorActionPreference = "Stop"

$repo = "https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git"
$commit = "v1.1.0 fix: guvenli env ve github hazirligi"

Write-Host "Hayatimiz Oyun - GitHub Gonderme Basliyor" -ForegroundColor Cyan
Write-Host "Repo: $repo" -ForegroundColor Yellow

# Guvenlik kontrolu: gizli env dosyalari GitHub'a gitmesin
$secretFiles = @(".env", ".env.local", ".env.production", ".env.development")
foreach ($file in $secretFiles) {
  if (Test-Path $file) {
    Write-Host "UYARI: $file bulundu. .gitignore icinde oldugu icin gonderilmeyecek." -ForegroundColor Yellow
  }
}

if (!(Test-Path ".git")) {
  git init
  git branch -M main
}

$remoteList = git remote
if ($remoteList -notcontains "origin") {
  git remote add origin $repo
} else {
  git remote set-url origin $repo
}

git add .
git reset -- .env .env.local .env.production .env.development 2>$null

git commit -m $commit

git push -f origin main

Write-Host "GitHub gonderimi tamamlandi: $commit" -ForegroundColor Green
Write-Host "Vercel projesini GitHub reposundan birlikte acacagiz." -ForegroundColor Cyan
