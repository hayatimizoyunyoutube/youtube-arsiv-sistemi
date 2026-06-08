# Fix: Oturum ve Yetki Koruma

Bu paket sürüm değildir. v1.2.0 üzerinde hızlı düzeltmedir.

## Düzeltilenler

- Mevcut kurucu/yetkili rolü giriş sırasında tekrar `user` olarak ezilmez.
- `JWT expired` durumunda oturum refresh token ile yenilenmeye çalışılır.
- `mertdundaroyunda@gmail.com` yeni profil açılırsa otomatik `founder` kabul edilir.
- Kullanıcı profili önce `auth_user_id`, sonra e-posta ile aranır.

## Supabase SQL

Gerekmez. Mevcut v1.2.0 schema.sql yeterlidir.

## Kullanıcı Tarafı

Deploy sonrası çıkış yapıp tekrar giriş yapmak yeterlidir. Eğer hâlâ normal kullanıcı görünürse Supabase SQL Editor'da şu kontrol yapılabilir:

```sql
select email, role, status, is_banned
from public.app_users
where lower(email) = lower('mertdundaroyunda@gmail.com');
```
