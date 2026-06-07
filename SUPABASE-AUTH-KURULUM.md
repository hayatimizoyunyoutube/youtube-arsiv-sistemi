# v1.1.1 Supabase Auth Kurulum Notu

Bu sürümde gerçek şifre veya API key ZIP içine konmaz.

## Local

Proje klasöründe `.env.local` oluştur:

```env
VITE_SUPABASE_URL=SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=SUPABASE_ANON_PUBLIC_KEY
```

## Vercel

Vercel Dashboard > Project > Settings > Environment Variables:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Admin kullanıcısı

Supabase Dashboard > Authentication > Users bölümünden kullanıcı oluştur.

Sonra site içinde:

```text
/admin
```

adresine girip oluşturduğun e-posta ve şifreyle test et.

## Güvenlik

- `.env.local` GitHub'a gönderilmez.
- `.env.example` GitHub'a gidebilir.
- YouTube / RAWG / Steam API henüz eklenmedi.
