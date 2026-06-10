# v1.3.1 — YouTube Bölüm Çekme Altyapısı

## Eklenenler

- YouTube playlistten bölüm çekme için Vercel serverless API eklendi.
- Yönetim panelindeki YouTube Playlist alanına `Bölümleri Çek` butonu eklendi.
- Çekilen videolar `game_episodes` tablosuna yazılır.
- Aynı YouTube video ID tekrar eklenmez; güncellenir.
- `02-githuba-gonder.bat` CMD uyumlu olarak düzeltildi.
- Vercel/GitHub sürüm etiketi v1.3.1 olarak güncellendi.

## Supabase SQL gerekli mi?

Evet, gerekli.

Eklenen/güncellenen SQL alanları:

- `game_episodes.youtube_video_id`
- `game_episodes.youtube_url`
- `game_episodes.thumbnail_url`
- `game_episodes.published_at`
- `game_episodes.episode_number`
- YouTube video ID unique index
- RLS policy kontrolleri

## Yeni .env gerekli mi?

Evet.

Vercel Environment Variables içine eklenmeli:

```env
YOUTUBE_API_KEY=YouTube Data API v3 Key
```

Mevcut Supabase env değerleri korunacak.

## Veri Koruma

Tablolar sıfırlanmaz. Kullanıcı yetkileri, oyunlar, kategoriler, kanallar, seriler ve mevcut bölümler korunur.
