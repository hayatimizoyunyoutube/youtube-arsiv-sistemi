# Hayatımız Oyun Site Paneli v0.0.1

Bu paket tamamen sıfırdan temiz başlangıçtır. Eski v4 dosyaları, eski Supabase karmaşası ve bozuk playlist kodları yoktur.

## Bu sürümde .env gerekli mi?
Hayır. v0.0.1 sadece temel arayüz, menü, form ve yerel önizleme sürümüdür.

## Ne var?
- Temiz ana menü
- Temiz oyun formu
- Steam App ID yazınca kapak önizleme mantığı
- RAWG ID / RAWG Slug alanları hazır
- YouTube Playlist URL alanı hazır
- LocalStorage ile geçici yerel kayıt
- 10 sürümlük plan dosyası

## Ne yok?
- Supabase bağlantısı yok
- YouTube API bağlantısı yok
- RAWG API bağlantısı yok
- Vercel Environment Variables zorunlu değil

## Kurulum
1. ZIP'i aç.
2. Terminalde klasöre gir.
3. `npm install`
4. `npm run dev`

## Vercel
Bu sürüm Vercel'e yüklenebilir ama Environment Variables gerekmez.
Build Command: `npm run build`
Output Directory: `dist`
