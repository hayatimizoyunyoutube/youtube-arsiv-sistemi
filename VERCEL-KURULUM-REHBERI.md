# Vercel Kurulum Rehberi - v1.2.6

## Environment Variables
Bu sürümde yeni `.env` gerekmez.

Vercel'de sadece mevcut iki değer yeterlidir:

```env
VITE_SUPABASE_URL=Supabase Project URL
VITE_SUPABASE_ANON_KEY=Supabase anon public key
```

GitHub'a gerçek `.env.local` gönderilmez. Sadece `.env.example` gidebilir.

## Deploy
ZIP'i projeye çıkar, GitHub'a gönder ve Vercel otomatik deploy alır.

Bu sürümde Vercel/GitHub sürüm etiketi: `v1.2.6 bakim modu site ayarlari`.


## v1.2.7 Notu
- Yeni .env gerekli değil.
- Supabase SQL gerekli değil.
- Mevcut veriler ve yetkiler sıfırlanmaz.
- Dashboard ve Veri Sağlığı ekranları mevcut tabloları okur.
