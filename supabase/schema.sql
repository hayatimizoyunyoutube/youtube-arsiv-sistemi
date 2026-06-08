-- Hayatımız Oyun YouTube Arşivi
-- v1.1.4 - SQL RESET + Temel Admin Tabloları
-- DİKKAT: Bu dosya aşağıdaki public tabloları silip yeniden oluşturur.
-- Auth > Users tablosunu SİLMEZ. Sadece public app_users profillerini sıfırlar.

create extension if not exists pgcrypto;

-- Eski public tabloları temizle
DROP TABLE IF EXISTS public.site_status_logs CASCADE;
DROP TABLE IF EXISTS public.maintenance_settings CASCADE;
DROP TABLE IF EXISTS public.admin_activity_logs CASCADE;
DROP TABLE IF EXISTS public.admin_notes CASCADE;
DROP TABLE IF EXISTS public.publish_calendar CASCADE;
DROP TABLE IF EXISTS public.public_episodes CASCADE;
DROP TABLE IF EXISTS public.public_series CASCADE;
DROP TABLE IF EXISTS public.public_games CASCADE;
DROP TABLE IF EXISTS public.public_channels CASCADE;
DROP TABLE IF EXISTS public.public_categories CASCADE;
DROP TABLE IF EXISTS public.app_users CASCADE;
DROP TABLE IF EXISTS public.admin_roles CASCADE;
DROP TABLE IF EXISTS public.site_menu_items CASCADE;

create table public.app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text unique,
  display_name text default '',
  role text default 'user',
  status text default 'active',
  avatar_url text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.admin_roles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin',
  status text not null default 'active',
  created_at timestamptz default now()
);

create table public.public_categories (
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

create table public.public_channels (
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

create table public.public_games (
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

create table public.public_series (
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

create table public.public_episodes (
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

create table public.publish_calendar (
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

create table public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  note text default '',
  status text default 'Aktif',
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.maintenance_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  enabled boolean default false,
  title text default 'Site Güncelleniyor',
  message text default 'Kısa süre sonra tekrar deneyin.',
  progress integer default 0,
  updated_at timestamptz default now()
);

create table public.admin_activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_email text default '',
  action text not null,
  detail text default '',
  created_at timestamptz default now()
);

create table public.site_status_logs (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  status text not null,
  detail text default '',
  created_at timestamptz default now()
);

create table public.site_menu_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  href text not null,
  icon text default '',
  sort_order integer default 100,
  is_public boolean default true,
  created_at timestamptz default now()
);

-- RLS
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

-- Public okuma policyleri
create policy "public read categories" on public.public_categories for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read channels" on public.public_channels for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read games" on public.public_games for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read series" on public.public_series for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read episodes" on public.public_episodes for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read calendar" on public.publish_calendar for select using (is_public = true or auth.role() = 'authenticated');
create policy "public read maintenance" on public.maintenance_settings for select using (true);
create policy "public read status" on public.site_status_logs for select using (true);
create policy "public read menu" on public.site_menu_items for select using (is_public = true or auth.role() = 'authenticated');

-- Auth kullanıcı yönetim policyleri
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

-- Fotoğraftaki üst menü sırası
insert into public.site_menu_items (slug, title, href, icon, sort_order) values
('ana-sayfa', 'Ana Sayfa', '/', '🏠', 10),
('arsiv', 'Arşiv', '/archive', '🎮', 20),
('koleksiyonlar', 'Koleksiyonlar', '/collections', '📁', 30),
('seriler', 'Seriler', '/series', '🎬', 40),
('yayin-takvimi', 'Yayın Takvimi', '/calendar', '🗓️', 50),
('site-durumu', 'Site Durumu', '/status', '🛠️', 60),
('site-rehberi', 'Site Rehberi', '/guide', '📘', 70),
('yonetim-paneli', 'Yönetim Paneli', '/admin', '🛡️', 80),
('profil', 'Profil', '/profile', '👤', 90);

-- Başlangıç ayarı ve status başarı kaydı
insert into public.maintenance_settings (key, enabled, title, message, progress)
values ('main', false, 'Site Güncelleniyor', 'Bakım modu kapalı.', 0);

insert into public.site_status_logs (version, status, detail)
values ('v1.1.4', 'success', 'SQL reset tamamlandı: oyunlar, kullanıcılar, kategoriler, kanallar, seriler, bölümler, takvim, notlar, bakım, status ve menü tabloları oluşturuldu.');

select
  'v1.1.4 başarıyla çalıştı' as status,
  'SQL reset tamamlandı' as reset_notu,
  'public_games, app_users, public_categories, public_channels, public_series, public_episodes, publish_calendar, admin_notes, maintenance_settings, site_status_logs, site_menu_items hazır' as tablolar,
  'Vercel env: VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY + Redeploy gerekli' as vercel_notu,
  now() as calisma_zamani;
