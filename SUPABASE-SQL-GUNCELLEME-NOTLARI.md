# Supabase SQL Güncelleme Notları - v1.3.0

## Supabase SQL gerekli mi?
Evet.

## Ne eklendi?
- `youtube_playlists` tablosu
- `playlist_id`
- `playlist_url`
- `game_slug`, `game_title`
- `series_slug`, `series_title`
- `channel_slug`, `channel_title`
- `sync_status`
- `last_sync_note`
- `episode_count`
- RLS policyleri ve indexler

## Ne yapılmadı?
- Tablo sıfırlanmadı.
- Kullanıcı yetkileri silinmedi.
- Oyun, kategori, kanal, seri ve bölüm verileri silinmedi.
- Demo veri zorla eklenmedi.

## Results
SQL sonunda şu sonuç dönmelidir:

```sql
v1.3.0 başarıyla çalıştı
```
