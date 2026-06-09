# Supabase SQL Güncelleme Notları

## Fix: v1.2.4 kanal SQL hatası

Supabase SQL gerekli: **Evet**

### Ne düzeltildi?
- `public_channels` tablosunda `name` kolonu olmayan projelerde oluşan hata düzeltildi.
- Hatalı satır artık güvenli `DO $$ ... $$` bloğu ile çalışır.
- `title` boşsa önce `name` varsa onu, yoksa `slug` değerini kullanır.

### Ne eklendi/güncellendi?
- `public_channels.title`
- `public_channels.description`
- `public_channels.channel_type`
- `public_channels.youtube_channel_id`
- `public_channels.external_url`
- `public_channels.logo_url`
- `public_channels.banner_url`
- `public_channels.status`
- `public_channels.sort_order`
- `public_channels.is_public`
- `public_channels.updated_at`
- Kanal indexleri

### Veri koruma
- Kullanıcı yetkileri sıfırlanmaz.
- `app_users.role` değerleri korunur.
- Tablo silme yoktur.
- `DROP TABLE` yoktur.
- `TRUNCATE` yoktur.
- Demo veriyle overwrite yoktur.

### Results beklenen çıktı
```sql
status: v1.2.4 kanal SQL fix başarıyla çalıştı
```
