# Supabase SQL Güncelleme Notları - v1.2.6

## Supabase SQL gerekli mi?
Evet, gerekli.

## Ne eklendi/güncellendi?
- `site_runtime_config` tablosu yoksa oluşturulur.
- `site_settings` tablosu yoksa oluşturulur.
- Bakım modu alanları eklenir: `maintenance_enabled`, `maintenance_title`, `maintenance_message`, `maintenance_notes`, `maintenance_estimated_end`, `updated_at`.
- Site ayarları alanları eklenir: `site_title`, `site_subtitle`, `discord_url`, `youtube_url`, `kick_url`, `instagram_url`, `tiktok_url`.
- `site_status_logs` içine v1.2.6 başarı kaydı eklenir.
- `mertdundaroyunda@gmail.com` kurucu koruması devam eder.

## Veri koruma
- `DROP TABLE` yok.
- `TRUNCATE` yok.
- Kullanıcı rolleri/yetkileri sıfırlanmaz.
- Oyun, seri, kategori, kanal, bölüm ve takvim verileri silinmez.

## Yeni .env gerekli mi?
Hayır. Mevcut Vercel env yeterli:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```


## v1.2.7 Notu
- Yeni .env gerekli değil.
- Supabase SQL gerekli değil.
- Mevcut veriler ve yetkiler sıfırlanmaz.
- Dashboard ve Veri Sağlığı ekranları mevcut tabloları okur.
