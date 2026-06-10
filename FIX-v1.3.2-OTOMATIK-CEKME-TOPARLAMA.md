# FIX v1.3.2 - Otomatik Çekme Toparlama

Bu paket yeni sürüm değildir, v1.3.2 düzeltmesidir.

## Düzeltildi
- Oyun Ekle merkezi tek ana kaynak yapıldı.
- RAWG + Steam otomatik çekme butonu oyun formuna bağlandı.
- 007 First Light gibi oyunlar James Bond serisine otomatik bağlanır.
- Hikaye/açıklama Türkçe arşiv özeti olarak doldurulur.
- Türler çoklu ve Türkçe doldurulur.
- Kapak/banner/logo Steam CDN varsa oradan, yoksa RAWG'dan doldurulur.
- Oyun kaydedilince kategori, kanal ve seri otomatik oluşturulur/güncellenir.
- YouTube playlist URL girilirse bölümler ve thumbnail'ler otomatik çekilir.
- Etiketler butonlu hale getirildi: Türkçe Altyazılı, Türkçe Dublajlı, Coop, DLC, %100.

## Supabase SQL gerekli mi?
Evet. Güvenli migration gerekir.

## SQL ne ekledi?
- `public_games`: `rawg_id`, `steam_appid`, `metacritic`, `rating`, `genres`, `tags`, `playlist_url`, `playlist_id`, `media_note`
- `public_series`: seri sayımı ve medya alanları için eksik kolon kontrolü
- `game_episodes`: YouTube video/thumbnail alanları kontrolü
- Slug ve YouTube ID bazlı güvenli indexler

## Veri/yetki sıfırlanır mı?
Hayır. `DROP TABLE` ve `TRUNCATE` yoktur.
