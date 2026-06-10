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
('site-rehberi', 'YouTube Bölüm Çekme Altyapısı', '/guide', '📘', 70),
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

-- v1.2.4 - Kanal Yönetimi Gelişmiş / güvenli migration
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
values ('v1.2.4', 'success', 'Kanal Yönetimi Gelişmiş eklendi; public_episodes güvenli migration ile güncellendi; mevcut veriler sıfırlanmadı.')
on conflict do nothing;

select
  'v1.2.4 başarıyla çalıştı' as status,
  'Bölüm ekleme, düzenleme, silme, yayın durumu ve YouTube URL alanları eklendi.' as yeni_ozellik,
  'public_episodes tablosu veri silmeden güncellendi' as veri_koruma,
  'Vercel/GitHub commit sürüm etiketi v1.2.4 olarak güncellendi' as deploy_notu,
  now() as calisma_zamani;

-- FIX: Kurucu yetkisi girişte user olarak görünmesin. Veri sıfırlamaz.
update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com');

insert into public.admin_roles (email, role, status)
values ('mertdundaroyunda@gmail.com', 'founder', 'active')
on conflict (email) do update set role = 'founder', status = 'active';

select 'Kurucu yetki fix çalıştı' as result;


-- v1.2.4 - Kanal Yönetimi Gelişmiş / güvenli migration
-- Veri sıfırlama yoktur. DROP TABLE / TRUNCATE kullanılmaz.
create table if not exists public.public_series (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text default '',
  category_slug text default '',
  category_title text default '',
  channel_slug text default '',
  channel_title text default '',
  status text default 'Devam Ediyor',
  cover_url text default '',
  banner_url text default '',
  logo_url text default '',
  game_count integer default 0,
  episode_count integer default 0,
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.public_series add column if not exists slug text;
alter table public.public_series add column if not exists title text default '';
alter table public.public_series add column if not exists description text default '';
alter table public.public_series add column if not exists category_slug text default '';
alter table public.public_series add column if not exists category_title text default '';
alter table public.public_series add column if not exists channel_slug text default '';
alter table public.public_series add column if not exists channel_title text default '';
alter table public.public_series add column if not exists status text default 'Devam Ediyor';
alter table public.public_series add column if not exists cover_url text default '';
alter table public.public_series add column if not exists banner_url text default '';
alter table public.public_series add column if not exists logo_url text default '';
alter table public.public_series add column if not exists game_count integer default 0;
alter table public.public_series add column if not exists episode_count integer default 0;
alter table public.public_series add column if not exists is_public boolean default true;
alter table public.public_series add column if not exists sort_order integer default 100;
alter table public.public_series add column if not exists updated_at timestamptz default now();

alter table public.public_games add column if not exists series_slug text default '';
alter table public.public_games add column if not exists series_title text default '';
alter table public.public_episodes add column if not exists series_slug text default '';
alter table public.public_episodes add column if not exists series_title text default '';

create index if not exists idx_public_series_slug on public.public_series(slug);
create index if not exists idx_public_series_status on public.public_series(status);
create index if not exists idx_public_series_sort_order on public.public_series(sort_order);

alter table public.public_series enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'public_series'
      and policyname = 'public read series v123'
  ) then
    create policy "public read series v123" on public.public_series
    for select using (is_public = true or auth.role() = 'authenticated');
  end if;
end $$;

insert into public.site_status_logs (version, status, detail)
values ('v1.2.4', 'success', 'Kanal Yönetimi Gelişmiş eklendi; public_series güvenli migration ile güncellendi; mevcut veriler sıfırlanmadı.')
on conflict do nothing;

update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com');

select
  'v1.2.4 başarıyla çalıştı' as status,
  'Seri ekleme, düzenleme, silme ve oyunları seriye bağlama eklendi.' as yeni_ozellik,
  'public_series tablosu veri silmeden güncellendi' as veri_koruma,
  'Vercel/GitHub commit sürüm etiketi v1.2.4 olarak güncellendi' as deploy_notu,
  now() as calisma_zamani;


