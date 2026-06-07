export default function SeriesCard({
  title,
  slug,
  category,
  categorySlug,
  channelTitle,
  channelSlug,
  status,
  episodes,
  progress,
  year,
  description,
  image
}) {
  const statusClass = status.toLocaleLowerCase('tr-TR').replaceAll(' ', '-');

  return (
    <article className="series-card upgraded-series-card">
      <div className="series-image-wrap">
        <img src={image} alt={`${title} kapak görseli`} loading="lazy" />
        <span className={`status-badge status-${statusClass}`}>{status}</span>
        <span className="episode-badge">🎬 {episodes} bölüm</span>
      </div>

      <div className="series-content">
        <div className="series-meta">
          <a className="category-chip" href={`/categories/${categorySlug}`}>🎮 {category}</a>
          <a className="channel-chip" href={`/channels/${channelSlug}`}>📺 {channelTitle}</a>
        </div>

        <h3>{title}</h3>
        <p>{description}</p>

        <div className="card-info-row">
          <span>📅 {year}</span>
          <span>📈 %{progress}</span>
        </div>

        <div className="card-progress" aria-label={`${title} ilerleme yüzdesi`}>
          <i style={{ width: `${progress}%` }} />
        </div>

        <div className="card-actions">
          <a href={`/series/${slug}`} className="series-link primary-card-action">Detayı aç →</a>
          <a href={`/categories/${categorySlug}`} className="mini-card-action">Kategori</a>
        </div>
      </div>
    </article>
  );
}
