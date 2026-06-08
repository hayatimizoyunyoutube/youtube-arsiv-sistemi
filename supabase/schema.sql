-- Hayatımız Oyun YouTube Arşivi
-- v1.1.3 - Supabase Kategori/Auth/Admin İskeleti
-- Supabase gereklidir. SQL Editor içinde çalıştır, Results alanında başarı satırını gör.

create extension if not exists pgcrypto;

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

create table if not exists public.public_series (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text default '',
  category_slug text default '',
  category_title text default '',
  channel_slug text default '',
  channel_title text default '',
  status text default 'Planlandı',
  episodes integer default 0,
  progress integer default 0,
  cover_url text default '',
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.public_categories enable row level security;
alter table public.public_channels enable row level security;
alter table public.public_series enable row level security;

drop policy if exists "Public categories read" on public.public_categories;
create policy "Public categories read" on public.public_categories for select using (is_public = true or auth.role() = 'authenticated');
drop policy if exists "Authenticated categories insert" on public.public_categories;
create policy "Authenticated categories insert" on public.public_categories for insert to authenticated with check (true);
drop policy if exists "Authenticated categories update" on public.public_categories;
create policy "Authenticated categories update" on public.public_categories for update to authenticated using (true) with check (true);
drop policy if exists "Authenticated categories delete" on public.public_categories;
create policy "Authenticated categories delete" on public.public_categories for delete to authenticated using (true);

drop policy if exists "Public channels read" on public.public_channels;
create policy "Public channels read" on public.public_channels for select using (is_public = true or auth.role() = 'authenticated');
drop policy if exists "Authenticated channels insert" on public.public_channels;
create policy "Authenticated channels insert" on public.public_channels for insert to authenticated with check (true);
drop policy if exists "Authenticated channels update" on public.public_channels;
create policy "Authenticated channels update" on public.public_channels for update to authenticated using (true) with check (true);
drop policy if exists "Authenticated channels delete" on public.public_channels;
create policy "Authenticated channels delete" on public.public_channels for delete to authenticated using (true);

drop policy if exists "Public series can be read by everyone" on public.public_series;
create policy "Public series can be read by everyone" on public.public_series for select using (is_public = true or auth.role() = 'authenticated');
drop policy if exists "Authenticated admins can insert public series" on public.public_series;
create policy "Authenticated admins can insert public series" on public.public_series for insert to authenticated with check (true);
drop policy if exists "Authenticated admins can update public series" on public.public_series;
create policy "Authenticated admins can update public series" on public.public_series for update to authenticated using (true) with check (true);
drop policy if exists "Authenticated admins can delete public series" on public.public_series;
create policy "Authenticated admins can delete public series" on public.public_series for delete to authenticated using (true);

-- Demo seed yok. Kayıtlar admin panelden/Supabase table editor'dan eklenecek.
select
  'v1.1.3 başarıyla çalıştı' as status,
  'public_categories, public_channels, public_series tabloları ve RLS policyleri hazır' as aciklama,
  'Giriş/Kayıt için Supabase Authentication > Users kullanılacak' as auth_notu,
  'Vercel env: VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY + Redeploy gerekli' as vercel_notu,
  now() as calisma_zamani;
