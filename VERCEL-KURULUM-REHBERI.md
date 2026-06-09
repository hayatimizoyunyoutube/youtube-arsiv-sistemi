# Vercel Kurulum Rehberi - v1.2.5

Bu dosya her sürümde güncellenecek. Gizli keyler GitHub'a gönderilmez.

## GitHub / Vercel Sürüm Notu

Bu paket: **v1.2.5 Yayın Takvimi 2.0**

`02-githuba-gonder.bat` commit mesajını v1.2.5 olarak gönderir. Vercel deploy ekranında yeni commit mesajı v1.2.5 olarak görünmelidir.

## Environment Variables

### Gerekli

Vercel → Project → Settings → Environment Variables içinde şunlar ekli olmalı:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
```

### Bu sürümde yeni .env gerekli mi?

**Hayır.** v1.2.5 için yeni API key yok. Mevcut Supabase URL ve anon key yeterli.

### Henüz eklenmeyecekler

```env
YOUTUBE_API_KEY
RAWG_API_KEY
STEAM_API_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Bunlar ileride ilgili sürüm geldiğinde eklenecek. Şimdilik Vercel'e ekleme.

## Supabase SQL gerekli mi?

**Evet, gerekli.**

Çalıştırılacak dosya:

```text
supabase/schema.sql
```

### Bu SQL ne ekliyor?

- `publish_calendar` tablosunu yoksa oluşturur.
- `publish_calendar` içine eksik kolonları ekler:
  - `title`
  - `game_slug`, `game_title`
  - `series_slug`, `series_title`
  - `episode_id`, `episode_title`
  - `publish_date`, `publish_time`
  - `status`, `note`
  - `is_public`, `sort_order`
  - `created_at`, `updated_at`
- Takvim indexlerini oluşturur.
- Public okuma ve authenticated yazma policy kontrolünü hazırlar.
- `mertdundaroyunda@gmail.com` hesabını kurucu olarak korur.

### Veri sıfırlanır mı?

**Hayır.** Bu SQL veri silmez, yetkileri sıfırlamaz.

Kullanılmayanlar:

```sql
DROP TABLE
TRUNCATE
```

Results kısmında şunu görmelisin:

```text
v1.2.5 başarıyla çalıştı
```

## Deploy sonrası

Vercel'de env zaten varsa sadece GitHub'a gönder ve deploy bekle. Env yeni eklenirse veya değişirse:

```text
Deployments → Redeploy
```
