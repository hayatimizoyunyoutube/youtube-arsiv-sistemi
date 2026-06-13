-- Hayatımız Oyun Arşiv Sistemi v0.2.0
-- Supabase SQL başlangıç dosyası

create table if not exists public.series (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  status text not null default 'Devam Ediyor' check (status in ('Devam Ediyor','Tamamlandı','Yakında')),
  release_year int,
  platform text default 'PC',
  genres text[] default '{}',
  tags text[] default '{}',
  cover_url text,
  series_id uuid references public.series(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.episodes (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade,
  title text not null,
  episode_no int,
  youtube_url text,
  thumbnail_url text,
  created_at timestamptz default now()
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  cover_url text,
  created_at timestamptz default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

alter table public.series enable row level security;
alter table public.games enable row level security;
alter table public.episodes enable row level security;
alter table public.collections enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Public read series" on public.series;
create policy "Public read series" on public.series for select using (true);
drop policy if exists "Public read games" on public.games;
create policy "Public read games" on public.games for select using (true);
drop policy if exists "Public read episodes" on public.episodes;
create policy "Public read episodes" on public.episodes for select using (true);
drop policy if exists "Public read collections" on public.collections;
create policy "Public read collections" on public.collections for select using (true);
drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings" on public.site_settings for select using (true);

insert into public.site_settings(key,value) values
('site_version', '"v0.2.0"'::jsonb),
('site_title', '"Hayatımız Oyun Arşiv Sistemi"'::jsonb)
on conflict (key) do update set value=excluded.value, updated_at=now();
