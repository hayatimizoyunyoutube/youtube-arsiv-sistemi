# BAT Düzeltme Notu

Bu paket v0.0.1 sürümünün BAT düzeltmeli halidir. Site sürümü değiştirilmedi.

## Düzeltilenler

- 🧹 `01-siteyi-temizle-git-ve-bat-haric.bat` artık proje klasöründeki `.git` klasörü ve `.bat` dosyaları HARİÇ her şeyi temizler.
- 🛡️ Temizleme işleminden önce `EVET` onayı ister.
- 🚀 `02-githuba-otomatik-gonder.bat` artık Git kurulu mu kontrol eder.
- 🔗 GitHub `origin` adresini otomatik ekler veya yanlışsa düzeltir.
- 🌿 Branch adını `main` olarak sabitler.
- 📦 Değişiklik yoksa commit hatası vermez, commit adımını atlar.
- 🔁 Push başarısız olursa bir kez `git pull --rebase origin main` deneyip tekrar gönderir.

## Repo

https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi
