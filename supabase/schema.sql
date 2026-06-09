-- Hayatımız Oyun v1.1.9 - Kurucu Yetkisi + Güvenli SQL Migration
-- ÖNEMLİ: Bu dosya mevcut tabloları/verileri sıfırlamaz.
-- DROP TABLE / TRUNCATE yoktur. Eksik tablo/kolon/policy/function ekler.

create extension if not exists pgcrypto;

-- 1) Tablolar: sadece yoksa oluştur
create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text unique,
  display_name text default '',
  role text default 'user',
  status text default 'active',
  is_banned boolean default false,
  ban_reason text default '',
  last_login_at timestamptz,
  avatar_url text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.admin_roles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  status text not null default 'active',
  created_at timestamptz default now()
);

create table if not exists public.public_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text default '',
  cover_url text default '',
  status text default 'Aktif',
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.public_channels (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text default '',
  handle text default '',
  cover_url text default '',
  status text default 'Aktif',
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.public_games (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text default '',
  category_slug text default '',
  category_title text default '',
  channel_slug text default '',
  channel_title text default '',
  series_slug text default '',
  series_title text default '',
  status text default 'Planlandı',
  release_date date,
  cover_url text default '',
  banner_url text default '',
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.public_series (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text default '',
  game_slug text default '',
  game_title text default '',
  category_slug text default '',
  category_title text default '',
  channel_slug text default '',
  channel_title text default '',
  status text default 'Planlandı',
  episodes integer default 0,
  progress integer default 0,
  cover_url text default '',
  banner_url text default '',
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.public_episodes (
  id uuid primary key default gen_random_uuid(),
  series_slug text default '',
  game_slug text default '',
  title text not null,
  episode_no integer default 1,
  youtube_url text default '',
  thumbnail_url text default '',
  status text default 'Taslak',
  published_at timestamptz,
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.publish_calendar (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  game_slug text default '',
  series_slug text default '',
  publish_date date,
  publish_time time,
  status text default 'Planlandı',
  note text default '',
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  note text default '',
  status text default 'Aktif',
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.maintenance_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  enabled boolean default false,
  title text default 'Site Güncelleniyor',
  message text default 'Kısa süre sonra tekrar deneyin.',
  progress integer default 0,
  updated_at timestamptz default now()
);

create table if not exists public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_email text default '',
  action text not null,
  detail text default '',
  created_at timestamptz default now()
);

create table if not exists public.site_status_logs (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  status text not null,
  detail text default '',
  created_at timestamptz default now()
);

create table if not exists public.site_menu_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  href text not null,
  icon text default '',
  sort_order integer default 100,
  is_public boolean default true,
  created_at timestamptz default now()
);

-- 2) Eksik kolonlar: sadece yoksa ekle
alter table public.app_users add column if not exists auth_user_id uuid unique;
alter table public.app_users add column if not exists email text unique;
alter table public.app_users add column if not exists display_name text default '';
alter table public.app_users add column if not exists role text default 'user';
alter table public.app_users add column if not exists status text default 'active';
alter table public.app_users add column if not exists is_banned boolean default false;
alter table public.app_users add column if not exists ban_reason text default '';
alter table public.app_users add column if not exists last_login_at timestamptz;
alter table public.app_users add column if not exists avatar_url text default '';
alter table public.app_users add column if not exists created_at timestamptz default now();
alter table public.app_users add column if not exists updated_at timestamptz default now();

alter table public.public_categories add column if not exists sort_order integer default 100;
alter table public.public_categories add column if not exists is_public boolean default true;
alter table public.public_categories add column if not exists cover_url text default '';
alter table public.public_channels add column if not exists sort_order integer default 100;
alter table public.public_channels add column if not exists is_public boolean default true;
alter table public.public_channels add column if not exists cover_url text default '';
alter table public.public_games add column if not exists banner_url text default '';
alter table public.public_games add column if not exists is_public boolean default true;
alter table public.public_games add column if not exists sort_order integer default 100;
alter table public.public_series add column if not exists banner_url text default '';
alter table public.public_series add column if not exists is_public boolean default true;
alter table public.public_series add column if not exists sort_order integer default 100;
alter table public.public_episodes add column if not exists is_public boolean default true;
alter table public.public_episodes add column if not exists sort_order integer default 100;

-- 3) RLS açık kalsın
alter table public.app_users enable row level security;
alter table public.admin_roles enable row level security;
alter table public.public_categories enable row level security;
alter table public.public_channels enable row level security;
alter table public.public_games enable row level security;
alter table public.public_series enable row level security;
alter table public.public_episodes enable row level security;
alter table public.publish_calendar enable row level security;
alter table public.admin_notes enable row level security;
alter table public.maintenance_settings enable row level security;
alter table public.admin_activity_logs enable row level security;
alter table public.site_status_logs enable row level security;
alter table public.site_menu_items enable row level security;

