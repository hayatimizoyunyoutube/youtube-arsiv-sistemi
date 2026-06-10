# v1.3.1 - YouTube Bölüm Çekme Altyapısı

## Eklenenler
- Yönetim paneline YouTube Playlist menüsü eklendi.
- Playlist başlığı, URL, ID, oyun, seri, kanal ve senkron durum alanları eklendi.
- YouTube API çağrısı bu sürümde yapılmaz; sadece kayıt altyapısı hazırlanır.
- Vercel/GitHub sürüm etiketi v1.3.1 olarak güncellendi.

## Supabase SQL gerekli mi?
Evet, gerekli.

## SQL ne ekledi?
- `youtube_playlists` tablosu
- `playlist_id`, `playlist_url`, `game_slug`, `series_slug`, `channel_slug`
- `sync_status`, `last_sync_note`, `episode_count`
- Playlist indexleri ve RLS policyleri

## Yeni .env gerekli mi?
Hayır. Mevcut `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` yeterli.
YouTube API anahtarı v1.3.1 sürümünde istenecek.

## Veri Koruma
- Tablo sıfırlama yok.
- Yetki sıfırlama yok.
- Oyun, seri, kanal, kategori, bölüm ve kullanıcı verileri korunur.
