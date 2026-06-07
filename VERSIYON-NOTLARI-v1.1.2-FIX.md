# v1.1.2 FIX - Supabase Env ve SQL Results

## Düzeltmeler

- Supabase env eksik uyarısı daha açıklayıcı yapıldı.
- Vercel env eklenince mutlaka Redeploy gerektiği notu eklendi.
- `supabase/schema.sql` sonuna Results alanında görünecek başarı `SELECT` satırı eklendi.
- `public/health.json` Supabase status notu güncellendi.

## Supabase gerekli mi?

Evet. v1.1.2 seri yönetimi için Supabase gereklidir.

## Gerekli Vercel env

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
