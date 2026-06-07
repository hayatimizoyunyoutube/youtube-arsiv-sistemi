$ErrorActionPreference = "Stop"

$repo = "https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi.git"
$commit = "v0.0.1 temiz temel site"

if (!(Test-Path ".git")) {
  git init
  git branch -M main
}

$remote = git remote
if ($remote -notcontains "origin") {
  git remote add origin $repo
} else {
  git remote set-url origin $repo
}

git add .
git commit -m $commit
git push -f origin main

Write-Host "GitHub gönderimi tamamlandı: $commit" -ForegroundColor Green

