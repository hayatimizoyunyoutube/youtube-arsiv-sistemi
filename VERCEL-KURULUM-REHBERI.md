# Vercel Kurulum Rehberi - v1.2.8

## Gerekli Environment Variables
Yeni `.env` gerekmez. Mevcut değerler yeterli:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
```

GitHub'a gerçek key gönderme. Sadece Vercel → Project → Settings → Environment Variables içine eklenir.

## Deploy
GitHub'a v1.2.8 commit/push sonrası Vercel otomatik deploy alır.
Deploy bilgisi `public/deploy-info.json` içinde v1.2.8 olarak güncellenir.
