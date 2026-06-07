import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import SeriesCard from './components/SeriesCard.jsx';
import { series } from './data/series.js';
import { categories } from './data/categories.js';
import { channels } from './data/channels.js';
import { completedUpdates, plannedUpdates } from './data/updates.js';
import { siteConfig } from './config/site.js';

const VERSION = siteConfig.version;

const menuItems = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Seriler', href: '/series' },
  { label: 'Kategoriler', href: '/categories' },
  { label: 'Kanallar', href: '/channels' },
  { label: 'Güncellemeler', href: '/updates' },
  { label: 'Durum', href: '/status' },
];

function Layout({ children }) {
  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Hayatımız Oyun Ana Sayfa">
          <span className="brand-mark">HO</span>
          <span>
            <strong>Hayatımız Oyun</strong>
            <small>YouTube Oynatma Listesi Arşivi</small>
          </span>
        </a>

        <nav className="nav" aria-label="Ana menü">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>
      </header>

      {children}

      <nav className="mobile-bottom-nav" aria-label="Mobil hızlı menü">
        {menuItems.map((item) => (
          <a key={item.label} href={item.href}>
            <span>{item.label === 'Ana Sayfa' ? '🏠' : item.label === 'Seriler' ? '🎞️' : item.label === 'Kategoriler' ? '🗂️' : item.label === 'Kanallar' ? '📺' : item.label === 'Güncellemeler' ? '📝' : '✅'}</span>
            <b>{item.label}</b>
          </a>
        ))}
      </nav>

      <footer className="footer">
        <span>Hayatımız Oyun Arşivi</span>
        <span>{VERSION}</span>
      </footer>
    </main>
  );
}

