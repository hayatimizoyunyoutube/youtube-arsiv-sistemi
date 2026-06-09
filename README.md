# Hayatımız Oyun YouTube Arşiv Sistemi

Sürüm: **v1.2.5 Yayın Takvimi 2.0**

## Bu sürümde eklenenler

- Public yayın takvimi görünümü
- Admin panelden takvim kaydı ekleme/düzenleme/silme
- Oyun, seri ve bölüm seçerek yayın planlama
- Yayın tarihi, saat, durum, not ve görünürlük alanları
- Güvenli Supabase SQL migration
- Vercel/GitHub sürüm etiketi v1.2.5

## Supabase SQL gerekli mi?

**Evet.** `supabase/schema.sql` çalıştırılmalı.

## Yeni .env gerekli mi?

**Hayır.** Mevcut `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` yeterli.

## Veri korunur mu?

Evet. SQL tablo sıfırlamaz, veri silmez, kullanıcı yetkilerini bozmaz.


## v1.2.8 Notu
- Yeni .env gerekli değil.
- Supabase SQL gerekli değil.
- Mevcut veriler ve yetkiler sıfırlanmaz.
- Dashboard ve Veri Sağlığı ekranları mevcut tabloları okur.
