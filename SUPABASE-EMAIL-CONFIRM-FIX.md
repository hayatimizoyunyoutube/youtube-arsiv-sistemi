# Supabase Email Confirm Fix

Bu fix sürüm değildir. Amaç: kayıt olduktan sonra girişte görünen `Email not confirmed` hatasını geliştirme aşamasında kaldırmak.

## Yapılacak işlem

Supabase Dashboard içinde:

1. SQL Editor aç.
2. `supabase/schema.sql` dosyasını tekrar çalıştır.
3. Results kısmında şu satırı gör:

```text
Email confirm fix çalıştı
```

## Ne yapar?

- Mevcut onaysız Auth kullanıcılarının `email_confirmed_at` alanını doldurur.
- Bundan sonra yeni kayıt olan kullanıcıları geliştirme aşamasında otomatik onaylı kabul eder.
- `app_users` profil kaydını tekrar senkronlar.

## Vercel

SQL çalıştıktan sonra kod değişikliği de olduğu için GitHub'a gönderip Vercel Redeploy yap.

## Not

Canlı yayına geçmeden önce gerçek e-posta onayı istenirse bu otomatik onay trigger'ı kaldırılabilir.
