-- Hayatımız Oyun v0.2.4 Supabase Schema
create extension if not exists "pgcrypto";

create table if not exists series (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  cover_url text,
  created_at timestamptz default now()
);

create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  series_id uuid references series(id) on delete set null,
  collection_id uuid references collections(id) on delete set null,
  title text not null,
  slug text unique not null,
  status text not null default 'planned',
  cover_url text,
  release_date date,
  genres text[] default '{}',
  tags text[] default '{}',
  steam_app_id text,
  rawg_id text,
  created_at timestamptz default now()
);

create table if not exists episodes (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  title text not null,
  youtube_url text,
  episode_number int,
  season_number int default 1,
  created_at timestamptz default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz default now()
);

create index if not exists idx_games_status on games(status);
create index if not exists idx_games_title on games(title);
create index if not exists idx_episodes_game_id on episodes(game_id);
