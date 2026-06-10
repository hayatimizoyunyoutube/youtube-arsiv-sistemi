# Vercel Kurulum Rehberi — v1.3.2

## Yeni .env gerekli mi?

Evet. v1.3.2 ile RAWG oyun bilgisi arama altyapısı geldiği için Vercel'e yeni bir değişken eklenmelidir.

Vercel → Project → Settings → Environment Variables:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
YOUTUBE_API_KEY=YouTube API key
RAWG_API_KEY=RAWG API key
```

## GitHub'a gerçek key gönderme

Gerçek keyler `.env.local` içinde veya Vercel Environment Variables içinde kalır.
GitHub'a sadece `.env.example` gider.

## Değişken ekledikten sonra

Vercel'de mutlaka yeniden deploy yap:

```text
Deployments → Redeploy
```

## Supabase SQL gerekli mi?

Hayır. v1.3.2 için Supabase SQL gerekmez.
Bu sürüm sadece RAWG arama endpointi ve yönetim paneli arayüzü ekler.
Mevcut tablo, veri ve kullanıcı yetkileri korunur.
