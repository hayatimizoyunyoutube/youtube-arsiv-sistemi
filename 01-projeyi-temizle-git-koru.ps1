$ErrorActionPreference = "Stop"

Write-Host "Hayatımız Oyun v0.0.1 temiz kurulum başlıyor..." -ForegroundColor Cyan

$protected = @(".git", "01-projeyi-temizle-git-koru.ps1", "02-githuba-gonder.ps1")
Get-ChildItem -Force | Where-Object { $protected -notcontains $_.Name } | Remove-Item -Recurse -Force

Write-Host "Temizlik tamamlandı. Şimdi ZIP içeriğini bu klasöre çıkar." -ForegroundColor Green
