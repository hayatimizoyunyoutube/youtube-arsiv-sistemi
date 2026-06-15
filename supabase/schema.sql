-- Hayatimiz Oyun v0.2.5 Supabase Schema
create extension if not exists "pgcrypto";

drop table if exists public.episodes cascade;
drop table if exists public.game_collections cascade;
drop table if exists public.games cascade;
drop table if exists public.collections cascade;
drop table if exists public.series cascade;
drop table if exists public.tags cascade;

create table public.series (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  created_at timestamptz default now()
);

create table public.games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  status text default 'planned',
  cover_url text,
  release_date date,
  genres text[] default '{}',
  tags text[] default '{}',
  series_id uuid references public.series(id) on delete set null,
  steam_app_id text,
  rawg_id text,
  bulk_import_group text,
  last_edited_at timestamptz,
  created_at timestamptz default now()
);

create table public.episodes (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade,
  title text not null,
  youtube_url text,
  episode_number int,
  created_at timestamptz default now()
);

create table public.game_collections (
  game_id uuid references public.games(id) on delete cascade,
  collection_id uuid references public.collections(id) on delete cascade,
  primary key(game_id, collection_id)
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz default now()
);