-- v1.2.4 Kanal Yönetimi Gelişmiş - güvenli migration
-- Veri sıfırlama yoktur. DROP TABLE / TRUNCATE kullanılmaz.

alter table public.public_channels add column if not exists title text;
alter table public.public_channels add column if not exists description text default '';
alter table public.public_channels add column if not exists channel_type text default 'YouTube';
alter table public.public_channels add column if not exists youtube_channel_id text default '';
alter table public.public_channels add column if not exists external_url text default '';
alter table public.public_channels add column if not exists logo_url text default '';
alter table public.public_channels add column if not exists banner_url text default '';
alter table public.public_channels add column if not exists status text default 'Aktif';
alter table public.public_channels add column if not exists sort_order integer default 100;
alter table public.public_channels add column if not exists is_public boolean default true;
alter table public.public_channels add column if not exists updated_at timestamptz default now();

-- Fix: Bazı projelerde public_channels içinde name kolonu yoktu.
-- Bu blok mevcut veriyi silmeden title alanını güvenli doldurur.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'public_channels' and column_name = 'name'
  ) then
    execute 'update public.public_channels set title = coalesce(nullif(title, ''''), nullif(name, ''''), slug) where title is null or title = ''''';
  else
    update public.public_channels
    set title = coalesce(nullif(title, ''), slug)
    where title is null or title = '';
  end if;
end $$;

create index if not exists idx_public_channels_slug_v124 on public.public_channels(slug);
create index if not exists idx_public_channels_status_v124 on public.public_channels(status);
create index if not exists idx_public_channels_sort_order_v124 on public.public_channels(sort_order);

insert into public.site_status_logs (version, status, detail)
values ('v1.2.4', 'success', 'Kanal Yönetimi Gelişmiş eklendi; public_channels güvenli migration ile güncellendi; mevcut veriler sıfırlanmadı.')
on conflict do nothing;

update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com');

select
  'v1.2.4 kanal SQL fix başarıyla çalıştı' as status,
  'public_channels title/name kolon hatası düzeltildi; kanal ekleme, düzenleme, silme alanları korunur.' as yeni_ozellik,
  'public_channels ve app_users dahil hiçbir tablo/veri/yetki sıfırlanmadı' as veri_koruma,
  'Yeni .env gerekli değil; mevcut VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY yeterli' as env_notu,
  'Vercel/GitHub commit sürüm etiketi v1.2.4 olarak güncellendi' as deploy_notu,
  now() as calisma_zamani;

-- v1.2.5 Yayın Takvimi 2.0 - güvenli migration
-- Veri sıfırlama yoktur. DROP TABLE / TRUNCATE kullanılmaz.
-- Mevcut kullanıcı yetkileri, oyunlar, kategoriler, kanallar, seriler ve bölümler korunur.

create table if not exists public.publish_calendar (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  game_slug text default '',
  game_title text default '',
  series_slug text default '',
  series_title text default '',
  episode_id uuid,
  episode_title text default '',
  publish_date date,
  publish_time time,
  status text default 'Planlandı',
  note text default '',
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.publish_calendar add column if not exists title text;
alter table public.publish_calendar add column if not exists game_slug text default '';
alter table public.publish_calendar add column if not exists game_title text default '';
alter table public.publish_calendar add column if not exists series_slug text default '';
alter table public.publish_calendar add column if not exists series_title text default '';
alter table public.publish_calendar add column if not exists episode_id uuid;
alter table public.publish_calendar add column if not exists episode_title text default '';
alter table public.publish_calendar add column if not exists publish_date date;
alter table public.publish_calendar add column if not exists publish_time time;
alter table public.publish_calendar add column if not exists status text default 'Planlandı';
alter table public.publish_calendar add column if not exists note text default '';
alter table public.publish_calendar add column if not exists is_public boolean default true;
alter table public.publish_calendar add column if not exists sort_order integer default 100;
alter table public.publish_calendar add column if not exists created_at timestamptz default now();
alter table public.publish_calendar add column if not exists updated_at timestamptz default now();

update public.publish_calendar
set title = coalesce(nullif(title, ''), 'Planlanmış Yayın')
where title is null or title = '';

create index if not exists idx_publish_calendar_date_v125 on public.publish_calendar(publish_date);
create index if not exists idx_publish_calendar_status_v125 on public.publish_calendar(status);
create index if not exists idx_publish_calendar_public_v125 on public.publish_calendar(is_public);
create index if not exists idx_publish_calendar_sort_v125 on public.publish_calendar(sort_order);

alter table public.publish_calendar enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'publish_calendar'
      and policyname = 'public read publish calendar v125'
  ) then
    create policy "public read publish calendar v125" on public.publish_calendar
    for select using (is_public = true or auth.role() = 'authenticated');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'publish_calendar'
      and policyname = 'auth write publish calendar v125'
  ) then
    create policy "auth write publish calendar v125" on public.publish_calendar
    for all to authenticated using (true) with check (true);
  end if;
end $$;

insert into public.site_status_logs (version, status, detail)
values ('v1.2.5', 'success', 'Yayın Takvimi 2.0 eklendi; publish_calendar güvenli migration ile güncellendi; mevcut veriler ve yetkiler sıfırlanmadı.')
on conflict do nothing;

-- Sadece belirtilen mevcut hesabın kurucu rolünü korur. Diğer kullanıcıların yetkilerine dokunmaz.
update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com');

select
  'v1.2.5 başarıyla çalıştı' as status,
  'Yayın takvimi ekleme, düzenleme, silme ve public takvim görünümü eklendi.' as yeni_ozellik,
  'publish_calendar tablosu veri silmeden güncellendi; kullanıcı yetkileri sıfırlanmadı' as veri_koruma,
  'Yeni .env gerekli değil; mevcut VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY yeterli' as env_notu,
  'Vercel/GitHub commit sürüm etiketi v1.2.5 olarak güncellendi' as deploy_notu,
  now() as calisma_zamani;


-- =====================================================
-- v1.2.6 Bakım Modu ve Site Ayarları - Güvenli Migration
-- Bu bölüm tablo/veri/yetki sıfırlamaz. DROP/TRUNCATE kullanılmaz.
-- =====================================================

create table if not exists public.site_runtime_config (
  id text primary key default 'main',
  maintenance_enabled boolean default false,
  maintenance_title text default 'Site Güncelleniyor',
  maintenance_message text default 'Hayatımız Oyun arşivi kısa süreli bakımda.',
  maintenance_notes text default '',
  maintenance_estimated_end text default '',
  updated_at timestamptz default now()
);

alter table public.site_runtime_config add column if not exists maintenance_enabled boolean default false;
alter table public.site_runtime_config add column if not exists maintenance_title text default 'Site Güncelleniyor';
alter table public.site_runtime_config add column if not exists maintenance_message text default 'Hayatımız Oyun arşivi kısa süreli bakımda.';
alter table public.site_runtime_config add column if not exists maintenance_notes text default '';
alter table public.site_runtime_config add column if not exists maintenance_estimated_end text default '';
alter table public.site_runtime_config add column if not exists updated_at timestamptz default now();

insert into public.site_runtime_config (id, maintenance_enabled, maintenance_title, maintenance_message, maintenance_notes, maintenance_estimated_end)
values ('main', false, 'Site Güncelleniyor', 'Hayatımız Oyun arşivi kısa süreli bakımda.', '', '')
on conflict (id) do nothing;

create table if not exists public.site_settings (
  id text primary key default 'main',
  site_title text default 'Hayatımız Oyun',
  site_subtitle text default 'YouTube Oynatma Listesi Arşivi',
  discord_url text default '',
  youtube_url text default '',
  kick_url text default '',
  instagram_url text default '',
  tiktok_url text default '',
  updated_at timestamptz default now()
);

alter table public.site_settings add column if not exists site_title text default 'Hayatımız Oyun';
alter table public.site_settings add column if not exists site_subtitle text default 'YouTube Oynatma Listesi Arşivi';
alter table public.site_settings add column if not exists discord_url text default '';
alter table public.site_settings add column if not exists youtube_url text default '';
alter table public.site_settings add column if not exists kick_url text default '';
alter table public.site_settings add column if not exists instagram_url text default '';
alter table public.site_settings add column if not exists tiktok_url text default '';
alter table public.site_settings add column if not exists updated_at timestamptz default now();

insert into public.site_settings (id, site_title, site_subtitle)
values ('main', 'Hayatımız Oyun', 'YouTube Oynatma Listesi Arşivi')
on conflict (id) do nothing;

alter table public.site_runtime_config enable row level security;
alter table public.site_settings enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='site_runtime_config' and policyname='public read runtime config v126') then
    create policy "public read runtime config v126" on public.site_runtime_config for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='site_runtime_config' and policyname='auth write runtime config v126') then
    create policy "auth write runtime config v126" on public.site_runtime_config for all to authenticated using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='site_settings' and policyname='public read site settings v126') then
    create policy "public read site settings v126" on public.site_settings for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='site_settings' and policyname='auth write site settings v126') then
    create policy "auth write site settings v126" on public.site_settings for all to authenticated using (true) with check (true);
  end if;
end $$;

insert into public.site_status_logs (version, status, detail)
values ('v1.2.8', 'success', 'Dashboard ve veri sağlığı merkezi eklendi; bu sürüm için yeni SQL gerekli, mevcut veriler ve kullanıcı yetkileri sıfırlanmadı.')
on conflict do nothing;

update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com');

select
  'v1.2.8 başarıyla çalıştı' as status,
  'Dashboard istatistikleri ve veri sağlığı merkezi eklendi.' as yeni_ozellik,
  'Yeni tablo/kolon eklenmedi; mevcut tablolar okunur. SQL çalıştırılırsa veri silmez.' as sql_eklenenler,
  'Kullanıcı yetkileri, oyunlar, seriler, kategoriler, kanallar, bölümler ve takvim verileri sıfırlanmadı' as veri_koruma,
  'Yeni .env gerekli değil; mevcut VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY yeterli' as env_notu,
  'Vercel/GitHub commit sürüm etiketi v1.2.8 olarak güncellendi' as deploy_notu,
  now() as calisma_zamani;

-- v1.3.1 - YouTube Bölüm Çekme Altyapısı
-- Güvenli migration: tablo/veri/yetki sıfırlamaz. DROP TABLE/TRUNCATE yoktur.
create table if not exists public.youtube_playlists (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  playlist_id text default '',
  playlist_url text default '',
  game_slug text default '',
  game_title text default '',
  series_slug text default '',
  series_title text default '',
  channel_slug text default '',
  channel_title text default '',
  status text default 'Hazır',
  sync_status text default 'Bekliyor',
  last_sync_note text default '',
  episode_count integer default 0,
  cover_url text default '',
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.youtube_playlists add column if not exists slug text;
alter table public.youtube_playlists add column if not exists title text;
alter table public.youtube_playlists add column if not exists playlist_id text default '';
alter table public.youtube_playlists add column if not exists playlist_url text default '';
alter table public.youtube_playlists add column if not exists game_slug text default '';
alter table public.youtube_playlists add column if not exists game_title text default '';
alter table public.youtube_playlists add column if not exists series_slug text default '';
alter table public.youtube_playlists add column if not exists series_title text default '';
alter table public.youtube_playlists add column if not exists channel_slug text default '';
alter table public.youtube_playlists add column if not exists channel_title text default '';
alter table public.youtube_playlists add column if not exists status text default 'Hazır';
alter table public.youtube_playlists add column if not exists sync_status text default 'Bekliyor';
alter table public.youtube_playlists add column if not exists last_sync_note text default '';
alter table public.youtube_playlists add column if not exists episode_count integer default 0;
alter table public.youtube_playlists add column if not exists cover_url text default '';
alter table public.youtube_playlists add column if not exists is_public boolean default true;
alter table public.youtube_playlists add column if not exists sort_order integer default 100;
alter table public.youtube_playlists add column if not exists created_at timestamptz default now();
alter table public.youtube_playlists add column if not exists updated_at timestamptz default now();

create unique index if not exists youtube_playlists_slug_key on public.youtube_playlists(slug);
create index if not exists youtube_playlists_playlist_id_idx on public.youtube_playlists(playlist_id);
create index if not exists youtube_playlists_game_slug_idx on public.youtube_playlists(game_slug);
create index if not exists youtube_playlists_series_slug_idx on public.youtube_playlists(series_slug);

alter table public.youtube_playlists enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='youtube_playlists' and policyname='public read youtube playlists v130') then
    create policy "public read youtube playlists v130" on public.youtube_playlists for select using (is_public = true or auth.role() = 'authenticated');
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='youtube_playlists' and policyname='auth write youtube playlists v130') then
    create policy "auth write youtube playlists v130" on public.youtube_playlists for all to authenticated using (true) with check (true);
  end if;
end $$;

insert into public.site_status_logs (version, status, detail)
values ('v1.3.1', 'success', 'YouTube playlist kayıt altyapısı eklendi. youtube_playlists tablosu oluşturuldu/güncellendi. Mevcut veriler ve yetkiler sıfırlanmadı.')
on conflict do nothing;

update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com') and role is distinct from 'founder';

select
  'v1.3.1 başarıyla çalıştı' as status,
  'YouTube playlist kayıt altyapısı eklendi.' as yeni_ozellik,
  'youtube_playlists tablosu, playlist_id, playlist_url, oyun/seri/kanal bağlantı alanları, sync_status ve indexler eklendi.' as sql_eklenenler,
  'DROP TABLE/TRUNCATE yok; kullanıcı yetkileri ve mevcut içerikler sıfırlanmadı.' as veri_koruma,
  'Yeni .env gerekmez. YouTube API anahtarı v1.3.1 bölüm çekme sürümünde istenecek.' as env_notu,
  now() as calisma_zamani;

-- v1.3.1 - YouTube Bölüm Çekme Altyapısı
-- Güvenli migration: tablo/veri/yetki sıfırlamaz. DROP TABLE/TRUNCATE yoktur.
create table if not exists public.game_episodes (
  id uuid primary key default gen_random_uuid(),
  slug text,
  title text not null,
  description text default '',
  game_slug text default '',
  game_title text default '',
  series_slug text default '',
  series_title text default '',
  youtube_url text default '',
  youtube_video_id text,
  thumbnail_url text default '',
  duration text default '',
  episode_number integer default 0,
  sort_order integer default 100,
  status text default 'Taslak',
  published_at timestamptz,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.game_episodes add column if not exists slug text;
alter table public.game_episodes add column if not exists title text;
alter table public.game_episodes add column if not exists description text default '';
alter table public.game_episodes add column if not exists game_slug text default '';
alter table public.game_episodes add column if not exists game_title text default '';
alter table public.game_episodes add column if not exists series_slug text default '';
alter table public.game_episodes add column if not exists series_title text default '';
alter table public.game_episodes add column if not exists youtube_url text default '';
alter table public.game_episodes add column if not exists youtube_video_id text;
alter table public.game_episodes add column if not exists thumbnail_url text default '';
alter table public.game_episodes add column if not exists duration text default '';
alter table public.game_episodes add column if not exists episode_number integer default 0;
alter table public.game_episodes add column if not exists sort_order integer default 100;
alter table public.game_episodes add column if not exists status text default 'Taslak';
alter table public.game_episodes add column if not exists published_at timestamptz;
alter table public.game_episodes add column if not exists is_public boolean default true;
alter table public.game_episodes add column if not exists created_at timestamptz default now();
alter table public.game_episodes add column if not exists updated_at timestamptz default now();

create unique index if not exists game_episodes_youtube_video_id_key on public.game_episodes(youtube_video_id) where youtube_video_id is not null;
create index if not exists game_episodes_game_slug_idx on public.game_episodes(game_slug);
create index if not exists game_episodes_series_slug_idx on public.game_episodes(series_slug);
create index if not exists game_episodes_sort_order_idx on public.game_episodes(sort_order);

alter table public.game_episodes enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='game_episodes' and policyname='public read game episodes v131') then
    create policy "public read game episodes v131" on public.game_episodes for select using (is_public = true or auth.role() = 'authenticated');
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='game_episodes' and policyname='auth write game episodes v131') then
    create policy "auth write game episodes v131" on public.game_episodes for all to authenticated using (true) with check (true);
  end if;
end $$;

insert into public.site_status_logs (version, status, detail)
values ('v1.3.1', 'success', 'YouTube playlistten bölüm çekme altyapısı eklendi. game_episodes tablosuna YouTube video alanları ve indexler eklendi. Mevcut veriler ve yetkiler sıfırlanmadı.')
on conflict do nothing;

update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com') and role is distinct from 'founder';

select
  'v1.3.1 başarıyla çalıştı' as status,
  'YouTube playlistten bölüm çekme altyapısı eklendi.' as yeni_ozellik,
  'game_episodes tablosuna youtube_video_id, youtube_url, thumbnail_url, published_at, episode_number alanları ve indexler eklendi.' as sql_eklenenler,
  'DROP TABLE/TRUNCATE yok; kullanıcı yetkileri ve mevcut içerikler sıfırlanmadı.' as veri_koruma,
  'Yeni .env gerekli: Vercel Environment Variables içine YOUTUBE_API_KEY eklenmeli.' as env_notu,
  now() as calisma_zamani;

-- FIX v1.3.2 - Otomatik çekme toparlama
-- Veri/yetki sıfırlamaz. DROP TABLE / TRUNCATE yoktur.

alter table public.public_games add column if not exists rawg_id text default '';
alter table public.public_games add column if not exists steam_appid text default '';
alter table public.public_games add column if not exists metacritic text default '';
alter table public.public_games add column if not exists rating text default '';
alter table public.public_games add column if not exists genres text default '';
alter table public.public_games add column if not exists tags text default '';
alter table public.public_games add column if not exists playlist_url text default '';
alter table public.public_games add column if not exists playlist_id text default '';
alter table public.public_games add column if not exists media_note text default '';
alter table public.public_series add column if not exists game_count integer default 0;
alter table public.public_series add column if not exists episode_count integer default 0;
alter table public.public_series add column if not exists logo_url text default '';
alter table public.public_series add column if not exists sort_order integer default 100;
alter table public.game_episodes add column if not exists thumbnail_url text default '';
alter table public.game_episodes add column if not exists youtube_video_id text;
alter table public.game_episodes add column if not exists episode_number integer default 0;

create unique index if not exists public_games_slug_unique_fix_v132 on public.public_games(slug);
create unique index if not exists public_series_slug_unique_fix_v132 on public.public_series(slug);
create unique index if not exists public_categories_slug_unique_fix_v132 on public.public_categories(slug);
create unique index if not exists public_channels_slug_unique_fix_v132 on public.public_channels(slug);
create unique index if not exists youtube_playlists_playlist_id_unique_fix_v132 on public.youtube_playlists(playlist_id) where playlist_id is not null and playlist_id <> '';
create unique index if not exists game_episodes_youtube_video_id_unique_fix_v132 on public.game_episodes(youtube_video_id) where youtube_video_id is not null and youtube_video_id <> '';

insert into public.site_status_logs (version, status, detail)
values ('v1.3.2-fix', 'success', 'Oyun Ekle merkezi otomasyon düzeltildi: RAWG/Steam otomatik doldurma, kategori/kanal/seri otomatik bağlama, YouTube playlistten bölüm/thumbnail çekme ve tag alanları eklendi. Veri/yetki sıfırlanmadı.')
on conflict do nothing;

update public.app_users
set role = 'founder', status = 'active', is_banned = false, ban_reason = '', updated_at = now()
where lower(email) = lower('mertdundaroyunda@gmail.com') and role is distinct from 'founder';

select
  'v1.3.2 otomatik çekme fix başarıyla çalıştı' as status,
  'public_games: rawg_id, steam_appid, metacritic, rating, genres, tags, playlist_url, playlist_id, media_note alanları eklendi.' as oyun_tablosu,
  'public_series/public_categories/public_channels slug bazlı otomatik bağlama için unique indexler eklendi.' as baglanti_tablolari,
  'game_episodes/youtube_playlists için YouTube video ve playlist indexleri eklendi; thumbnail_url korunur.' as youtube_bolumleri,
  'DROP TABLE/TRUNCATE yok; kullanıcı yetkileri ve mevcut veriler sıfırlanmadı.' as veri_koruma,
  now() as calisma_zamani;

-- =========================================================
-- FIX v1.3.2 - Oyun tarih/kapak + YouTube playlist bölüm çekme
-- Güvenli migration: DROP/TRUNCATE yok, mevcut veri/yetki korunur.
-- =========================================================

alter table public.public_games add column if not exists release_date date;
alter table public.public_games add column if not exists rawg_id text default '';
alter table public.public_games add column if not exists steam_appid text default '';
alter table public.public_games add column if not exists metacritic text default '';
alter table public.public_games add column if not exists rating text default '';
alter table public.public_games add column if not exists genres text default '';
alter table public.public_games add column if not exists tags text default '';
alter table public.public_games add column if not exists playlist_url text default '';
alter table public.public_games add column if not exists playlist_id text default '';
alter table public.public_games add column if not exists media_note text default '';

alter table public.public_episodes add column if not exists youtube_video_id text;
alter table public.public_episodes add column if not exists youtube_url text default '';
alter table public.public_episodes add column if not exists thumbnail_url text default '';
alter table public.public_episodes add column if not exists episode_number integer default 0;
alter table public.public_episodes add column if not exists episode_no integer default 0;
alter table public.public_episodes add column if not exists game_slug text default '';
alter table public.public_episodes add column if not exists game_title text default '';
alter table public.public_episodes add column if not exists series_slug text default '';
alter table public.public_episodes add column if not exists series_title text default '';
alter table public.public_episodes add column if not exists published_at timestamptz;
alter table public.public_episodes add column if not exists is_public boolean default true;
alter table public.public_episodes add column if not exists sort_order integer default 100;

create unique index if not exists public_episodes_youtube_video_id_unique_fix_v132b
on public.public_episodes(youtube_video_id) where youtube_video_id is not null and youtube_video_id <> '';

insert into public.site_status_logs(version, status, message)
values ('v1.3.2-fix', 'success', 'Oyun tarih/kapak otomatik çekme ve YouTube playlist bölüm/thumbnail çekme düzeltildi. public_episodes alanları eklendi. Veri/yetki sıfırlanmadı.')
on conflict do nothing;

select
  'v1.3.2 otomatik çekme tarih/kapak + YouTube playlist fix başarıyla çalıştı' as result,
  'public_games: release_date/rawg_id/steam_appid/metacritic/rating/genres/tags/playlist alanları güvenli kontrol edildi.' as oyun_tablosu,
  'public_episodes: youtube_video_id, youtube_url, thumbnail_url, episode_number, game/series bağlantı alanları eklendi.' as bolum_tablosu,
  'Yetkiler ve mevcut veriler korunur; DROP TABLE/TRUNCATE yok.' as veri_koruma;
