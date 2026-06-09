# v1.2.6 Fix - Ayar Kaydı ve F5 Koruma

Bu paket sürüm değildir, v1.2.6 üzerine fix paketidir.

## Düzeltilenler

- `column site_runtime_config.sort_order does not exist` hatası düzeltildi.
- Bakım modu ve site ayarları kaydedildikten sonra F5 yapınca eskiye dönme sorunu düzeltildi.
- `site_runtime_config` ve `site_settings` tek kayıt ayar tabloları artık `sort_order` ile okunmaz.
- Mevcut kullanıcı yetkileri, kurucu rolü ve kayıtlı veriler sıfırlanmaz.

## Supabase SQL

Supabase SQL gerekli.

## Yeni .env

Yeni `.env` gerekmez.
