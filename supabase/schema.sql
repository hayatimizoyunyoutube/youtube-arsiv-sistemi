-- Hayatımız Oyun v0.2.2 Supabase Schema
-- Eski public tabloları siler ve temiz kurulum yapar.

do $$ 
declare
  r record;
begin
  for r in (select tablename from pg_tables where schemaname = 'public') loop
    execute 'drop table if exists public.' || quote_ident(r.tablename) || ' cascade';
  end loop;
end $$;

create extension if not exists "pgcrypto";

create table games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  status text default 'Yakında',
  cover_url text,
  release_date date,
  genres text[] default '{}',
  tags text[] default '{}',
  steam_app_id text,
  rawg_id text,
  created_at timestamptz default now()
);

create table episodes (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references games(id) on delete cascade,
  title text not null,
  youtube_url text,
  episode_number int,
  created_at timestamptz default now()
);

create table series (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table collections (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  created_at timestamptz default now()
);

create table site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

insert into site_settings(key,value) values ('site_version','v0.2.2');
