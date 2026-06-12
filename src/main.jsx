import React from 'react';
import { createRoot } from 'react-dom/client';
import { Database, Rocket, FileText, Home, ShieldCheck, Sparkles } from 'lucide-react';
import './style.css';

const VERSION = '0.0.2';

function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="badge">v{VERSION} • Ana Sayfa İskeleti</div>
        <h1>Hayatımız Oyun Arşiv Sistemi</h1>
        <p>
          Oyun videoları, bölümler, seriler ve yayın planları için geliştirilen
          arşiv sitesinin ana sayfa temeli hazırlandı. Kullanıcı ekranında artık
          teknik GitHub repo bağlantısı gösterilmez.
        </p>
        <div className="actions">
          <span><Home size={18} /> Ana Sayfa Hazır</span>
          <span><Rocket size={18} /> Vercel Hazır</span>
          <span><Database size={18} /> Supabase Notları Hazır</span>
        </div>
      </section>

      <section className="cards">
        <article>
          <Sparkles />
          <h2>Temiz Ana Sayfa</h2>
          <p>Ziyaretçiye sadece siteye ait bilgiler gösterilir.</p>
        </article>
        <article>
          <ShieldCheck />
          <h2>Kullanıcıya Uygun Görünüm</h2>
          <p>GitHub repo butonu ve teknik bağlantı kullanıcı ekranından kaldırıldı.</p>
        </article>
        <article>
          <FileText />
          <h2>Güncel Sürüm Notları</h2>
          <p>v0.0.2 için dokümanlar, SQL notu ve ENV örneği güncellendi.</p>
        </article>
      </section>

      <section className="preview">
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
