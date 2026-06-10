# Vercel Kurulum Rehberi — v1.3.1

## Bu sürümde yeni `.env` gerekli mi?

Evet. v1.3.1 ile YouTube playlistten bölüm çekme altyapısı geldiği için Vercel'e yeni bir değişken eklenmeli.

## Vercel Environment Variables

Vercel → Project → Settings → Environment Variables alanına şunlar eklenmiş olmalı:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
YOUTUBE_API_KEY=YouTube Data API v3 Key
```

## Önemli güvenlik notu

`YOUTUBE_API_KEY` GitHub'a yazılmayacak. Sadece Vercel Environment Variables içine eklenecek.

`.env.local` dosyası bilgisayarda kalır, GitHub'a gönderilmez.

## Vercel'de env ekledikten sonra

Mutlaka:

```text
Deployments → Redeploy
```

yapılmalı. Vite build ve Vercel serverless API yeni env değerini ancak redeploy sonrası kullanır.

## Supabase SQL gerekli mi?

Evet, gerekli.

v1.3.1 SQL şunları ekler/günceller:

- `game_episodes` tablosu yoksa oluşturur.
- `youtube_video_id` alanı ekler.
- `youtube_url` alanı ekler.
- `thumbnail_url` alanı ekler.
- `published_at` alanı ekler.
- `episode_number` ve `sort_order` alanlarını ekler.
- `game_episodes_youtube_video_id_key` unique index ekler.
- RLS policy kontrol eder.
- `mertdundaroyunda@gmail.com` kurucu yetkisini korur.

## Veri koruma kuralı

Bu SQL:

- Tablo sıfırlamaz.
- Kullanıcı yetkilerini silmez.
- Oyun/seri/kategori/kanal/bölüm verilerini silmez.
- `DROP TABLE` kullanmaz.
- `TRUNCATE` kullanmaz.
