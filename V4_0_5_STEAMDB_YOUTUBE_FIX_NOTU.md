# v4.0.5 SteamDB + YouTube Kesin Fix

- SteamDB için API key gerekmez. Formdaki **Steam App ID** alanına `117...` ID veya `https://steamdb.info/app/ID/` linki yazılabilir.
- Kapak önceliği artık Steam CDN: `library_600x900`, banner: `header`.
- RAWG ana kaynak olmaktan çıkarıldı; Steam sonucu yoksa yedek olarak kullanılır.
- YouTube bölüm listesi artık sahte/yerel bölüm üretmez. `YOUTUBE_API_KEY` doğru değilse hata verir.
- Playlist videoları `playlistItems.list` ile çekilir ve `episodes` tablosuna yazılır.
- Site görünen sürümü tüm ana dosyalarda `v4.0.5` olarak eşitlendi.
