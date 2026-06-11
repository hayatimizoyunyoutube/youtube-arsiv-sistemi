# FIX v1.3.2 - YouTube Playlist, Kategori Görünümü ve Navigasyon Toparlama

Bu paket yeni sürüm değildir, v1.3.2 üzerine düzeltme paketidir.

## Düzeltilenler

- YouTube oynatma listesi bölüm çekme akışı tekrar aktif hale getirildi.
- Playlist URL içinden `list=` parametresi daha sağlam okunur.
- Bölümler hem `game_episodes` hem de `public_episodes` tablosuna yazılır.
- Bölüm thumbnail alanı `thumbnail_url` olarak kaydedilir.
- Playlist senkron notu ve bölüm sayısı güncellenir.
- Kategoriler daha profesyonel kart görünümüne alındı.
- Kategoriler kullanıcı yönetimi ile karışmayacak şekilde açıklama ve sayım mantığıyla düzenlendi.
- Yönetim paneli butonları çakışmayacak şekilde sarılır/wrap olur.
- Yönetim paneline belirgin `Ana Sayfaya Git` butonu eklendi.

## Supabase SQL gerekli mi?

Hayır. Bu fix için yeni SQL gerekmez.

## Yeni .env gerekli mi?

Hayır. Mevcut `YOUTUBE_API_KEY`, `RAWG_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` korunur.

## Veri/yetki durumu

- Veri sıfırlama yok.
- Kullanıcı yetkileri sıfırlanmaz.
- `DROP TABLE` / `TRUNCATE` yok.