-- 4) Policyleri güvenli şekilde yeniden oluştur
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('app_users','admin_roles','public_categories','public_channels','public_games','public_series','public_episodes','publish_calendar','admin_notes','maintenance_settings','admin_activity_logs','site_status_logs','site_menu_items')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

create policy "public read categories" on public.public_categories for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read channels" on public.public_channels for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read games" on public.public_games for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read series" on public.public_series for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read episodes" on public.public_episodes for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read calendar" on public.publish_calendar for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read maintenance" on public.maintenance_settings for select using (true);
create policy "public read status" on public.site_status_logs for select using (true);
create policy "public read menu" on public.site_menu_items for select using (is_public = true or auth.role() = 'authenticated');

create policy "auth read app users" on public.app_users for select to authenticated using (true);
create policy "auth write app users" on public.app_users for all to authenticated using (true) with check (true);
create policy "auth read admin roles" on public.admin_roles for select to authenticated using (true);
create policy "auth write admin roles" on public.admin_roles for all to authenticated using (true) with check (true);
create policy "auth write categories" on public.public_categories for all to authenticated using (true) with check (true);
create policy "auth write channels" on public.public_channels for all to authenticated using (true) with check (true);
create policy "auth write games" on public.public_games for all to authenticated using (true) with check (true);
create policy "auth write series" on public.public_series for all to authenticated using (true) with check (true);
create policy "auth write episodes" on public.public_episodes for all to authenticated using (true) with check (true);
create policy "auth write calendar" on public.publish_calendar for all to authenticated using (true) with check (true);
create policy "auth write notes" on public.admin_notes for all to authenticated using (true) with check (true);
create policy "auth write maintenance" on public.maintenance_settings for all to authenticated using (true) with check (true);
create policy "auth write logs" on public.admin_activity_logs for all to authenticated using (true) with check (true);
create policy "auth write status" on public.site_status_logs for all to authenticated using (true) with check (true);
create policy "auth write menu" on public.site_menu_items for all to authenticated using (true) with check (true);

-- 5) Auth kayıt olunca profil açan trigger
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.app_users (auth_user_id, email, display_name, role, status)
  values (new.id, new.email, coalesce(split_part(new.email, '@', 1), ''), 'user', 'active')
  on conflict (auth_user_id) do update set
    email = excluded.email,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

-- 6) Eski auth kullanıcılarını app_users içine senkronla, mevcut rolleri bozma
insert into public.app_users (auth_user_id, email, display_name, role, status)
select id, email, coalesce(split_part(email, '@', 1), ''), 'user', 'active'
from auth.users
where email is not null
on conflict (auth_user_id) do update set
  email = excluded.email,
  updated_at = now();

-- 7) Kurucu hesabı sabitle: mevcut kayıt varsa günceller, yoksa auth.users içinden açar
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

update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com');

insert into public.admin_roles (email, role, status)
values ('mertdundaroyunda@gmail.com', 'founder', 'active')
on conflict (email) do update set role = 'founder', status = 'active';

