# Vercel Kurulum Rehberi - v1.2.9

## Yeni .env gerekli mi?
Hayır. Bu sürümde yeni environment variable eklenmedi.

Vercel'de mevcut kalacak değerler:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
```

## Supabase SQL gerekli mi?
Hayır. v1.2.9 sadece site rehberi, yetkili rehberi, sürüm ve deploy notlarını günceller.

## Deploy kontrolü
1. GitHub'a `02-githuba-gonder.bat` ile gönder.
2. Vercel Deployments ekranında commit adının `v1.2.9 site rehberi ve kurulum merkezi` olduğunu kontrol et.
3. Env değişmediği için ekstra Redeploy gerekmez; GitHub push otomatik deploy başlatır.

## Güvenlik kuralı
`.env`, `.env.local`, `.env.production` GitHub'a gönderilmez.
