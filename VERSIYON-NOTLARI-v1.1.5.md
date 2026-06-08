# v1.1.5 - Auth Stabilizasyon ve Kullanıcı Kayıt Fix

## Supabase gerekli mi?
Evet. Bu sürümde Supabase gereklidir.

## Eklenenler
- Kayıt ol / giriş yap akışı düzeltildi.
- Kayıt olan kullanıcı Supabase Auth içine düşer.
- `auth.users` kaydı oluşunca `public.app_users` profili otomatik açılır.
- Giriş yapan kullanıcı için profil kaydı ayrıca kontrol edilir.
- Status panelinde v1.1.5 başarı notu gösterilir.
- Supabase Email Confirm ayarı için uyarı eklendi.

## Supabase'de yapılacaklar
1. `supabase/schema.sql` dosyasını SQL Editor içinde çalıştır.
2. Results kısmında `v1.1.5 başarıyla çalıştı` yazısını gör.
3. Authentication → Providers → Email kısmında test için `Confirm email` kapalı olsun.

## Vercel'de yapılacaklar
- Env zaten varsa değiştirme.
- Deployments → Redeploy yap.
