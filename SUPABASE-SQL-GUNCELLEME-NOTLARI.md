# Supabase SQL Güncelleme Notları - v1.2.9

## Supabase SQL gerekli mi?
Hayır.

## Tablolara ne eklendi?
Hiçbir tabloya yeni kolon veya veri eklenmedi.

## Veri/yetki sıfırlama var mı?
Hayır. Bu sürüm SQL çalıştırmaz; mevcut kullanıcı, rol, oyun, kategori, kanal, seri, bölüm ve bakım ayarları korunur.

## Sonraki SQL kuralı
Bundan sonraki SQL dosyaları migration mantığında olacak:
- `DROP TABLE` yok
- `TRUNCATE` yok
- Mevcut rol/yetki overwrite yok
- Sadece eksik tablo/kolon/policy ekleme var
