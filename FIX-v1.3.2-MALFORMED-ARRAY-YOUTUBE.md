# FIX v1.3.2 - Oyun Ekle Array + YouTube Playlist

Bu paket yeni sürüm değildir, fix paketidir.

## Düzeltilenler

- `malformed array literal: "Aksiyon, Macera"` hatası düzeltildi.
- `genres` ve `tags` alanları düz Türkçe metin olarak kaydedilir.
- YouTube playlist URL okuma güçlendirildi.
- Playlist ID şu formatlardan alınır:
  - `https://www.youtube.com/playlist?list=...`
  - `list=...`
  - doğrudan `PL...`
- Playlist bölüm/thumbnail alanları Supabase tarafında güvenli kontrol edilir.

## Supabase SQL gerekli mi?

Evet, gerekli.

## SQL ne ekliyor / düzeltiyor?

- `public_games.genres` alanı text standardına alınır.
- `public_games.tags` alanı text standardına alınır.
- `public_episodes.youtube_video_id`
- `public_episodes.youtube_url`
- `public_episodes.thumbnail_url`
- `public_episodes.episode_number`
- `public_episodes.game_slug / game_title`
- `public_episodes.series_slug / series_title`
- `public_episodes.published_at`

## Veri/yetki korunuyor mu?

Evet.

- `DROP TABLE` yok.
- `TRUNCATE` yok.
- Kullanıcı rolleri sıfırlanmaz.
- Mevcut oyunlar, seriler, kategoriler, bölümler korunur.

## Yeni .env gerekli mi?

Hayır.

Ama Vercel'de bunlar zaten olmalı:

```env
RAWG_API_KEY=...
YOUTUBE_API_KEY=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
