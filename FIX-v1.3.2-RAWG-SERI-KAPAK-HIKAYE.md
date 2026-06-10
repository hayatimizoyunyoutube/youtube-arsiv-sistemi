# FIX v1.3.2 - RAWG Seri / Kapak / Hikaye Düzeltmesi

Bu paket **yeni sürüm değildir**, v1.3.2 fix paketidir.

## Düzeltildi

- Kapak / banner / logo önizlemelerinde bozuk görsel varsa otomatik yedek görsel gösterilir.
- RAWG sonucu seçilince oyun serisi otomatik anlaşılır. Örneğin `007 First Light` için seri `James Bond` olarak doldurulur.
- Oyun kaydedilince `public_series` içine seri kaydı otomatik oluşturulur/güncellenir. Bu yüzden Seriler sayfası oyun ekledikten sonra boş kalmaz.
- RAWG açıklaması İngilizce gelse bile arşiv alanına daha uzun Türkçe hikaye/özet yazılır.
- RAWG türleri çoklu alınır ve Türkçe karşılığı forma aktarılır.
- Steam kapak URL bozuksa sayfa kırılmaz, yedek görsel gösterir.

## Supabase SQL gerekli mi?

Evet, gerekli.

## SQL ne ekler?

- `public_games.story_tr`
- `public_games.steam_app_id`
- `public_games.steam_cover_url`
- `public_games.tags`
- `public_games.genres`
- `public_games.website`
- `public_series.logo_url`
- `public_series.game_count`
- `public_series.episode_count`

## SQL ne yapmaz?

- Tablo sıfırlamaz.
- Kullanıcı yetkilerini silmez.
- Oyun/seri/bölüm verilerini silmez.
- `DROP TABLE` / `TRUNCATE` kullanmaz.
