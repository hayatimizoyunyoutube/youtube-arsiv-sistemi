# v1.1.4 - SQL Reset + Menü Kategori Düzeni

Supabase gerekli.

## Eklenenler

- SQL tabloları sıfırlanacak şekilde `supabase/schema.sql` yenilendi.
- Oyunlar için `public_games` tablosu eklendi.
- Kullanıcı profilleri için `app_users` tablosu eklendi.
- Seriler, bölümler, kategoriler, kanallar, yayın takvimi, notlar, bakım, status ve menü tabloları eklendi.
- SQL sonunda Supabase Results alanında `v1.1.4 başarıyla çalıştı` yazısı eklendi.
- Üst menü fotoğraftaki sıraya göre tek satır yapıldı.
- Yönetim paneli içindeki butonlar tek sıra kompakt hale getirildi.

## Supabase

Gerekli. Supabase SQL Editor içinde `supabase/schema.sql` çalıştırılmalı.

Dikkat: Bu schema ilgili public tabloları sıfırlar. Auth kullanıcılarını silmez.
