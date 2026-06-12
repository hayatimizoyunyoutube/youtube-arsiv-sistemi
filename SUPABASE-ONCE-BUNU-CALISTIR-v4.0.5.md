# Supabase v4.0.5 Sırası

1. `supabase/schema.sql` çalıştır.
2. Hata almadan biterse Vercel'e deploy et.
3. Panelden oyun eklerken YouTube playlist URL girip **Oynatma Listesi Bölümlerini Çek** butonuna bas.
4. Bölümler `episodes` tablosuna yazılır.

Bu fix özellikle şu hatayı çözer:
`relation "episodes_game_number_unique" already exists`
