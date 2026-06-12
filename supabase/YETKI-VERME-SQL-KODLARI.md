# 👑 Supabase Üzerinden Yetki Verme Kodları

Bu dosya v4.0.5 içindir. `schema.sql` çalıştırıldıktan sonra Supabase üzerinden yetki verebilirsin.

## 1) Table Editor ile yetki verme
Supabase > Table Editor > `site_authority_assignments` tablosuna gir.

Yeni satır ekle:

| Alan | Örnek |
|---|---|
| email | kullanici@mail.com |
| display_name | Kullanıcı Adı |
| role_code | moderator |
| is_active | true |
| note | Elle yetki verildi |

Kullanılacak roller:

- `kurucu` = 👑 Kurucu
- `yonetici` = 🛡️ Yönetici
- `moderator` = 🛡️ Moderatör
- `editor` = ✍️ İçerik Editörü
- `user` = 👤 Üye
- `banned` = 🚫 Banlı

## 2) SQL Editor ile hızlı yetki verme

```sql
select * from public.set_site_user_role('kullanici@mail.com','kurucu','Kullanıcı Adı');
select * from public.set_site_user_role('mod@mail.com','moderator','Moderatör Adı');
select * from public.set_site_user_role('editor@mail.com','editor','İçerik Editörü Adı');
select * from public.set_site_user_role('uye@mail.com','user','Üye Adı');
select * from public.set_site_user_role('banli@mail.com','banned','Banlı Kullanıcı');
```

## 3) Yetkileri kontrol etme

```sql
select * from public.site_authority_panel;
```

## Not
Bu schema mevcut verileri silmez. `DROP TABLE` yoktur.