-- 8) Menü ve bakım ayarı: kayıt yoksa ekle, var olanı bozma
insert into public.site_menu_items (slug, title, href, icon, sort_order) values
('ana-sayfa', 'Ana Sayfa', '/', '🏠', 10),
('arsiv', 'Arşiv', '/archive', '🎮', 20),
('koleksiyonlar', 'Koleksiyonlar', '/collections', '📁', 30),
('seriler', 'Seriler', '/series', '🎬', 40),
('yayin-takvimi', 'Yayın Takvimi', '/calendar', '🗓️', 50),
('site-durumu', 'Site Durumu', '/status', '🛠️', 60),
('site-rehberi', 'Site Rehberi', '/guide', '📘', 70),
('yonetim-paneli', 'Yönetim Paneli', '/admin', '🛡️', 80),
('profil', 'Profil', '/profile', '👤', 90)
on conflict (slug) do update set
  title = excluded.title,
  href = excluded.href,
  icon = excluded.icon,
  sort_order = excluded.sort_order;

insert into public.maintenance_settings (key, enabled, title, message, progress)
values ('main', false, 'Site Güncelleniyor', 'Bakım modu kapalı.', 0)
on conflict (key) do nothing;

-- 9) Status başarı kaydı
insert into public.site_status_logs (version, status, detail)
values ('v1.1.9', 'success', 'Kurucu hesabı founder yapıldı; SQL güvenli migration mantığına taşındı ve mevcut veriler sıfırlanmadı.');

select
  'v1.1.9 başarıyla çalıştı' as status,
  'mertdundaroyunda@gmail.com hesabı founder/kurucu yapıldı' as kurucu_notu,
  'DROP TABLE ve TRUNCATE kullanılmadı; mevcut veriler korundu' as veri_koruma,
  'Eksik tablolar/kolonlar/policyler güvenli şekilde eklendi' as migration_notu,
  now() as calisma_zamani;

-- v1.2.1 - Oyun Yönetimi Merkezi / güvenli migration
-- KURAL: Veri sıfırlama yok. DROP TABLE yok. TRUNCATE yok.

alter table public.public_games add column if not exists category_slug text default '';
alter table public.public_games add column if not exists category_title text default '';
alter table public.public_games add column if not exists channel_slug text default '';
alter table public.public_games add column if not exists channel_title text default '';
alter table public.public_games add column if not exists series_slug text default '';
alter table public.public_games add column if not exists series_title text default '';
alter table public.public_games add column if not exists release_date date;
alter table public.public_games add column if not exists cover_url text default '';
alter table public.public_games add column if not exists banner_url text default '';
alter table public.public_games add column if not exists status text default 'Planlandı';
alter table public.public_games add column if not exists is_public boolean default true;
alter table public.public_games add column if not exists sort_order integer default 100;
alter table public.public_games add column if not exists updated_at timestamptz default now();

create index if not exists idx_public_games_slug on public.public_games(slug);
create index if not exists idx_public_games_category on public.public_games(category_slug);
create index if not exists idx_public_games_channel on public.public_games(channel_slug);
create index if not exists idx_public_games_status on public.public_games(status);

insert into public.site_status_logs (version, status, detail)
values ('v1.2.1', 'success', 'Oyun Kapakları ve Medya Merkezi eklendi; public_games medya kolonları güvenli migration ile güncellendi; mevcut veriler sıfırlanmadı.');

select
  'v1.2.1 başarıyla çalıştı' as status,
  'Oyun Yönetimi Merkezi aktif edildi' as yeni_ozellik,
  'public_games tablosu veri silmeden güncellendi' as veri_koruma,
  'Vercel deploy sayacı build sırasında public/deploy-info.json dosyasını günceller' as deploy_sayaci,
  now() as calisma_zamani;


