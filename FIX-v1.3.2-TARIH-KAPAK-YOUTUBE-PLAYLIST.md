# FIX v1.3.2 - Tarih/Kapak + YouTube Playlist Çekme

Bu paket yeni sürüm değildir, v1.3.2 üzerine düzeltmedir.

## Düzeltilenler

- Oyun çıkış tarihi RAWG ve Steam bilgilerinden daha güvenli alınır.
- Kapak/banner/logo için Steam AppID varsa Steam CDN bağlantıları kontrol edilerek en sağlam görsel seçilir.
- RAWG görselleri Steam görseli bulunamazsa yedek olarak kullanılır.
- 007 First Light gibi oyunlarda James Bond serisi daha doğru algılanır.
- YouTube playlist URL/ID girildiğinde bölümler ve thumbnail görselleri çekilir.
- Playlistten çekilen bölümler hem `game_episodes` hem de sitede kullanılan `public_episodes` tablosuna yazılır.

## Supabase SQL gerekli mi?

Evet, gerekli.

## SQL ne ekler/günceller?

- `public_games` tablosunda otomatik çekme alanlarını kontrol eder.
- `public_episodes` tablosuna YouTube alanları ekler:
  - `youtube_video_id`
  - `youtube_url`
  - `thumbnail_url`
  - `episode_number`
  - `episode_no`
  - `game_slug`, `game_title`
  - `series_slug`, `series_title`
  - `published_at`
  - `is_public`
  - `sort_order`
- `public_episodes_youtube_video_id_unique_fix_v132b` indexini ekler.

## Yeni .env gerekli mi?

Hayır. Mevcut değişkenler yeterli:

```env
RAWG_API_KEY=...
YOUTUBE_API_KEY=...
```

## Veri/yetki sıfırlanır mı?

Hayır. `DROP TABLE` ve `TRUNCATE` yoktur.
