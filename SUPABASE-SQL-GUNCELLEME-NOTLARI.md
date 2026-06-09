# Supabase SQL Güncelleme Notları

## v1.2.5 Yayın Takvimi 2.0

Supabase SQL gerekli: **Evet**

### Ne eklendi/güncellendi?
- `publish_calendar` tablosu yoksa oluşturulur.
- `publish_calendar.title`
- `publish_calendar.game_slug`
- `publish_calendar.game_title`
- `publish_calendar.series_slug`
- `publish_calendar.series_title`
- `publish_calendar.episode_id`
- `publish_calendar.episode_title`
- `publish_calendar.publish_date`
- `publish_calendar.publish_time`
- `publish_calendar.status`
- `publish_calendar.note`
- `publish_calendar.is_public`
- `publish_calendar.sort_order`
- `publish_calendar.created_at`
- `publish_calendar.updated_at`
- Takvim indexleri
- Public okuma / yetkili yazma policy kontrolü

### Veri koruma
- Kullanıcı yetkileri sıfırlanmaz.
- `app_users.role` değerleri korunur.
- Tablo silme yoktur.
- `DROP TABLE` yoktur.
- `TRUNCATE` yoktur.
- Demo veriyle overwrite yoktur.

### Results beklenen çıktı
```sql
status: v1.2.5 başarıyla çalıştı
```
