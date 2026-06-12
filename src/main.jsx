import React from 'react';
import { createRoot } from 'react-dom/client';
import { Archive, CalendarDays, Gamepad2, Home, MonitorSmartphone, Sparkles, Trophy, Users } from 'lucide-react';
import './style.css';

const VERSION = '0.0.4';

const stats = [
  { label: 'Oyun', value: '0', note: 'Arşiv sistemi hazırlanıyor' },
  { label: 'Seri', value: '0', note: 'Seri sayfaları sonraki sürümde' },
  { label: 'Bölüm', value: '0', note: 'Bölüm sistemi planlandı' },
  { label: 'Durum', value: 'Hazır', note: 'Vercel build uyumlu' },
];

function App() {
  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">🎮 Hayatımız Oyun</div>
        <nav className="nav" aria-label="Ana Menü">
          <a href="#anasayfa"><Home size={16} /> Ana Sayfa</a>
          <a href="#arsiv"><Archive size={16} /> Arşiv</a>
          <a href="#takvim"><CalendarDays size={16} /> Takvim</a>
        </nav>
      </header>

      <section id="anasayfa" className="hero">
        <div className="badge">v{VERSION} • Mobil Uyum ve Ana Sayfa</div>
        <h1>Hayatımız Oyun Arşiv Sistemi</h1>
        <p>
          Bu sürümde ana sayfa daha profesyonel hale getirildi, mobil görünüm güçlendirildi
          ve kullanıcı ekranında teknik GitHub repo bağlantıları gösterilmeden temiz bir tanıtım alanı hazırlandı.
        </p>
        <div className="actions" aria-label="Sistem Durumu">
          <span><MonitorSmartphone size={18} /> Mobil Uyumlu</span>
          <span><Sparkles size={18} /> Tasarım Yenilendi</span>
          <span><Trophy size={18} /> v{VERSION} Hazır</span>
        </div>
      </section>

      <section className="stats" aria-label="Site İstatistikleri">
        {stats.map((item) => (
          <article key={item.label}>
            <strong>{item.value}</strong>
            <h2>{item.label}</h2>
            <p>{item.note}</p>
          </article>
        ))}
      </section>

      <section id="arsiv" className="cards">
        <article>
          <Gamepad2 />
          <h2>Arşiv Başlangıcı</h2>
          <p>Oyun kartları için alan hazırlandı. v0.0.5 sürümünde ilk oyun kart sistemi başlayacak.</p>
        </article>
        <article>
          <CalendarDays />
          <h2>Yayın Takvimi Hazırlığı</h2>
          <p>Takvim görünümü için kullanıcıya açık alan ayrıldı. Gelecek sürümlerde planlama sistemi eklenecek.</p>
        </article>
        <article>
          <Users />
          <h2>Kullanıcı Dostu Ekran</h2>
          <p>Teknik bağlantılar ziyaretçi ekranından kaldırıldı, sadece site özellikleri gösteriliyor.</p>
        </article>
      </section>

      <section id="takvim" className="preview">
        <h2>📌 Sıradaki Plan</h2>
        <div className="preview-grid">
          <span>🎮 v0.0.5 Oyun Kartları</span>
          <span>📚 v0.0.6 Arşiv Temeli</span>
          <span>🔍 v0.0.7 Arama Sistemi</span>
          <span>🏷️ v0.0.8 Kategori Sistemi</span>
        </div>
      </section>

      <footer>
        <strong>Hayatımız Oyun</strong> • Site Sürümü: v{VERSION} • Vercel Build Hazır
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