-- v1.2.1 - Oyun Kapakları ve Medya Merkezi / güvenli migration
-- Veri sıfırlama yoktur. DROP TABLE / TRUNCATE kullanılmaz.
alter table public.public_games add column if not exists logo_url text default '';
alter table public.public_games add column if not exists media_note text default '';
alter table public.public_games add column if not exists media_status text default 'Eksik Kontrol';
alter table public.public_games add column if not exists updated_at timestamptz default now();

insert into public.site_status_logs (version, status, detail)
values ('v1.2.1', 'success', 'Oyun Kapakları ve Medya Merkezi eklendi; public_games medya kolonları güvenli migration ile güncellendi; mevcut veriler sıfırlanmadı.')
on conflict do nothing;

select
  'v1.2.1 başarıyla çalıştı' as status,
  'Oyun kapak/banner/logo medya alanları eklendi. Mevcut veriler korunur; tablo sıfırlama yoktur.' as detail;

-- v1.2.2 - Bölüm Yönetimi Merkezi / güvenli migration
-- Veri sıfırlama yoktur. DROP TABLE / TRUNCATE kullanılmaz.
create table if not exists public.public_episodes (
  id uuid primary key default gen_random_uuid(),
  series_slug text default '',
  series_title text default '',
  game_slug text default '',
  game_title text default '',
  title text not null,
  episode_no integer default 1,
  youtube_url text default '',
  thumbnail_url text default '',
  duration text default '',
  status text default 'Taslak',
  published_at timestamptz,
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.public_episodes add column if not exists series_slug text default '';
alter table public.public_episodes add column if not exists series_title text default '';
alter table public.public_episodes add column if not exists game_slug text default '';
alter table public.public_episodes add column if not exists game_title text default '';
alter table public.public_episodes add column if not exists title text default '';
alter table public.public_episodes add column if not exists episode_no integer default 1;
alter table public.public_episodes add column if not exists youtube_url text default '';
alter table public.public_episodes add column if not exists thumbnail_url text default '';
alter table public.public_episodes add column if not exists duration text default '';
alter table public.public_episodes add column if not exists status text default 'Taslak';
alter table public.public_episodes add column if not exists published_at timestamptz;
alter table public.public_episodes add column if not exists is_public boolean default true;
alter table public.public_episodes add column if not exists sort_order integer default 100;
alter table public.public_episodes add column if not exists updated_at timestamptz default now();

create index if not exists idx_public_episodes_game_slug on public.public_episodes(game_slug);
create index if not exists idx_public_episodes_series_slug on public.public_episodes(series_slug);
create index if not exists idx_public_episodes_status on public.public_episodes(status);
create index if not exists idx_public_episodes_sort_order on public.public_episodes(sort_order);

alter table public.public_episodes enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'public_episodes'
      and policyname = 'public read episodes v122'
  ) then
    create policy "public read episodes v122" on public.public_episodes
    for select using (is_public = true or auth.role() = 'authenticated');
  end if;
end $$;

insert into public.site_status_logs (version, status, detail)
values ('v1.2.2', 'success', 'Bölüm Yönetimi Merkezi eklendi; public_episodes güvenli migration ile güncellendi; mevcut veriler sıfırlanmadı.')
on conflict do nothing;

select
  'v1.2.2 başarıyla çalıştı' as status,
  'Bölüm ekleme, düzenleme, silme, yayın durumu ve YouTube URL alanları eklendi.' as yeni_ozellik,
  'public_episodes tablosu veri silmeden güncellendi' as veri_koruma,
  'Vercel/GitHub commit sürüm etiketi v1.2.2 olarak güncellendi' as deploy_notu,
  now() as calisma_zamani;

-- FIX: Kurucu yetkisi girişte user olarak görünmesin. Veri sıfırlamaz.
update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com');

insert into public.admin_roles (email, role, status)
values ('mertdundaroyunda@gmail.com', 'founder', 'active')
on conflict (email) do update set role = 'founder', status = 'active';

select 'Kurucu yetki fix çalıştı' as result;
