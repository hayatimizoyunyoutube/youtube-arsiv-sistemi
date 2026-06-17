// Supabase bağlantısını başlat
const supabaseUrl = 'https://cdreaudjyujawqbfqnhv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcmVhdWRqeXVqYXdxYmZxbmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3OTA1MjEsImV4cCI6MjA5NjM2NjUyMX0.GhOMtDDJO8rqnvFdg8rTJVcxdxnFX1tJeaNGAC-tPlI';

window.supabase = supabase.createClient(supabaseUrl, supabaseKey);
console.log("Supabase bağlandı.");