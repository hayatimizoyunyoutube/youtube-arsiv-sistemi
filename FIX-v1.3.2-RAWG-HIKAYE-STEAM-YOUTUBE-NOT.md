# FIX v1.3.2 — RAWG Hikaye + Steam Kapak + YouTube Thumbnail

Bu paket yeni sürüm değildir, v1.3.2 fix paketidir.

## Düzeltildi

- RAWG açıklaması artık oyun formunda **Hikaye / Özet** alanı gibi kullanılır.
- RAWG sonuç detayından `description_raw`, `website`, tüm `genres`, geliştirici/yayıncı bilgileri alınır.
- Türler tek kalmasın diye RAWG detay sonucundaki tüm türler Türkçeye çevrilerek forma yazılır.
- `Kanal Başlığı` ve `Kanal Slug` için açıklama notu eklendi.
- SteamDB notu: SteamDB resmi API sunmadığı için sistem Steam AppID'yi Steam Store aramasıyla bulur, kapak/banner görsellerini Steam CDN adreslerinden doldurur.
- YouTube playlistten bölüm çekildiğinde video thumbnail adresleri `game_episodes.thumbnail_url` alanına yazılır.
- Playlist listesinde kapak/thumbnail önizlemesi görünür.
- Etiketler butonlu yapı olarak korunur: Türkçe Altyazılı, Türkçe Dublajlı, Coop, DLC, %100.

## Supabase SQL gerekli mi?

Evet, gerekli.

## SQL ne ekledi?

Veri silmeden ve yetki sıfırlamadan şunları ekler:

- `public_games.story_tr`
- `public_games.steam_app_id`
- `public_games.steam_cover_url`
- `public_games.tags`
- `public_games.genres`
- `game_episodes.thumbnail_url`
- `youtube_playlists.cover_url`

## Yeni .env gerekli mi?

Yeni değişken gerekmez. Mevcutların Vercel'de olması gerekir:

- `RAWG_API_KEY`
- `YOUTUBE_API_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
