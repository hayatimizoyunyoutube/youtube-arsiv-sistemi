-- Hayatımız Oyun YouTube Arşivi
-- v1.1.0 - İlk Supabase Public Veri Başlangıcı
-- Bu sürüm sadece public seri listesi için başlangıç tablosu ekler.
-- Admin/Auth/YouTube/RAWG yoktur.

create table if not exists public.public_series (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text default '',
  category_slug text default 'genel',
  category_title text default 'Genel',
  channel_slug text default 'hayatimiz-oyun',
  channel_title text default 'Hayatımız Oyun',
  status text default 'Planlandı',
  episodes integer default 0,
  progress integer default 0,
  cover_url text default '',
  is_public boolean default true,
  sort_order integer default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.public_series enable row level security;

drop policy if exists "Public series can be read by everyone" on public.public_series;
create policy "Public series can be read by everyone"
  on public.public_series
  for select
  using (is_public = true);

insert into public.public_series (
  slug, title, description, category_slug, category_title, channel_slug, channel_title, status, episodes, progress, cover_url, sort_order
) values
('resident-evil', 'Resident Evil', 'Korku ve hayatta kalma odaklı demo seri.', 'korku', 'Korku', 'hayatimiz-oyun', 'Hayatımız Oyun', 'Tamamlandı', 32, 100, 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 10),
('silent-hill', 'Silent Hill', 'Psikolojik korku atmosferli demo seri.', 'korku', 'Korku', 'korku-geceleri', 'Korku Geceleri', 'Devam Ediyor', 14, 45, 'https://images.unsplash.com/photo-1542751110-97427bbecf20', 20),
('assassins-creed', 'Assassin''s Creed', 'Aksiyon ve tarihi macera odaklı demo seri.', 'aksiyon', 'Aksiyon', 'hayatimiz-oyun', 'Hayatımız Oyun', 'Yakında', 0, 0, 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6', 30)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  category_slug = excluded.category_slug,
  category_title = excluded.category_title,
  channel_slug = excluded.channel_slug,
  channel_title = excluded.channel_title,
  status = excluded.status,
  episodes = excluded.episodes,
  progress = excluded.progress,
  cover_url = excluded.cover_url,
  sort_order = excluded.sort_order,
  updated_at = now();
