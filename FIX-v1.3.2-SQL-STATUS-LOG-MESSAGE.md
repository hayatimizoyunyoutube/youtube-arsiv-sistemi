# FIX v1.3.2 - SQL Status Log Message Kolonu

Bu paket **yeni sürüm değildir**, SQL hata düzeltmesidir.

## Hata
Supabase SQL çalışırken şu hata veriyordu:

```text
column "message" of relation "site_status_logs" does not exist
```

## Düzeltme
`site_status_logs` tablosunda eski paketlerde `detail`, yeni fixte `message` kullanıldığı için uyumsuzluk oluştu.
Bu fix, tabloyu sıfırlamadan eksik kolonları güvenli şekilde ekler:

- `detail text`
- `message text`

## Veri Koruma
- `DROP TABLE` yok
- `TRUNCATE` yok
- Kullanıcı yetkileri sıfırlanmaz
- Oyun/seri/bölüm/kategori verileri silinmez

## Supabase SQL gerekli mi?
✅ Evet, `supabase/schema.sql` tekrar çalıştırılmalı.