function HomePage() {
  const totalEpisodes = series.reduce((sum, item) => sum + item.episodes, 0);
  const completedCount = series.filter((item) => item.status === 'Tamamlandı').length;
  const activeSeries = series.filter((item) => item.status === 'Devam Ediyor');
  const featuredSeries = series.slice(0, 3);
  const latestSeries = [...series].slice().reverse().slice(0, 3);

  return (
    <Layout>
      <section className="hero-card showcase-hero">
        <div className="showcase-copy">
          <div className="version-pill">🎬 {VERSION} • Profesyonel Ana Sayfa Vitrini</div>
          <h1>Hayatımız Oyun arşivi artık daha sinematik görünüyor.</h1>
          <p>
            Bu sürümde ana sayfa büyük hero, vitrin kartları, devam eden seriler, son eklenenler ve hızlı keşif alanlarıyla public beta görünümünden profesyonel arşiv platformuna yaklaştırıldı.
          </p>
          <div className="hero-actions">
            <a href="/series" className="primary-btn">Serileri Keşfet</a>
            <a href="/categories" className="ghost-btn">Kategoriler</a>
            <a href="/updates" className="ghost-btn">Sürüm Notları</a>
          </div>
        </div>

        <aside className="showcase-panel" aria-label="Ana vitrin özeti">
          <span>Arşiv Hazır</span>
          <strong>Tek yerde seri, kategori ve kanal akışı</strong>
          <p>Supabase ve YouTube API eklenmeden önce public deneyim güvenli demo verilerle cilalanıyor.</p>
          <div className="mini-metrics">
            <b>{series.length} seri</b>
            <b>{totalEpisodes} bölüm</b>
            <b>{categories.length} kategori</b>
          </div>
        </aside>
      </section>

      <section className="beta-stats premium-stats" aria-label="Arşiv istatistikleri">
        <article><span>{series.length}</span><p>Demo Seri</p></article>
        <article><span>{totalEpisodes}</span><p>Demo Bölüm</p></article>
        <article><span>{categories.length}</span><p>Kategori</p></article>
        <article><span>{channels.length}</span><p>Kanal</p></article>
      </section>

      <section className="series-section spotlight-section">
        <div className="section-heading">
          <span>🔥 Ana Vitrin</span>
          <h2>Öne çıkan seriler</h2>
          <p>Public kullanıcı ilk girişte doğrudan seri kartlarını, kategori bilgisini ve ilerleme durumunu görebilir.</p>
        </div>
        <div className="series-grid">
          {featuredSeries.map((item) => <SeriesCard key={item.id} {...item} />)}
        </div>
      </section>

      <section className="home-split">
        <div className="series-section split-card">
          <div className="section-heading compact-heading">
            <span>▶ Devam Eden Seriler</span>
            <h2>Şu an aktif</h2>
            <p>Devam eden demo seriler ana sayfada ayrı gösterilir.</p>
          </div>
          <div className="compact-list">
            {(activeSeries.length ? activeSeries : featuredSeries).map((item) => (
              <a href={`/series/${item.slug}`} key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.status} • %{item.progress}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="series-section split-card">
          <div className="section-heading compact-heading">
            <span>🆕 Son Eklenenler</span>
            <h2>Yeni vitrin</h2>
            <p>Son eklenen seri kartları için ayrı public alan hazırlandı.</p>
          </div>
          <div className="compact-list">
            {latestSeries.map((item) => (
              <a href={`/series/${item.slug}`} key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.category} • {item.episodes} bölüm</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-section discovery-grid" aria-label="Hızlı keşif alanları">
        <a className="info-card discovery-card" href="/series">
          <span>🎞️</span>
          <h2>Seriler</h2>
          <p>Tüm demo serileri kart görünümünde keşfet.</p>
        </a>
        <a className="info-card discovery-card" href="/categories">
          <span>🗂️</span>
          <h2>Kategoriler</h2>
          <p>Korku, aksiyon, RPG ve diğer kategori sayfalarına geç.</p>
        </a>
        <a className="info-card discovery-card" href="/channels">
          <span>📺</span>
          <h2>Kanallar</h2>
          <p>Demo kanal merkezinden arşiv akışını kontrol et.</p>
        </a>
      </section>

      <section className="beta-panel">
        <div>
          <span>✅ v1.0.3 Durumu</span>
          <h2>Profesyonel ana sayfa vitrini tamamlandı.</h2>
          <p>Bu aşamada hâlâ Supabase, YouTube API, RAWG, Steam ve admin paneli yok. Önce public arayüz parça parça sağlamlaştırılıyor.</p>
        </div>
        <ul>
          <li>✓ Tamamlanan seri: {completedCount}</li>
          <li>✓ Devam eden seri: {activeSeries.length}</li>
          <li>✓ Büyük hero ve vitrin paneli</li>
          <li>✓ Son eklenenler ve hızlı keşif alanları</li>
        </ul>
      </section>

      <Updates />
      <NextPlan />
    </Layout>
  );
}

function SeriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');

  const statusOptions = useMemo(() => [...new Set(series.map((item) => item.status))], []);

  const filteredSeries = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('tr-TR');

    return series.filter((item) => {
      const searchableText = `${item.title} ${item.description} ${item.category} ${item.channelTitle} ${item.status}`.toLocaleLowerCase('tr-TR');
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.categorySlug === categoryFilter;
      const matchesChannel = channelFilter === 'all' || item.channelSlug === channelFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesChannel;
    });
  }, [searchTerm, statusFilter, categoryFilter, channelFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setChannelFilter('all');
  };

  return (
    <Layout>
      <section className="series-section">
        <div className="section-heading">
          <span>🔎 Demo Arşiv Arama</span>
          <h2>Seriler</h2>
          <p>Seri adı, açıklama, kategori, kanal ve duruma göre arama/filtreleme yap. Her seri yine kendi detay sayfasında açılır.</p>
        </div>

        <div className="filter-panel" aria-label="Seri arama ve filtreleme paneli">
          <label className="search-field">
            <span>Seri ara</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Resident Evil, korku, hikaye..."
            />
          </label>

          <label>
            <span>Durum</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">Tüm durumlar</option>
              {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>

          <label>
            <span>Kategori</span>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="all">Tüm kategoriler</option>
              {categories.map((category) => <option key={category.slug} value={category.slug}>{category.title}</option>)}
            </select>
          </label>

          <label>
            <span>Kanal</span>
            <select value={channelFilter} onChange={(event) => setChannelFilter(event.target.value)}>
              <option value="all">Tüm kanallar</option>
              {channels.map((channel) => <option key={channel.slug} value={channel.slug}>{channel.title}</option>)}
            </select>
          </label>
        </div>

        <div className="filter-summary">
          <strong>{filteredSeries.length}</strong>
          <span>/ {series.length} demo seri gösteriliyor</span>
          <button type="button" onClick={clearFilters}>Filtreleri temizle</button>
        </div>

        {filteredSeries.length ? (
          <div className="series-grid">
            {filteredSeries.map((item) => <SeriesCard key={item.id} {...item} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Sonuç bulunamadı.</h3>
            <p>Arama kelimesini azaltmayı veya filtreleri temizlemeyi dene.</p>
            <button type="button" className="inline-reset" onClick={clearFilters}>Filtreleri temizle</button>
          </div>
        )}
      </section>
    </Layout>
  );
}

function SeriesDetailPage({ slug }) {
  const current = series.find((item) => item.slug === slug);

  if (!current) return <NotFoundPage />;

  const similarSeries = series
    .filter((item) => item.slug !== current.slug && item.categorySlug === current.categorySlug)
    .slice(0, 3);

  return (
    <Layout>
      <section className="series-detail-hero">
        <img src={current.image} alt={`${current.title} seri kapak görseli`} />
        <div className="series-detail-content">
          <span>🎞️ Seri Detayı • {current.status}</span>
          <h1>{current.title}</h1>
          <p>{current.longDescription}</p>
          <div className="detail-stats">
            <strong>{current.category}</strong>
            <strong>{current.channelTitle}</strong>
            <strong>{current.year}</strong>
            <strong>{current.episodes} bölüm</strong>
          </div>
          <div className="progress-box" aria-label="Seri ilerleme durumu">
            <div>
              <span>İlerleme</span>
              <b>%{current.progress}</b>
            </div>
            <div className="progress-line"><i style={{ width: `${current.progress}%` }} /></div>
          </div>
          <div className="hero-actions">
            <a className="primary-btn" href="/series">Tüm serilere dön</a>
            <a className="ghost-btn" href={`/categories/${current.categorySlug}`}>Kategoriye git</a>
            <a className="ghost-btn" href={`/channels/${current.channelSlug}`}>Kanala git</a>
          </div>
        </div>
      </section>

      <section className="series-section">
        <div className="section-heading">
          <span>📺 Demo Bölüm Listesi</span>
          <h2>Bölümler</h2>
          <p>Bu liste şimdilik elle yazılmış demo veridir. YouTube playlist bağlantısı ileriki sürümlerde eklenecek.</p>
        </div>

        {current.episodesList.length ? (
          <div className="episode-list">
            {current.episodesList.map((episode) => (
              <article className="episode-row" key={episode.no}>
                <strong>{String(episode.no).padStart(2, '0')}</strong>
                <div>
                  <h3>{episode.title}</h3>
                  <p>{episode.duration} • {episode.status}</p>
                </div>
                <span>{episode.status}</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Bölüm listesi henüz hazırlanmadı.</h3>
            <p>Bu seri planlandı/yakında durumunda olduğu için demo bölüm listesi boş bırakıldı.</p>
          </div>
        )}
      </section>

      <section className="series-section">
        <div className="section-heading">
          <span>🧭 Benzer Seriler</span>
          <h2>Aynı kategoriden</h2>
          <p>Detay sayfasından başka serilere geçiş testi için eklendi.</p>
        </div>

        <div className="series-grid">
          {(similarSeries.length ? similarSeries : series.filter((item) => item.slug !== current.slug).slice(0, 3))
            .map((item) => <SeriesCard key={item.id} {...item} />)}
        </div>
      </section>
    </Layout>
  );
}

function CategoriesPage() {
  return (
    <Layout>
      <section className="series-section">
        <div className="section-heading">
          <span>🗂️ Kategori Merkezi</span>
          <h2>Kategoriler</h2>
          <p>Her kategori ayrı sayfada açılır. Aynı sayfada karışık filtreleme yok.</p>
        </div>

        <div className="category-grid">
          {categories.map((category) => {
            const count = series.filter((item) => item.categorySlug === category.slug).length;
            return (
              <a className="category-card" href={`/categories/${category.slug}`} key={category.id}>
                <img src={category.cover} alt={`${category.title} kategorisi`} loading="lazy" />
                <div>
                  <span>{category.icon} {category.accent}</span>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <small>{count} bağlı demo seri</small>
                  <strong>Kategoriyi aç →</strong>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

function CategoryDetailPage({ slug }) {
  const category = categories.find((item) => item.slug === slug);
  const categorySeries = series.filter((item) => item.categorySlug === slug);

  if (!category) return <NotFoundPage />;

  return (
    <Layout>
      <section className="category-hero">
        <img src={category.cover} alt={`${category.title} kategori kapak görseli`} />
        <div>
          <span>🗂️ Kategori Detayı</span>
          <h1>{category.title}</h1>
          <p>{category.description}</p>
          <a className="ghost-btn" href="/categories">Tüm kategorilere dön</a>
        </div>
      </section>

      <section className="series-section">
        <div className="section-heading">
          <span>🎮 {category.title}</span>
          <h2>Bu kategorideki seriler</h2>
          <p>{categorySeries.length ? `${categorySeries.length} demo seri listeleniyor.` : 'Bu kategoriye bağlı demo seri henüz yok.'}</p>
        </div>

        <div className="series-grid">
          {categorySeries.map((item) => <SeriesCard key={item.id} {...item} />)}
        </div>
      </section>
    </Layout>
  );
}


function ChannelsPage() {
  return (
    <Layout>
      <section className="series-section">
        <div className="section-heading">
          <span>📺 Kanal Merkezi</span>
          <h2>Kanallar</h2>
          <p>Her kanal ayrı sayfada açılır. Bu aşamada tüm içerikler demo veridir.</p>
        </div>

        <div className="channel-grid">
          {channels.map((channel) => (
            <a className="channel-card" href={`/channels/${channel.slug}`} key={channel.id}>
              <img src={channel.cover} alt={`${channel.title} kanal kapak görseli`} loading="lazy" />
              <div>
                <span>{channel.status} • {channel.focus}</span>
                <h3>{channel.title}</h3>
                <p>{channel.description}</p>
                <small>{channel.seriesCount} seri • {channel.episodeCount} bölüm</small>
                <strong>Kanalı aç →</strong>
              </div>
            </a>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function ChannelDetailPage({ slug }) {
  const channel = channels.find((item) => item.slug === slug);

  if (!channel) return <NotFoundPage />;

  return (
    <Layout>
      <section className="category-hero">
        <img src={channel.cover} alt={`${channel.title} kanal kapak görseli`} />
        <div>
          <span>📺 Kanal Detayı • {channel.handle}</span>
          <h1>{channel.title}</h1>
          <p>{channel.description}</p>
          <div className="channel-stats">
            <strong>{channel.focus}</strong>
            <strong>{channel.status}</strong>
            <strong>{channel.seriesCount} seri</strong>
            <strong>{channel.episodeCount} bölüm</strong>
          </div>
          <a className="ghost-btn" href="/channels">Tüm kanallara dön</a>
        </div>
      </section>

      <section className="series-section">
        <div className="section-heading">
          <span>🧪 Demo Kanal İçeriği</span>
          <h2>Bu kanalın seri alanı</h2>
          <p>Şimdilik gerçek YouTube bağlantısı yok. v1.x aşamasına kadar demo veriyle ilerliyoruz.</p>
        </div>

        <div className="series-grid">
          {series.slice(0, Math.min(channel.seriesCount, series.length)).map((item) => <SeriesCard key={item.id} {...item} />)}
        </div>
      </section>
    </Layout>
  );
}

function UpdateCard({ update, type }) {
  return (
    <article className={`update-card ${type === 'planned' ? 'planned-update' : ''}`}>
      <div className="update-card-head">
        <span>{update.version}</span>
        {update.date && <small>{update.date}</small>}
      </div>
      <h3>{update.title}</h3>
      <p>{update.summary}</p>
      <ul>
        {update.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function UpdatesPage() {
  return (
    <Layout>
      <section className="updates-hero">
        <div>
          <span>📝 Güncelleme Merkezi</span>
          <h1>Adım adım sürüm takibi</h1>
          <p>
            Bu sayfada biten sürümler ve sıradaki planlar ayrı ayrı tutulur. Böylece hangi sürümde ne eklendiği karışmaz.
          </p>
        </div>
        <div className="release-target">
          <small>Ana hedef</small>
          <strong>v4.0.0</strong>
          <p>Yayın/açılış sürümü</p>
        </div>
      </section>

      <section className="updates-section">
        <div className="section-heading">
          <span>✅ Tamamlananlar</span>
          <h2>Biten sürümler</h2>
          <p>Şu ana kadar hazırlanan küçük ve kontrollü public site adımları.</p>
        </div>
        <div className="updates-grid">
          {completedUpdates.map((update) => <UpdateCard key={update.version} update={update} type="completed" />)}
        </div>
      </section>

      <section className="updates-section">
        <div className="section-heading">
          <span>📋 Planlananlar</span>
          <h2>Sıradaki adımlar</h2>
          <p>Henüz Supabase, YouTube API ve yönetim paneli yok. Önce public arayüz sağlamlaştırılacak.</p>
        </div>
        <div className="updates-grid planned-grid">
          {plannedUpdates.map((update) => <UpdateCard key={update.version} update={update} type="planned" />)}
        </div>
      </section>
    </Layout>
  );
}

function StatusSummary() {
  const checks = [
    'Ana sayfa açılıyor',
    'Seriler sayfası ve detay bağlantıları hazır',
    'Kategori sayfaları ayrı URL ile açılıyor',
    'Kanal sayfaları ayrı URL ile açılıyor',
    'Güncelleme merkezi çalışıyor',
    'Mobil alt menü aktif'
  ];

  return (
    <section className="status-preview">
      <div>
        <span>✅ Stabilite Kontrolü</span>
        <h2>v1.0.0 öncesi public sayfalar hazır.</h2>
        <p>Detaylı kontrol listesi için Durum sayfasını açabilirsin.</p>
      </div>
      <ul>
        {checks.map((check) => <li key={check}>✓ {check}</li>)}
      </ul>
      <a className="ghost-btn" href="/status">Durum sayfasına git</a>
    </section>
  );
}

function StatusPage() {
  const routeChecks = [
    { path: '/', label: 'Ana Sayfa', note: 'Hero, özet kartları ve sürüm bilgisi' },
    { path: '/series', label: 'Seriler', note: 'Arama, filtreleme ve seri kartları' },
    { path: '/series/resident-evil', label: 'Seri Detayı', note: 'Demo bölüm listesi ve benzer seriler' },
    { path: '/categories', label: 'Kategoriler', note: 'Kategori merkezi' },
    { path: '/categories/korku', label: 'Kategori Detayı', note: 'Ayrı kategori sayfası' },
    { path: '/channels', label: 'Kanallar', note: 'Kanal merkezi' },
    { path: '/channels/hayatimiz-oyun', label: 'Kanal Detayı', note: 'Ayrı kanal sayfası' },
    { path: '/updates', label: 'Güncellemeler', note: 'Tamamlanan ve planlanan sürümler' },
    { path: '/status', label: 'Durum', note: 'Bu kontrol sayfası' }
  ];

  return (
    <Layout>
      <section className="updates-hero status-hero">
        <div>
          <span>✅ Durum Kontrolü</span>
          <h1>v1.0.2 seri kartları kontrolü</h1>
          <p>Bu sayfa v1.0.2 seri kartları geliştirme route, sayfa ve temel içerik kontrolü için kullanılır. Hâlâ veritabanı/API yok; sadece public demo yapı test ediliyor.</p>
        </div>
        <div className="release-target">
          <small>Mevcut sürüm</small>
          <strong>{VERSION}</strong>
          <p>Seri Kartları Geliştirme</p>
        </div>
      </section>

      <section className="updates-section">
        <div className="section-heading">
          <span>🔗 Route Kontrol Listesi</span>
          <h2>Test edilecek sayfalar</h2>
          <p>Local testte bu bağlantılar tek tek açılmalı.</p>
        </div>
        <div className="status-list">
          {routeChecks.map((item) => (
            <a href={item.path} className="status-row" key={item.path}>
              <strong>✓ {item.label}</strong>
              <span>{item.path}</span>
              <small>{item.note}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="notes-card">
        <h2>🚫 Bilerek Eklenmeyenler</h2>
        <ul>
          <li>Supabase bağlantısı yok.</li>
          <li>YouTube playlist çekme yok.</li>
          <li>RAWG / Steam otomasyonu yok.</li>
          <li>Admin paneli yok.</li>
          <li>Kullanıcı giriş sistemi yok.</li>
        </ul>
      </section>
    </Layout>
  );
}

function Updates() {
  return (
    <section id="guncellemeler" className="notes-card">
      <h2>📌 v1.0.2 Tamamlananlar</h2>
      <ul>
        <li>✅ Seri Kartları Geliştirme ana sayfa görünümü eklendi.</li>
        <li>📊 /health.json public kontrol dosyası eklendi.</li>
        <li>⭐ 404 sayfası daha açıklayıcı hale getirildi.</li>
        <li>🧭 Mobil/tablet küçük görünüm cilaları yapıldı.</li>
        <li>🚫 Supabase, YouTube API ve admin paneli bu fix sürümünde de eklenmedi.</li>
      </ul>
    </section>
  );
}

function NextPlan() {
  return (
    <section id="sonraki" className="next-card">
      <h2>➡️ Sonraki Plan: v1.0.3</h2>
      <p>Ana Sayfa Vitrin Geliştirme hazırlanacak. Büyük hero, son eklenenler, hızlı keşif alanları ve daha güçlü public arşiv vitrini eklenecek.</p>
    </section>
  );
}

function NotFoundPage() {
  return (
    <Layout>
      <section className="hero-card">
        <div className="version-pill">404 • {VERSION}</div>
        <h1>Bu arşiv sayfası henüz hazır değil.</h1>
        <p>Bağlantı yanlış yazılmış olabilir veya bu bölüm sonraki sürümlerde eklenecek. Aşağıdaki güvenli bağlantılardan devam edebilirsin.</p>
        <div className="hero-actions">
          <a href="/" className="primary-btn">Ana Sayfa</a>
          <a href="/updates" className="ghost-btn">Güncellemeler</a>
          <a href="/channels" className="ghost-btn">Kanallar</a>
        </div>
      </section>
    </Layout>
  );
}

function AppRouter() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/') return <HomePage />;
  if (path === '/series') return <SeriesPage />;
  if (path.startsWith('/series/')) return <SeriesDetailPage slug={path.split('/').pop()} />;
  if (path === '/categories') return <CategoriesPage />;
  if (path.startsWith('/categories/')) return <CategoryDetailPage slug={path.split('/').pop()} />;
  if (path === '/channels') return <ChannelsPage />;
  if (path === '/updates') return <UpdatesPage />;
  if (path === '/status') return <StatusPage />;
  if (path.startsWith('/channels/')) return <ChannelDetailPage slug={path.split('/').pop()} />;

  return <NotFoundPage />;
}

createRoot(document.getElementById('root')).render(<AppRouter />);
