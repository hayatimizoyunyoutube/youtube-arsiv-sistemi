# Vercel Kurulum Rehberi - v1.1.0 Fix

Bu projede gizli keyler GitHub'a gönderilmez.

## 1. GitHub'a gönder

Proje klasöründe PowerShell aç:

```powershell
.\02-githuba-gonder.ps1
```

Repo:

```text
https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi
```

## 2. Vercel'de proje aç

1. Vercel hesabına gir.
2. Add New Project seç.
3. GitHub reposu olarak `youtube-arsiv-sistemi` seç.
4. Framework Preset: `Vite`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Install Command: `npm install`

## 3. Environment Variables

Vercel'de şu iki değişkeni ekle:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
```

Bunları Supabase içinde şu menüden alacaksın:

```text
Supabase Dashboard > Project Settings > Data API
```

## 4. Local test için .env.local

Bilgisayardaki proje klasörüne `.env.local` dosyası aç:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
```

`.env.local` GitHub'a gönderilmez.

## 5. Supabase SQL

ZIP içindeki dosya:

```text
supabase/schema.sql
```

Supabase SQL Editor içinde çalıştırılır.

## Şimdilik eklenmeyecekler

- YouTube API key
- RAWG API key
- Steam API
- Admin şifresi
- Gizli service role key

Bunlar ileride ayrı sürümlerde eklenecek.
