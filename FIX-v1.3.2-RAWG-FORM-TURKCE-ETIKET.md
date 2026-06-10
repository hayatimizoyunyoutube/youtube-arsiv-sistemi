# FIX v1.3.2 — RAWG Form Türkçe + Etiket Düzeltmesi

Bu paket yeni sürüm değildir, v1.3.2 için fix paketidir.

## Düzeltildi

- Durum select menüsünün beyaz görünme sorunu koyu tema ile düzeltildi.
- RAWG'dan seçilen oyun artık şu alanları otomatik doldurur:
  - Oyun adı
  - Slug
  - Çıkış tarihi
  - Kapak URL
  - Banner URL
  - RAWG arka plan URL
  - RAWG ID
  - IGN/Ortalama puan alanı
  - Oyun türleri Türkçe
  - Kategori başlığı/slug
  - Kanal başlığı/slug
  - Seri başlığı/slug
- Oyun türleri Türkçeleştirildi.
- Etiketler butonlu hale getirildi:
  - Türkçe Altyazılı
  - Türkçe Dublajlı
  - Coop
  - DLC
  - %100

## Supabase SQL gerekli mi?

Evet, gerekli.

## SQL ne ekliyor?

- `public_games.tags` kolonunu ekler.

## Veri/yetki sıfırlama

Yoktur. `DROP TABLE` ve `TRUNCATE` kullanılmaz.
