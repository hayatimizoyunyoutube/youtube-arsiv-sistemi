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
          <div className="version-pill">🎬 {VERSION} • Güncelleme Merkezi</div>
          <h1>Hayatımız Oyun arşivinin sürüm takibi artık daha düzenli.</h1>
          <p>
            Bu sürümde güncelleme merkezi yenilendi; tamamlanan ve planlanan sürümler daha okunur, daha profesyonel ve mobil uyumlu hale getirildi.
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
          <span>✅ v1.0.7 Durumu</span>
          <h2>Güncelleme merkezi geliştirildi.</h2>
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
  const [sortMode, setSortMode] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  const statusOptions = useMemo(() => [...new Set(series.map((item) => item.status))], []);
  const totalEpisodes = series.reduce((sum, item) => sum + item.episodes, 0);
  const completedCount = series.filter((item) => item.status === 'Tamamlandı').length;
  const activeCount = series.filter((item) => item.status === 'Devam Ediyor').length;

  const filteredSeries = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('tr-TR');

    const result = series.filter((item) => {
      const searchableText = `${item.title} ${item.description} ${item.category} ${item.channelTitle} ${item.status}`.toLocaleLowerCase('tr-TR');
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.categorySlug === categoryFilter;
      const matchesChannel = channelFilter === 'all' || item.channelSlug === channelFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesChannel;
    });

    return [...result].sort((a, b) => {
      if (sortMode === 'episodes-desc') return b.episodes - a.episodes;
      if (sortMode === 'progress-desc') return b.progress - a.progress;
      if (sortMode === 'year-desc') return b.year - a.year;
      if (sortMode === 'title-asc') return a.title.localeCompare(b.title, 'tr');
      return a.id - b.id;
    });
  }, [searchTerm, statusFilter, categoryFilter, channelFilter, sortMode]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setChannelFilter('all');
    setSortMode('featured');
  };

  const activeFilterLabels = [
    searchTerm.trim() ? `Arama: ${searchTerm.trim()}` : null,
    statusFilter !== 'all' ? `Durum: ${statusFilter}` : null,
    categoryFilter !== 'all' ? `Kategori: ${categories.find((item) => item.slug === categoryFilter)?.title}` : null,
    channelFilter !== 'all' ? `Kanal: ${channels.find((item) => item.slug === channelFilter)?.title}` : null,
    sortMode !== 'featured' ? `Sıralama: ${sortMode}` : null
  ].filter(Boolean);

  return (
    <Layout>
      <section className="series-library-hero">
        <div>
          <div className="version-pill">🎞️ {VERSION} • Seriler Sayfası Profesyonel Yenileme</div>
          <h1>Seri arşivi artık daha düzenli ve okunabilir.</h1>
          <p>
            Grid/liste görünümü, gelişmiş filtre paneli, sıralama seçenekleri ve daha belirgin seri geçişleriyle public seri sayfası güçlendirildi.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#seri-listesi">Serileri görüntüle</a>
            <a className="ghost-btn" href="/categories">Kategoriler</a>
            <a className="ghost-btn" href="/channels">Kanallar</a>
          </div>
        </div>
        <aside className="library-stats-panel">
          <article><strong>{series.length}</strong><span>Toplam seri</span></article>
          <article><strong>{totalEpisodes}</strong><span>Demo bölüm</span></article>
          <article><strong>{completedCount}</strong><span>Tamamlanan</span></article>
          <article><strong>{activeCount}</strong><span>Devam eden</span></article>
        </aside>
      </section>

      <section className="series-section" id="seri-listesi">
        <div className="section-heading library-heading">
          <span>🔎 Profesyonel Seri Kütüphanesi</span>
          <h2>Seriler</h2>
          <p>Seri adı, açıklama, kategori, kanal ve duruma göre arama/filtreleme yap. Her seri kendi detay sayfasında açılır.</p>
        </div>

        <div className="pro-filter-panel" aria-label="Seri arama ve filtreleme paneli">
          <label className="search-field wide-search">
            <span>Seri ara</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Resident Evil, korku, hikaye, devam eden..."
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

          <label>
            <span>Sıralama</span>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
              <option value="featured">Varsayılan sıra</option>
              <option value="episodes-desc">Bölüm sayısı yüksek</option>
              <option value="progress-desc">İlerleme yüksek</option>
              <option value="year-desc">Yıl yeni</option>
              <option value="title-asc">Ada göre A-Z</option>
            </select>
          </label>
        </div>

        <div className="library-toolbar">
          <div className="filter-summary pro-summary">
            <strong>{filteredSeries.length}</strong>
            <span>/ {series.length} demo seri gösteriliyor</span>
            <button type="button" onClick={clearFilters}>Filtreleri temizle</button>
          </div>
          <div className="view-toggle" aria-label="Görünüm seçimi">
            <button className={viewMode === 'grid' ? 'active' : ''} type="button" onClick={() => setViewMode('grid')}>Grid</button>
            <button className={viewMode === 'list' ? 'active' : ''} type="button" onClick={() => setViewMode('list')}>Liste</button>
          </div>
        </div>

        <div className="active-filter-row">
          {activeFilterLabels.length ? activeFilterLabels.map((label) => <span key={label}>{label}</span>) : <span>Aktif filtre yok</span>}
        </div>

        {filteredSeries.length ? (
          viewMode === 'grid' ? (
            <div className="series-grid premium-series-grid">
              {filteredSeries.map((item) => <SeriesCard key={item.id} {...item} />)}
            </div>
          ) : (
            <div className="series-list-view">
              {filteredSeries.map((item) => (
                <a className="series-list-row" href={`/series/${item.slug}`} key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <span>{item.status} • {item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <small>{item.channelTitle} • {item.episodes} bölüm • %{item.progress} ilerleme</small>
                  </div>
                  <strong>Detaya git →</strong>
                </a>
              ))}
            </div>
          )
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
  const totalLinkedSeries = categories.reduce((sum, category) => sum + series.filter((item) => item.categorySlug === category.slug).length, 0);
  const strongestCategory = categories
    .map((category) => ({ ...category, count: series.filter((item) => item.categorySlug === category.slug).length }))
    .sort((a, b) => b.count - a.count)[0];

  return (
    <Layout>
      <section className="category-showcase-hero">
        <div>
          <span className="version-pill">🗂️ {VERSION} • Kategori Deneyimi</span>
          <h1>Kategoriler artık ayrı vitrin sayfası gibi çalışıyor.</h1>
          <p>
            v1.0.5 ile kategori merkezi daha büyük hero, istatistik kartları, premium kategori kartları ve kategoriye bağlı seri önizlemeleriyle güçlendirildi.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#category-list">Kategorileri Gör</a>
            <a className="ghost-btn" href="/series">Tüm Seriler</a>
          </div>
        </div>
        <aside className="category-feature-panel">
          <span>Öne çıkan kategori</span>
          <strong>{strongestCategory.icon} {strongestCategory.title}</strong>
          <p>{strongestCategory.description}</p>
          <small>{strongestCategory.count} demo seri bağlı</small>
        </aside>
      </section>

      <section className="category-stats-row" aria-label="Kategori istatistikleri">
        <article><span>{categories.length}</span><p>Toplam kategori</p></article>
        <article><span>{totalLinkedSeries}</span><p>Bağlı demo seri</p></article>
        <article><span>{series.reduce((sum, item) => sum + item.episodes, 0)}</span><p>Demo bölüm</p></article>
        <article><span>{channels.length}</span><p>Kanal bağlantısı</p></article>
      </section>

      <section id="category-list" className="series-section category-premium-section">
        <div className="section-heading">
          <span>🗂️ Kategori Merkezi</span>
          <h2>Her kategori ayrı sayfada açılır</h2>
          <p>Aynı sayfada karışık filtreleme yok. Her kategori kendi kapak görseli, bağlı seri listesi ve istatistikleriyle ayrı detay sayfasına gider.</p>
        </div>

        <div className="category-grid premium-category-grid">
          {categories.map((category) => {
            const linkedSeries = series.filter((item) => item.categorySlug === category.slug);
            const totalEpisodes = linkedSeries.reduce((sum, item) => sum + item.episodes, 0);
            const activeCount = linkedSeries.filter((item) => item.status === 'Devam Ediyor').length;
            return (
              <a className="category-card premium-category-card" href={`/categories/${category.slug}`} key={category.id}>
                <img src={category.cover} alt={`${category.title} kategorisi`} loading="lazy" />
                <div>
                  <span>{category.icon} {category.accent}</span>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <div className="category-mini-stats">
                    <b>{linkedSeries.length} seri</b>
                    <b>{totalEpisodes} bölüm</b>
                    <b>{activeCount} aktif</b>
                  </div>
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

  const totalEpisodes = categorySeries.reduce((sum, item) => sum + item.episodes, 0);
  const completedCount = categorySeries.filter((item) => item.status === 'Tamamlandı').length;
  const activeCount = categorySeries.filter((item) => item.status === 'Devam Ediyor').length;
  const relatedChannels = [...new Set(categorySeries.map((item) => item.channelTitle))];

  return (
    <Layout>
      <section className="category-detail-premium-hero">
        <img src={category.cover} alt={`${category.title} kategori kapak görseli`} />
        <div className="category-detail-overlay">
          <span>{category.icon} Kategori Detayı • {category.accent}</span>
          <h1>{category.title}</h1>
          <p>{category.description}</p>
          <div className="detail-stats category-detail-stats">
            <strong>{categorySeries.length} seri</strong>
            <strong>{totalEpisodes} bölüm</strong>
            <strong>{completedCount} tamamlandı</strong>
            <strong>{activeCount} devam ediyor</strong>
          </div>
          <div className="hero-actions">
            <a className="primary-btn" href="/categories">Tüm kategorilere dön</a>
            <a className="ghost-btn" href="/series">Seri arşivine git</a>
          </div>
        </div>
      </section>

      <section className="category-insight-grid" aria-label="Kategori özet bilgileri">
        <article>
          <span>Bağlı Kanallar</span>
          <strong>{relatedChannels.length || 0}</strong>
          <p>{relatedChannels.length ? relatedChannels.join(' • ') : 'Henüz kanal bağlantısı yok'}</p>
        </article>
        <article>
          <span>Ortalama İlerleme</span>
          <strong>%{categorySeries.length ? Math.round(categorySeries.reduce((sum, item) => sum + item.progress, 0) / categorySeries.length) : 0}</strong>
          <p>Demo serilerin kategori içi ilerleme ortalaması.</p>
        </article>
        <article>
          <span>Public Durum</span>
          <strong>Hazır</strong>
          <p>Bu kategori public sayfada ayrı vitrin olarak görüntülenebilir.</p>
        </article>
      </section>

      <section className="series-section">
        <div className="section-heading">
          <span>🎮 {category.title}</span>
          <h2>Bu kategorideki seriler</h2>
          <p>{categorySeries.length ? `${categorySeries.length} demo seri listeleniyor.` : 'Bu kategoriye bağlı demo seri henüz yok.'}</p>
        </div>

        {categorySeries.length ? (
          <div className="series-grid premium-series-grid">
            {categorySeries.map((item) => <SeriesCard key={item.id} {...item} />)}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Bu kategori boş.</h3>
            <p>İleriki sürümlerde Supabase bağlantısı gelince kategori içerikleri panelden yönetilecek.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}


function ChannelsPage() {
  const totalEpisodes = channels.reduce((sum, channel) => sum + channel.episodeCount, 0);
  const totalSeries = channels.reduce((sum, channel) => sum + channel.seriesCount, 0);
  const activeChannels = channels.filter((channel) => channel.status === 'Aktif').length;
  const featuredChannel = channels[0];

  return (
    <Layout>
      <section className="channel-showcase-hero">
        <div>
          <span className="version-pill">📺 {VERSION} • Kanal Deneyimi</span>
          <h1>Kanallar artık ayrı bir arşiv vitrini gibi görünüyor.</h1>
          <p>
            v1.0.6 ile kanal merkezi; büyük hero, kanal istatistikleri, premium kanal kartları ve detay sayfalarında bağlı seri önizlemeleriyle güçlendirildi.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#channel-list">Kanalları Gör</a>
            <a className="ghost-btn" href="/series">Seri Arşivi</a>
          </div>
        </div>
        <aside className="channel-feature-panel">
          <span>Öne çıkan kanal</span>
          <strong>{featuredChannel.title}</strong>
          <p>{featuredChannel.description}</p>
          <small>{featuredChannel.seriesCount} seri • {featuredChannel.episodeCount} bölüm</small>
        </aside>
      </section>

      <section className="channel-stats-row" aria-label="Kanal istatistikleri">
        <article><span>{channels.length}</span><p>Toplam kanal</p></article>
        <article><span>{activeChannels}</span><p>Aktif kanal</p></article>
        <article><span>{totalSeries}</span><p>Bağlı demo seri</p></article>
        <article><span>{totalEpisodes}</span><p>Demo bölüm</p></article>
      </section>

      <section id="channel-list" className="series-section channel-premium-section">
        <div className="section-heading">
          <span>📺 Kanal Merkezi</span>
          <h2>Her kanal ayrı sayfada açılır</h2>
          <p>Aynı sayfada karışık liste yok. Her kanal kendi kapak görseli, odak bilgisi, bağlı seri alanı ve istatistikleriyle ayrı detay sayfasına gider.</p>
        </div>

        <div className="channel-grid premium-channel-grid">
          {channels.map((channel) => {
            const linkedSeries = series.filter((item) => item.channelSlug === channel.slug).slice(0, 3);
            const statusIcon = channel.status === 'Aktif' ? '🟢' : channel.status === 'Demo' ? '🟣' : '🟡';
            return (
              <a className="channel-card premium-channel-card" href={`/channels/${channel.slug}`} key={channel.id}>
                <img src={channel.cover} alt={`${channel.title} kanal kapak görseli`} loading="lazy" />
                <div>
                  <span>{statusIcon} {channel.status} • {channel.focus}</span>
                  <h3>{channel.title}</h3>
                  <p>{channel.description}</p>
                  <div className="channel-mini-stats">
                    <b>{channel.seriesCount} seri</b>
                    <b>{channel.episodeCount} bölüm</b>
                    <b>{channel.handle}</b>
                  </div>
                  <small>{linkedSeries.length ? linkedSeries.map((item) => item.title).join(' • ') : 'Demo seri bağlantısı bekleniyor'}</small>
                  <strong>Kanalı aç →</strong>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

function ChannelDetailPage({ slug }) {
  const channel = channels.find((item) => item.slug === slug);

  if (!channel) return <NotFoundPage />;

  const linkedSeries = series.filter((item) => item.channelSlug === channel.slug);
  const fallbackSeries = series.slice(0, Math.min(channel.seriesCount, series.length));
  const visibleSeries = linkedSeries.length ? linkedSeries : fallbackSeries;
  const completedCount = visibleSeries.filter((item) => item.status === 'Tamamlandı').length;
  const activeCount = visibleSeries.filter((item) => item.status === 'Devam Ediyor').length;
  const avgProgress = visibleSeries.length ? Math.round(visibleSeries.reduce((sum, item) => sum + item.progress, 0) / visibleSeries.length) : 0;

  return (
    <Layout>
      <section className="channel-detail-premium-hero">
        <img src={channel.cover} alt={`${channel.title} kanal kapak görseli`} />
        <div className="channel-detail-overlay">
          <span>📺 Kanal Detayı • {channel.handle}</span>
          <h1>{channel.title}</h1>
          <p>{channel.description}</p>
          <div className="detail-stats channel-detail-stats">
            <strong>{channel.focus}</strong>
            <strong>{channel.status}</strong>
            <strong>{channel.seriesCount} seri</strong>
            <strong>{channel.episodeCount} bölüm</strong>
          </div>
          <div className="hero-actions">
            <a className="primary-btn" href="/channels">Tüm kanallara dön</a>
            <a className="ghost-btn" href="/series">Seri arşivine git</a>
          </div>
        </div>
      </section>

      <section className="channel-insight-grid" aria-label="Kanal özet bilgileri">
        <article>
          <span>Kanal Odağı</span>
          <strong>{channel.focus}</strong>
          <p>Bu kanalın public arşivde hangi içerik türünü taşıyacağı gösterilir.</p>
        </article>
        <article>
          <span>Ortalama İlerleme</span>
          <strong>%{avgProgress}</strong>
          <p>Bağlı demo serilerin kanal içi ilerleme ortalaması.</p>
        </article>
        <article>
          <span>Durum Özeti</span>
          <strong>{channel.status}</strong>
          <p>{completedCount} tamamlanan • {activeCount} devam eden seri.</p>
        </article>
      </section>

      <section className="series-section">
        <div className="section-heading">
          <span>🧪 Demo Kanal İçeriği</span>
          <h2>Bu kanalın seri alanı</h2>
          <p>Şimdilik gerçek YouTube bağlantısı yok. Bu bölüm ileride YouTube playlist ve Supabase verisiyle beslenecek.</p>
        </div>

        <div className="series-grid premium-series-grid">
          {visibleSeries.map((item) => <SeriesCard key={item.id} {...item} />)}
        </div>
      </section>
    </Layout>
  );
}

function UpdateCard({ update, type, index = 0 }) {
  return (
    <article className={`update-card ${type === 'planned' ? 'planned-update' : ''}`}>
      <div className="update-card-head">
        <span>{update.version}</span>
        {update.date ? <small>{update.date}</small> : <small>Plan</small>}
      </div>
      <div className="update-card-index">{String(index + 1).padStart(2, '0')}</div>
      <h3>{update.title}</h3>
      <p>{update.summary}</p>
      <ul>
        {update.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function UpdatesPage() {
  const totalCompleted = completedUpdates.length;
  const latestUpdate = completedUpdates[completedUpdates.length - 1];
  const nextUpdate = plannedUpdates[0];

  return (
    <Layout>
      <section className="updates-hero updates-hero-pro">
        <div>
          <span>📝 Güncelleme Merkezi</span>
          <h1>Sürüm geçmişi artık daha okunur.</h1>
          <p>
            Tamamlanan sürümler, sıradaki planlar ve ana yayın hedefi tek merkezde düzenli tutulur. Bu sayede her pakette ne eklendiği karışmadan takip edilir.
          </p>
          <div className="hero-actions">
            <a href="#tamamlananlar" className="primary-btn">Tamamlananları Gör</a>
            <a href="#planlananlar" className="ghost-btn">Planlananlar</a>
          </div>
        </div>
        <div className="release-target release-dashboard">
          <small>Mevcut sürüm</small>
          <strong>{VERSION}</strong>
          <p>{siteConfig.releaseName}</p>
          <div className="release-mini-list">
            <span>{totalCompleted} tamamlanan sürüm</span>
            <span>Sıradaki: {nextUpdate.version}</span>
            <span>Hedef: v4.0.0</span>
          </div>
        </div>
      </section>

      <section className="update-overview-grid" aria-label="Güncelleme özeti">
        <article><span>{totalCompleted}</span><p>Tamamlanan sürüm</p></article>
        <article><span>{plannedUpdates.length}</span><p>Planlanan adım</p></article>
        <article><span>{latestUpdate.version}</span><p>Son paket</p></article>
        <article><span>v4.0.0</span><p>Ana yayın hedefi</p></article>
      </section>

      <section className="updates-section timeline-section" id="tamamlananlar">
        <div className="section-heading">
          <span>✅ Tamamlananlar</span>
          <h2>Biten sürümler</h2>
          <p>Küçük ve kontrollü public site adımları. En yeni tamamlanan sürüm listenin sonunda korunur.</p>
        </div>
        <div className="updates-grid timeline-grid">
          {completedUpdates.map((update, index) => <UpdateCard key={update.version} update={update} type="completed" index={index} />)}
        </div>
      </section>

      <section className="updates-section" id="planlananlar">
        <div className="section-heading">
          <span>📋 Planlananlar</span>
          <h2>Sıradaki adımlar</h2>
          <p>Henüz Supabase, YouTube API ve yönetim paneli yok. Önce public arayüz sağlamlaştırılıyor.</p>
        </div>
        <div className="updates-grid planned-grid">
          {plannedUpdates.map((update, index) => <UpdateCard key={update.version} update={update} type="planned" index={index} />)}
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
          <h1>v1.0.7 güncelleme merkezi kontrolü</h1>
          <p>Bu sayfa v1.0.7 güncelleme merkezi geliştirme route, sayfa ve temel içerik kontrolü için kullanılır. Hâlâ veritabanı/API yok; sadece public demo yapı test ediliyor.</p>
        </div>
        <div className="release-target">
          <small>Mevcut sürüm</small>
          <strong>{VERSION}</strong>
          <p>{siteConfig.releaseName}</p>
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
      <h2>📌 v1.0.7 Tamamlananlar</h2>
      <ul>
        <li>✅ Güncelleme merkezi profesyonel hero ve özet kartlarıyla yenilendi.</li>
        <li>🧾 Tamamlanan sürümler daha okunur timeline/kart düzenine taşındı.</li>
        <li>📋 Planlanan sürümler ayrı bölümde korunmaya devam ediyor.</li>
        <li>📱 Mobil güncelleme kartları daha rahat okunacak şekilde düzenlendi.</li>
        <li>🚫 Supabase, YouTube API ve admin paneli bu sürümde de eklenmedi.</li>
      </ul>
    </section>
  );
}

function NextPlan() {
  return (
    <section id="sonraki" className="next-card">
      <h2>➡️ Sonraki Plan: v1.0.8</h2>
      <p>Mobil Public Deneyim hazırlanacak. Mobil alt menü, küçük ekran arama/filtre davranışı ve kart okunabilirliği daha da iyileştirilecek.</p>
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
