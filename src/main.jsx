import React from 'react';
import { createRoot } from 'react-dom/client';
import { Database, Rocket, FileText, Home, ShieldCheck, Sparkles, Menu, Archive, CalendarDays } from 'lucide-react';
import './style.css';

const VERSION = '0.0.3';

function App() {
  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">🎮 Hayatımız Oyun</div>
        <nav className="nav">
          <a href="#anasayfa"><Home size={16} /> Ana Sayfa</a>
          <a href="#arsiv"><Archive size={16} /> Arşiv</a>
          <a href="#takvim"><CalendarDays size={16} /> Takvim</a>
        </nav>
      </header>

      <section id="anasayfa" className="hero">
        <div className="badge">v{VERSION} • Menü Sistemi Başlangıcı</div>
        <h1>Hayatımız Oyun Arşiv Sistemi</h1>
        <p>
          Ana sayfa iskeletinin üstüne kullanıcıya uygun üst menü sistemi eklendi.
          Teknik GitHub repo bağlantısı ziyaretçi ekranında gösterilmez.
        </p>
        <div className="actions">
          <span><Menu size={18} /> Menü Hazır</span>
          <span><Rocket size={18} /> Vercel Hazır</span>
          <span><Database size={18} /> Supabase Notları Hazır</span>
        </div>
      </section>

      <section className="cards">
        <article>
          <Sparkles />
          <h2>Üst Menü</h2>
          <p>Ana Sayfa, Arşiv ve Takvim bağlantıları için başlangıç navigasyonu eklendi.</p>
        </article>
        <article>
          <ShieldCheck />
          <h2>Kullanıcı Ekranı Temiz</h2>
          <p>Repo ve teknik yönetim bağlantıları normal ziyaretçiden gizli tutuldu.</p>
        </article>
        <article>
          <FileText />
          <h2>BAT Temizlik Düzeltildi</h2>
          <p>Temizleme dosyası artık .git klasörünü ve .bat dosyalarını koruyarak çalışır.</p>
        </article>
      </section>

      <section id="arsiv" className="preview">
        <h2>Yakında Eklenecek Alanlar</h2>
        <div className="preview-grid">
          <span>🎮 Oyun Kartları</span>
          <span>📚 Arşiv Sayfası</span>
          <span>📅 Yayın Takvimi</span>
          <span>👑 Yönetim Paneli</span>
        </div>
      </section>

      <footer>
        <strong>Hayatımız Oyun</strong> • Site Sürümü: v{VERSION}
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
