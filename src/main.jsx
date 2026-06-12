import React from 'react';
import { createRoot } from 'react-dom/client';
import { Database, Rocket, FileText } from 'lucide-react';
import './style.css';

const VERSION = '0.0.1';

function App() {
  return (
    <main className="page">
      <section className="hero">
        <div className="badge">v{VERSION} • Temiz Proje Başlangıcı</div>
        <h1>Hayatımız Oyun Arşiv Sistemi</h1>
        <p>
          YouTube arşiv sitesi adım adım versiyonlanarak geliştirilecek.
          Bu paket temel proje altyapısını, GitHub gönderme dosyasını,
          Vercel build ayarlarını ve Supabase başlangıç notlarını içerir.
        </p>
        <div className="actions">
          <a href="https://github.com/hayatimizoyunyoutube/youtube-arsiv-sistemi" target="_blank" rel="noreferrer">
            <span className="emoji-icon">🐙</span> GitHub Repo
          </a>
          <span><Rocket size={18} /> Vercel Hazır</span>
          <span><Database size={18} /> Supabase Notları Hazır</span>
        </div>
      </section>

      <section className="cards">
        <article>
          <FileText />
          <h2>README</h2>
          <p>Kurulum, çalıştırma ve deploy bilgileri yazıldı.</p>
        </article>
        <article>
          <Rocket />
          <h2>Vercel</h2>
          <p>Build komutu: <code>npm run build</code></p>
        </article>
        <article>
          <Database />
          <h2>Supabase</h2>
          <p>v0.0.1 için tablo gerekmiyor. Güvenli SQL bilgilendirme dosyası eklendi.</p>
        </article>
      </section>

      <footer>
        <strong>Hayatımız Oyun</strong> • Site Sürümü: v{VERSION}
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
