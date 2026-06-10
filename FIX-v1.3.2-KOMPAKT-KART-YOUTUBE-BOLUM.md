# FIX v1.3.2 - Kompakt Kart + YouTube Bölüm Çekme Toparlama

Bu paket yeni sürüm değildir.

## Düzeltilenler
- Seri/oyun kartları daha kompakt hale getirildi; uzun hikaye yazısı kartı bozmaz.
- Ana sayfadaki “Son Eklenen Bölümler” artık `public_episodes` tablosundan gelir.
- YouTube playlist çekildiğinde bölümler hem `game_episodes` hem `public_episodes` tablosuna yazılır.
- Bölüm thumbnail URL’leri kaydedilir ve bölüm kartlarında görünür.
- Oyun/seri bölüm sayısı `episode_count` olarak güncellenir.
- “Başarılı: 0 oyun yüklendi” mesajının kayıt sonrası yanlış görünmesi engellendi.

## Supabase SQL gerekli mi?
Evet, gerekli.

## SQL ne ekler?
- `public_games.episode_count`
- `public_games.episodes`
- `public_series.episode_count`
- `public_series.episodes`
- `public_episodes.thumbnail_url`
- `public_episodes.youtube_video_id`
- `public_episodes.game_slug/game_title/series_slug/series_title`
- `youtube_playlists.episode_count`
- `youtube_playlists.last_sync_note`

## Veri koruma
`DROP TABLE` ve `TRUNCATE` yoktur. Kullanıcı yetkileri ve mevcut içerikler sıfırlanmaz.

## Not
YouTube bölümleri gelmiyorsa Vercel’de `YOUTUBE_API_KEY` tanımlı olmalı ve Google Cloud tarafında YouTube Data API v3 açık olmalı.
