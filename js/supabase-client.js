// Supabase bağlantı ayarları
const supabaseUrl = 'https://cdreaudjyujawqbfqnhv.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcmVhdWRqeXVqYXdxYmZxbmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3OTA1MjEsImV4cCI6MjA5NjM2NjUyMX0.GhOMtDDJO8rqnvFdg8rTJVcxdxnFX1tJeaNGAC-tPlI'; 

// Supabase objesini global olarak oluşturuyoruz
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log("🟢 v0.0.1 - Supabase bağlantısı aktif!");

