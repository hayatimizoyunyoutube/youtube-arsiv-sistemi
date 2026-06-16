// Supabase kütüphanesini başlatıyoruz
const supabaseUrl = 'https://cdreaudjyujawqbfqnhv.supabase.co/'; // .env'deki URL'yi buraya da yaz
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcmVhdWRqeXVqYXdxYmZxbmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3OTA1MjEsImV4cCI6MjA5NjM2NjUyMX0.GhOMtDDJO8rqnvFdg8rTJVcxdxnFX1tJeaNGAC-tPlI'; // .env'deki KEY'i buraya da yaz

// Global olarak supabase objesini oluşturuyoruz
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log("🟢 Supabase bağlantısı başarıyla hazırlandı!");