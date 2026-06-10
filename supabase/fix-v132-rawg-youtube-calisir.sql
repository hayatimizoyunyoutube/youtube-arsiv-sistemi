-- FIX v1.3.2 RAWG + YouTube Çalışır Hale Getirme
-- ÖNEMLİ: Bu dosya veri/yetki sıfırlamaz. DROP TABLE / TRUNCATE yoktur.

alter table if exists public.public_games add column if not exists rawg_id integer;
alter table if exists public.public_games add column if not exists metacritic integer;
alter table if exists public.public_games add column if not exists genres text[] default '{}';
alter table if exists public.public_games add column if not exists website text default '';
alter table if exists public.public_games add column if not exists rawg_background_url text default '';

create table if not exists public.youtube_playlists (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text,
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

alter table if exists public.game_episodes add column if not exists youtube_video_id text;
alter table if exists public.game_episodes add column if not exists thumbnail_url text default '';
alter table if exists public.game_episodes add column if not exists description text default '';
alter table if exists public.game_episodes add column if not exists episode_number integer;
alter table if exists public.game_episodes add column if not exists youtube_url text default '';
alter table if exists public.game_episodes add column if not exists published_at timestamptz;

create unique index if not exists game_episodes_youtube_video_id_unique
on public.game_episodes (youtube_video_id)
where youtube_video_id is not null and youtube_video_id <> '';

alter table public.youtube_playlists enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='youtube_playlists' and policyname='youtube_playlists_public_read'
  ) then
    create policy youtube_playlists_public_read on public.youtube_playlists for select using (is_public = true or auth.uid() is not null);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='youtube_playlists' and policyname='youtube_playlists_auth_write'
  ) then
    create policy youtube_playlists_auth_write on public.youtube_playlists for all using (auth.uid() is not null) with check (auth.uid() is not null);
  end if;
end $$;

select 'FIX v1.3.2 RAWG + YouTube çalışır hale getirildi. Eklenenler: public_games rawg_id/metacritic/genres/website/rawg_background_url, youtube_playlists güvenli alanları, game_episodes youtube_video_id/thumbnail_url/episode_number. Veri ve yetkiler sıfırlanmadı.' as result;
