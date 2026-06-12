# Hayatımız Oyun v4.0.5 - Supabase Constraint + Temiz Paket Fix

Bu paket v4.0.5 üstüne temizlenmiş kesin fix paketidir.

## Önce Supabase'de çalıştır
1. Supabase > SQL Editor aç.
2. `supabase/schema.sql` dosyasının tamamını çalıştır.
3. Bu dosya sadece `games` ve `episodes` tablolarını temiz resetler. Yetki/kullanıcı tablolarını silmez.

## Düzeltilen hata
- `relation "episodes_game_number_unique" already exists` hatası düzeltildi.
- Eski constraint güvenli kaldırılıp idempotent unique index ile yeniden kuruluyor.
- Aynı SQL tekrar çalıştırıldığında aynı constraint hatasını vermez.

## API değişkenleri
Vercel'de görünen değişkenler yeterli:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `YOUTUBE_API_KEY`
- `RAWG_API_KEY`
- `ADMIN_PASSWORD`

SteamDB için API key gerekmez. SteamDB linkinden App ID alınır: `https://steamdb.info/app/123456/`

## Temizlenenler
Eski v4.0.5/v4.0.5/v4.0.5 not dosyaları paketten kaldırıldı. Sadece gerekli kurulum ve schema dosyaları bırakıldı.
