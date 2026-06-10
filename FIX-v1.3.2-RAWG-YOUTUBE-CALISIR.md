# FIX v1.3.2 — RAWG + YouTube Çalışır Hale Getirme

Bu dosya yeni sürüm değildir, v1.3.2 üzerine fix paketidir.

## Supabase SQL gerekli mi?

Evet, gerekli.

Çalıştırılacak dosya:

```text
supabase/fix-v132-rawg-youtube-calisir.sql
```

## SQL ne ekler?

### `public_games`

- `rawg_id`
- `metacritic`
- `genres`
- `website`
- `rawg_background_url`

### `youtube_playlists`

- Tablo yoksa oluşturur.
- Eksik kolonları ekler.
- Playlist ID, URL, oyun/seri/kanal bağlantısı, senkron durumu ve bölüm sayısı alanlarını hazırlar.

### `game_episodes`

- `youtube_video_id`
- `thumbnail_url`
- `description`
- `episode_number`
- `youtube_url`
- `published_at`

## Veri/yetki sıfırlanır mı?

Hayır.

- `DROP TABLE` yok.
- `TRUNCATE` yok.
- Kullanıcı yetkileri korunur.
- Mevcut oyun/seri/kategori/kanal/bölüm kayıtları korunur.

## Yeni `.env` gerekli mi?

Yeni değil, ama Vercel'de şu iki key olmalı:

```env
YOUTUBE_API_KEY=
RAWG_API_KEY=
```

Ekledikten sonra Vercel'de **Redeploy** yapılmalı.

## Arayüzde düzeltilenler

- Oyun Yönetimi içine `🎮 RAWG'dan Çek` alanı eklendi.
- RAWG sonucu seçilince oyun formu otomatik dolar.
- Kapak, banner, çıkış tarihi, türler, RAWG ID ve Metacritic forma gelir.
- YouTube Playlist ekranındaki `Bölümleri Çek` işlevi aktif kullanım için netleştirildi.
