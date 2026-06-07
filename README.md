# Hayatımız Oyun YouTube Arşiv Sistemi

Sürüm: v1.1.1 Fix

Bu paket Supabase public veri başlangıcı sonrası güvenli GitHub/Vercel hazırlığı içerir.

## Önemli Güvenlik Kuralı

Gerçek API keyler GitHub'a gönderilmez.

Local dosya:

```text
.env.local
```

GitHub'a gidebilecek örnek dosya:

```text
.env.example
```

## Local test

```powershell
npm install
npm run dev
```

Adres:

```text
http://localhost:5173
```

## GitHub'a gönderme

```powershell
.\02-githuba-gonder.ps1
```

Repo:

```text
https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi
```

## Vercel

Detaylı anlatım için:

```text
VERCEL-KURULUM-REHBERI.md
```


## v1.1.1

Admin giriş sistemi eklendi. `/admin` sayfası Supabase Auth ile giriş denemesi yapar. Gerçek keyler `.env.local` ve Vercel Environment Variables içinde tutulmalıdır.
