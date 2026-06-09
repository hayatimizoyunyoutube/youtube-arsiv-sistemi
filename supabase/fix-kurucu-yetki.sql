-- Kurucu Yetki Koruma Fix
-- Sürüm değildir. Mevcut tabloları ve verileri sıfırlamaz.

-- 1) app_users içinde kurucu hesabı founder yapılır.
update public.app_users
set role = 'founder',
    status = 'active',
    is_banned = false,
    ban_reason = '',
    updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com');

-- 2) auth.users içinde hesap varsa app_users satırı yoksa eklenir.
insert into public.app_users (auth_user_id, email, display_name, role, status, is_banned, ban_reason)
select id, email, coalesce(split_part(email, '@', 1), 'mertdundaroyunda'), 'founder', 'active', false, ''
from auth.users
where lower(email) = lower('mertdundaroyunda@gmail.com')
on conflict (auth_user_id) do update set
  email = excluded.email,
  role = 'founder',
  status = 'active',
  is_banned = false,
  ban_reason = '',
  updated_at = now();

-- 3) admin_roles kaydı da founder yapılır.
insert into public.admin_roles (email, role, status)
values ('mertdundaroyunda@gmail.com', 'founder', 'active')
on conflict (email) do update set role = 'founder', status = 'active';

-- 4) Son kontrol.
select 'Kurucu yetki fix çalıştı' as result,
       email,
       role,
       status,
       is_banned
from public.app_users
where lower(email) = lower('mertdundaroyunda@gmail.com');
