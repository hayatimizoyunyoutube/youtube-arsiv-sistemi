# Vercel Kurulum Rehberi - v1.3.0

## Bu sürümde yeni .env gerekli mi?
Hayır.

Mevcut Vercel Environment Variables yeterli:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
```

## YouTube API key gerekli mi?
Hayır, v1.3.0 sadece playlist kayıt altyapısıdır.

YouTube API key v1.3.1 sürümünde, playlistten bölüm çekme aktif edilirken eklenecek.

## Supabase SQL gerekli mi?
Evet.

`supabase/schema.sql` çalıştırılmalı.

## SQL ne ekledi?
- `youtube_playlists` tablosu
- Playlist başlığı, URL ve ID alanları
- Oyun/seri/kanal bağlantı alanları
- Senkron durumu ve son not alanı
- Public okuma ve authenticated yazma policyleri
- Indexler

## Veri ve yetki sıfırlanır mı?
Hayır.

Bu SQL:
- `DROP TABLE` kullanmaz
- `TRUNCATE` kullanmaz
- Mevcut kullanıcı yetkilerini sıfırlamaz
- Oyun/seri/kategori/kanal/bölüm kayıtlarını silmez

## Deploy sonrası
1. GitHub'a gönder.
2. Vercel otomatik deploy alır.
3. Supabase SQL Editor içinde `supabase/schema.sql` çalıştır.
4. Site menüsünden Yönetim Paneli → YouTube Playlist alanını kontrol et.
