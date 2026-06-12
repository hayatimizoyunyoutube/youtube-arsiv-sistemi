-- v4.0.5 SUPABASE TEMIZ RESET + IDempotent GAMES/EPISODES SCHEMA
-- Bu dosya istek üzerine TEMIZ RESET yapar: games ve episodes verilerini sıfırlar.
-- site_users/yetki/kullanıcı tablolarını silmez.
-- Reset istemediğin güncellemelerde migration dosyası kullan.

create extension if not exists pgcrypto;

do $$
begin
  if to_regclass('public.games') is not null then
    execute 'create table if not exists public.games_reset_backup_v402 as select *, now() as backup_created_at from public.games where false';
    execute 'insert into public.games_reset_backup_v402 select *, now() as backup_created_at from public.games';
  end if;
end $$;

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  description text default '',
  story_text text default '',
  status text default 'Devam Eden',
  status_slug text default 'devam-eden',
  status_bucket text default '',
  genre text default 'Genel',
  genre_slug text default 'genel',
  tags text default '',
  platforms text default '',
  release_date text default '',
  score numeric default 0,
  cover_url text default '',
  banner_url text default '',
  series_name text default '',
  series_slug text default '',
  collection_name text default '',
  playlist_url text default '',
  youtube_playlist_url text default '',
  youtube_playlist_id text default '',
  video_url text default '',
  episodes jsonb default '[]'::jsonb,
  episode_count int default 0,
  watched_episode_count int default 0,
  series_order int default 0,
  sort_order int default 0,
  rawg_id text,
  rawg_slug text default '',
  steam_app_id text default '',
  meta_source text default '',
  meta_checked_at timestamptz,
  cover_source text default '',
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.games add column if not exists slug text;
alter table public.games add column if not exists title text;
alter table public.games add column if not exists description text default '';
alter table public.games add column if not exists story_text text default '';
alter table public.games add column if not exists status text default 'Devam Eden';
alter table public.games add column if not exists status_slug text default 'devam-eden';
alter table public.games add column if not exists status_bucket text default '';
alter table public.games add column if not exists genre text default 'Genel';
alter table public.games add column if not exists genre_slug text default 'genel';
alter table public.games add column if not exists tags text default '';
alter table public.games add column if not exists platforms text default '';
alter table public.games add column if not exists release_date text default '';
alter table public.games add column if not exists score numeric default 0;
alter table public.games add column if not exists cover_url text default '';
alter table public.games add column if not exists banner_url text default '';
alter table public.games add column if not exists series_name text default '';
alter table public.games add column if not exists series_slug text default '';
alter table public.games add column if not exists collection_name text default '';
alter table public.games add column if not exists playlist_url text default '';
alter table public.games add column if not exists youtube_playlist_url text default '';
alter table public.games add column if not exists youtube_playlist_id text default '';
alter table public.games add column if not exists video_url text default '';
alter table public.games add column if not exists episodes jsonb default '[]'::jsonb;
alter table public.games add column if not exists episode_count int default 0;
alter table public.games add column if not exists watched_episode_count int default 0;
alter table public.games add column if not exists series_order int default 0;
alter table public.games add column if not exists sort_order int default 0;
alter table public.games add column if not exists rawg_id text;
alter table public.games add column if not exists rawg_slug text default '';
alter table public.games add column if not exists steam_app_id text default '';
alter table public.games add column if not exists meta_source text default '';
alter table public.games add column if not exists meta_checked_at timestamptz;
alter table public.games add column if not exists cover_source text default '';
alter table public.games add column if not exists is_featured boolean default false;
alter table public.games add column if not exists created_at timestamptz default now();
alter table public.games add column if not exists updated_at timestamptz default now();

create table if not exists public.episodes (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references public.games(id) on delete cascade,
  episode_number int not null default 1,
  title text not null default '',
  description text default '',
  youtube_video_id text,
  youtube_url text default '',
  thumbnail_url text default '',
  playlist_id text default '',
  duration text default '',
  published_at timestamptz,
  is_watched boolean default false,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.episodes add column if not exists game_id uuid references public.games(id) on delete cascade;
alter table public.episodes add column if not exists episode_number int default 1;
alter table public.episodes add column if not exists title text default '';
alter table public.episodes add column if not exists description text default '';
alter table public.episodes add column if not exists youtube_video_id text;
alter table public.episodes add column if not exists youtube_url text default '';
alter table public.episodes add column if not exists thumbnail_url text default '';
alter table public.episodes add column if not exists playlist_id text default '';
alter table public.episodes add column if not exists duration text default '';
alter table public.episodes add column if not exists published_at timestamptz;
alter table public.episodes add column if not exists is_watched boolean default false;
alter table public.episodes add column if not exists sort_order int default 0;
alter table public.episodes add column if not exists created_at timestamptz default now();
alter table public.episodes add column if not exists updated_at timestamptz default now();

-- Constraint hatası fix: eski/yarım kalan constraint varsa önce güvenli kaldırılır.
alter table public.episodes drop constraint if exists episodes_game_number_unique;

-- TEMIZ RESET: yeni arşiv başlangıcı için sadece oyun ve bölüm kayıtları sıfırlanır.
truncate table public.episodes restart identity cascade;
truncate table public.games restart identity cascade;

-- YouTube playlist upsert için idempotent benzersiz index.
create unique index if not exists episodes_game_number_unique_idx on public.episodes(game_id, episode_number);

alter table public.games enable row level security;
alter table public.episodes enable row level security;

drop policy if exists "games_public_read" on public.games;
drop policy if exists "games_admin_write" on public.games;
drop policy if exists "episodes_public_read" on public.episodes;
drop policy if exists "episodes_admin_write" on public.episodes;

create policy "games_public_read" on public.games for select using (true);
create policy "games_admin_write" on public.games for all using (true) with check (true);
create policy "episodes_public_read" on public.episodes for select using (true);
create policy "episodes_admin_write" on public.episodes for all using (true) with check (true);

create index if not exists games_slug_idx on public.games(slug);
create index if not exists games_title_idx on public.games(title);
create index if not exists games_series_idx on public.games(series_name);
create index if not exists games_status_idx on public.games(status);
create index if not exists episodes_game_idx on public.episodes(game_id);
create index if not exists episodes_playlist_idx on public.episodes(playlist_id);
create index if not exists episodes_video_idx on public.episodes(youtube_video_id);

create table if not exists public.site_runtime_config (
  key text primary key,
  value jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

insert into public.site_runtime_config(key,value,updated_at)
values ('site_version', jsonb_build_object('version','v4.0.5','label','v4.0.5 YouTube SteamDB Playlist Kesin Fix','vercel_label','v4.0.5-youtube-steamdb-playlist-kesin-fix','status','Başarılı'), now())
on conflict (key) do update set value=excluded.value, updated_at=now();

insert into public.site_runtime_config(key,value,updated_at)
values ('maintenance_mode', jsonb_build_object('enabled',false,'message','Site yayında.','percent',100,'adminBypass',true), now())
on conflict (key) do update set value=excluded.value, updated_at=now();

select 'Başarılı' as durum, 'v4.0.5' as surum, 'Games + Episodes reset schema kuruldu; constraint çakışması giderildi; YouTube playlistItems çıktısı episodes tablosuna yazılmaya hazır.' as islem;
