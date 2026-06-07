# v1.1.2 - Seri Yönetimi

## Supabase Gerekli mi?
Evet. Bu sürümde admin panelde seri ekleme, düzenleme ve silme geldiği için Supabase gereklidir.

Gerekli Vercel Environment Variables:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
```

## Eklenenler
- Admin panelde seri ekleme formu
- Supabase `public_series` listeleme
- Seri düzenleme
- Seri silme
- `schema.sql` içine v1.1.2 RLS write policyleri
- `/status` sayfasında başarı notu
- `.ps1` yerine `.bat` dosyaları

## Eklenmeyenler
- YouTube playlist çekme yok
- RAWG yok
- Steam yok
- Rol/yetki detay sistemi yok

## Deploy Akışı
Artık localden devam etmek yerine GitHub + Vercel üzerinden ana site deploy akışı kullanılacak.
