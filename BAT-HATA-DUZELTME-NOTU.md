# BAT GitHub Düzeltme Paketi

Bu paket sürüm değildir, sadece BAT düzeltmesidir.

## Düzeltilenler

- GitHub BAT dosyasında düz metinlerin komut gibi çalışması düzeltildi.
- Türkçe karakter kaynaklı CMD bozulmalarına karşı `chcp 65001` eklendi.
- Proje yolu artık otomatik olarak BAT dosyasının bulunduğu klasör kabul edilir.
- Git remote adresi otomatik düzeltilir.
- `.git` yoksa otomatik `git init` yapar.
- Branch otomatik `main` yapılır.

## Kullanım

1. Bu iki BAT dosyasını proje ana klasörüne at.
2. `index.html`, `package.json`, `vercel.json` aynı klasörde olsun.
3. GitHub'a göndermek için `02-githuba-otomatik-gonder.bat` çalıştır.

## Önemli

Ekranda `Git bilgisayarda bulunamadı` yazarsa Git kurulu değildir veya PATH'e eklenmemiştir.
Git kur: https://git-scm.com/download/win
