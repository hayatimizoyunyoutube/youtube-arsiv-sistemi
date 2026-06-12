const VERSION = 'v4.0.5';
const FIX_NAME = 'v4.0.5 - Profesyonel Not Defteri ve Supabase Stabilite';
const RELEASE_TAG = 'v4.0.5-NOT-DEFTERI-SUPABASE-STABILITE';
const ADMIN_EMAILS = ['mertdundaroyunda@gmail.com'];
const BLOCKED_AUTO_EMAILS = ['mertdundar05@outlook.com'];
const STORAGE = {
  games: 'hayatimiz_games_v204_canonical',
  gamesInitialized: 'hayatimiz_games_v204_initialized',
  events: 'hayatimiz_events_v204_canonical',
  notes: 'hayatimiz_update_notes_v204_canonical',
  maintenance: 'hayatimiz_maintenance_v204_canonical',
  users: 'hayatimiz_auth_users_v204',
  session: 'hayatimiz_auth_session_v204',
  maintenanceFix: 'hayatimiz_maintenance_fix_applied_v204',
  episodes: 'hayatimiz_game_episodes_v208_canonical',
  supabaseSync: 'hayatimiz_supabase_sync_v211',
  lastRemoteSync: 'hayatimiz_supabase_last_sync_v213',
  dataHealth: 'hayatimiz_admin_data_health_v213',
  watchSettings: 'hayatimiz_watch_quality_settings_v211_fix',
  watchHistory: 'hayatimiz_watch_history_v217'
};
const GAME_KEYS = [STORAGE.games,'hayatimiz_games_cache_stable_v31','hayatimiz_games_cache_stable_v30','hayatimiz_games_cache_stable_v24','hayatimiz_games_cache_stable','hayatimiz_games_v2'];
const EVENTS_KEYS = [STORAGE.events,'hayatimiz_v202_calendar_events','hayatimiz_v254_fix2_calendar_events','hayatimiz_calendar_events_stable_v253f4'];
const NOTES_KEYS = [STORAGE.notes,'hayatimiz_update_notes_local_v204','hayatimiz_update_notes_local_v203','hayatimiz_update_notes_local_v202','hayatimiz_update_notes_local_v254f8','hayatimiz_update_notes_local_v251','hayatimiz_update_notes_local'];
const MAINTENANCE_KEYS = [STORAGE.maintenance,'hayatimiz_maintenance_cache_stable','hayatimiz_v254_maintenance','hayatimiz_site_runtime_config_maintenance'];

const DEFAULT_GAMES = [
  {id:'alan-wake-remastered',title:'Alan Wake Remastered',status:'Devam Eden',genre:'Korku',seriesName:'Alan Wake',cover:'/assets/alan-wake-night-springs.png',releaseDate:'2010',description:'Korku ve hikaye odaklı yayın arşivi. Bölüm bölüm takip için hazır kart yapısı.',episodeCount:8,tags:'Türkçe Altyazılı, Hikaye, Korku'},
  {id:'assassins-creed-directors-cut',title:'Assassin’s Creed Director’s Cut',status:'Tamamlanan',genre:'Aksiyon',seriesName:'Assassin’s Creed',cover:'/assets/assassins-creed-directors-cut.png',releaseDate:'2008',description:'Tamamlanan seri arşivi, bölüm sayısı ve koleksiyon görünümü için örnek kayıt.',episodeCount:14,tags:'Türkçe, Seri, Tarihi'},
  {id:'hayatimiz-oyun-arsiv',title:'Hayatımız Oyun Arşivi',status:'Yakında',genre:'YouTube Arşivi',seriesName:'Genel Arşiv',cover:'/assets/hayatimiz-kapak.png',releaseDate:'2026',description:'YouTube oynatma listesi, bölüm ve oyun koleksiyonu merkezi.',episodeCount:0,tags:'Arşiv, Plan, YouTube'},
  {id:'a-plague-tale-innocence',title:'A Plague Tale: Innocence',status:'Planlandı',genre:'Macera',seriesName:'A Plague Tale',cover:'/assets/hayatimiz-kapak.png',releaseDate:'2019',description:'Hikaye odaklı seri için gelecek yayın planı ve kart/filtre örneği.',episodeCount:0,tags:'Türkçe Altyazılı, Hikaye, Macera'},
  {id:'control-ultimate-edition',title:'Control Ultimate Edition',status:'Ara Verildi',genre:'Aksiyon',seriesName:'Remedy Evreni',cover:'/assets/hayatimiz-kapak.png',releaseDate:'2019',description:'Ara verilen seriler için durum rozeti ve koleksiyon sayacı örneği.',episodeCount:5,tags:'Aksiyon, Bilim Kurgu, Seri'}
];
const DEFAULT_NOTES = [{"version":"v4.0.5","title":"SteamDB kapak + YouTube playlist revizyonu","summary":"SteamDB/Steam App ID alanı URL içinden ID ayıklar; kapak Hayatımız Oyun fallback yerine Steam CDN header/capsule görselinden gelir. YouTube API çalışmazsa gerçek playlist sayfasındaki video ID yedeği denenir.","status":"Tamamlandı","id":"steamdb-kapak-youtube-playlist-revizyonu"},{"version":"v4.0.5","title":"Form alanları dolum fix","summary":"Steam App ID, RAWG ID/slug, puan, kapak, banner, tür, tarih ve platform alanları doldurulur; kullanıcı yazdığı oyun adı yanlış meta yüzünden bozulmaz.","status":"Tamamlandı","id":"form-alanlar-dolum-fix"},{"version":"v4.0.5","title":"Bölüm kayıt akışı fix","summary":"Çekilen gerçek YouTube videoları episodesJson içine alınır, mevcut oyun düzenleniyorsa Supabase episodes tablosuna yazılacak şekilde korunur.","status":"Tamamlandı","id":"b-l-m-kay-t-ak-fix"},{"version":"v4.0.5","title":"Plan 01 - Playlist hata paneli","summary":"YouTube API hata detayını yönetim panelinde daha açık gösterecek tanılama ekranı eklenecek.","status":"Planlandı","id":"plan-01-playlist-hata-paneli"},{"version":"v4.0.5","title":"Plan 02 - SteamDB arama seçici","summary":"Steam App ID bilinmiyorsa oyun adına göre çıkan Steam sonuçları seçilebilir liste halinde gösterilecek.","status":"Planlandı","id":"plan-02-steamdb-arama-se-ici"},{"version":"v4.0.5","title":"Plan 03 - Kapak kalite kontrolü","summary":"Steam CDN görseli bozuksa otomatik header, capsule, library sırası ile kontrol edilecek.","status":"Planlandı","id":"plan-03-kapak-kalite-kontrol"},{"version":"v4.0.5","title":"Plan 04 - Bölüm başlığı temizleyici","summary":"YouTube başlıklarından gereksiz kanal adı, canlı etiketi ve tekrar eden seri adı otomatik temizlenecek.","status":"Planlandı","id":"plan-04-b-l-m-ba-l-temizleyici"},{"version":"v4.0.5","title":"Plan 05 - Toplu playlist senkronizasyonu","summary":"Tüm oyunların playlistleri tek panelden sırayla yenilenebilecek.","status":"Planlandı","id":"plan-05-toplu-playlist-senkronizasyonu"},{"version":"v4.0.5","title":"Plan 06 - Takvim bölüm eşleştirme","summary":"Yayın takvimindeki oyunlar episodes tablosundaki sıradaki bölümle otomatik eşleştirilecek.","status":"Planlandı","id":"plan-06-takvim-b-l-m-e-le-tirme"},{"version":"v4.0.5","title":"Plan 07 - Eksik meta raporu","summary":"Steam App ID, kapak, tarih, tür veya playlist eksiği olan oyunlar tek tabloda listelenecek.","status":"Planlandı","id":"plan-07-eksik-meta-raporu"},{"version":"v4.0.5","title":"Plan 08 - Seri sayfası iyileştirme","summary":"Serilerde kapak, bölüm ilerleme ve sıradaki video daha kompakt gösterilecek.","status":"Planlandı","id":"plan-08-seri-sayfas-iyile-tirme"},{"version":"v4.0.5","title":"Plan 09 - Yönetim paneli hızlandırma","summary":"Büyük oyun listelerinde arama, filtre ve kaydırma performansı iyileştirilecek.","status":"Planlandı","id":"plan-09-y-netim-paneli-h-zland-rma"},{"version":"v4.0.5","title":"Plan 10 - Yedek/geri alma sistemi","summary":"Oyun ve bölüm güncellemesinden önce otomatik JSON yedeği alınıp geri yükleme butonu eklenecek.","status":"Planlandı","id":"plan-10-yedek-geri-alma-sistemi"}];

function $(sel, root=document){ return root.querySelector(sel); }
function esc(v){ return String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function readJson(key, fallback){ try{ const raw=localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); }catch{ return fallback; } }
function loadJson(key, fallback){ return readJson(key, fallback); }
function compactForStorage(value){
  if(!Array.isArray(value)) return value;
  return value.slice(0,60).map(item=>{
    if(!item || typeof item!=='object') return item;
    const out={...item};
    for(const key of ['summary','description','note','storyText','story_text','message']){
      if(typeof out[key] === 'string' && out[key].length > 450) out[key] = out[key].slice(0,450) + '...';
    }
    return out;
  });
}
function writeJson(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch(err){
    console.warn('Yerel depolama dolu, kompakt kayıt deneniyor:', key, err && err.message ? err.message : err);
    try{ localStorage.setItem(key, JSON.stringify(compactForStorage(value))); return true; }
    catch(err2){
      console.warn('Kompakt kayıt da başarısız, eski anahtar temizlendi:', key, err2 && err2.message ? err2.message : err2);
      try{ localStorage.removeItem(key); }catch{}
      return false;
    }
  }
}
function keyExists(key){ return localStorage.getItem(key) !== null; }
function firstStoredArray(keys){
  for(const key of keys){
    if(keyExists(key)){
      const val = readJson(key, null);
      if(Array.isArray(val)) return val;
    }
  }
  return null;
}

function knownSeriesFromTitle(title=''){
  const t=String(title||'').trim();
  const known=[
    [/007|first\s*light|james\s*bond/i,'James Bond'],
    [/assassin.?s\s*creed/i,'Assassin’s Creed'],
    [/alan\s*wake/i,'Alan Wake'],
    [/plague\s*tale|a\s*plague\s*tale|innocence|requiem/i,'A Plague Tale'],
    [/control|remedy/i,'Remedy Evreni'],
    [/witcher/i,'The Witcher'],
    [/cyberpunk/i,'Cyberpunk'],
    [/red\s*dead/i,'Red Dead'],
    [/resident\s*evil/i,'Resident Evil'],
    [/call\s*of\s*duty|modern\s*warfare|black\s*ops/i,'Call of Duty'],
    [/god\s*of\s*war/i,'God of War'],
    [/last\s*of\s*us/i,'The Last of Us'],
    [/tomb\s*raider/i,'Tomb Raider'],
    [/spider[-\s]*man/i,'Marvel’s Spider-Man']
  ];
  for(const [rx,name] of known) if(rx.test(t)) return name;
  return '';
}
function cleanSeriesName(value, title=''){
  const raw=String(value||'').trim();
  const bad=/^(null|undefined|none|yok|serisiz|seri yok|genel arşiv|genel)$/i;
  const known=knownSeriesFromTitle(title);
  // Oyun başlığından kesin seri anlaşılabiliyorsa, RAWG/Supabase/yerel kayıttan gelen alakasız seri adını ez.
  // Örn: A Plague Tale: Innocence kesinlikle Avatar serisine bağlanmaz; seri adı A Plague Tale olur.
  if(known) return known;
  if(raw && !bad.test(raw) && !/avatar/i.test(raw)) return raw;
  if(known) return known;
  const t=String(title||'').trim();
  if(t.includes(':')) return t.split(':')[0].trim();
  if(t.includes(' - ')) return t.split(' - ')[0].trim();
  return '';
}

function slugify(v){ return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || ('item-'+Date.now()); }

function normalizeReleaseDateTR(value){
  const raw = String(value || '').trim();
  if(!raw) return '';
  // RAWG çoğunlukla YYYY-MM-DD döndürür; kullanıcıya ve Supabase'e her zaman GG.AA.YYYY yaz.
  let m = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if(m){ const y=m[1], mo=String(m[2]).padStart(2,'0'), d=String(m[3]).padStart(2,'0'); return `${d}.${mo}.${y}`; }
  m = raw.match(/^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{4})$/);
  if(m){ const d=String(m[1]).padStart(2,'0'), mo=String(m[2]).padStart(2,'0'), y=m[3]; return `${d}.${mo}.${y}`; }
  m = raw.match(/^(\d{4})$/);
  if(m) return m[1];
  const parsed = Date.parse(raw);
  if(Number.isFinite(parsed)){
    const dt=new Date(parsed);
    if(!Number.isNaN(dt.getTime())) return `${String(dt.getDate()).padStart(2,'0')}.${String(dt.getMonth()+1).padStart(2,'0')}.${dt.getFullYear()}`;
  }
  return raw;
}
function bestReleaseDate(...values){
  for(const v of values){ const d=normalizeReleaseDateTR(v); if(d) return d; }
  return '';
}

function normalizeGame(g,i){
  const src=g||{};
  const title = src.title || src.name || src.game_title || src.gameTitle || `Oyun ${Number(i||0)+1}`;
  const pickedSeries = src.seriesName || src.series_name || src.series || src.series_title || src.seriesTitle || src.franchise || src.franchise_name || src.collectionName || src.collection_name || '';
  const seriesName = cleanSeriesName(pickedSeries, title);
  const episodeCount = Math.max(0, Number(src.episodeCount ?? src.episode_count ?? src.totalEpisodes ?? src.total_episodes ?? src.video_count ?? 0));
  const watchedEpisodeCount = Math.max(0, Math.min(episodeCount || 9999, Number(src.watchedEpisodeCount ?? src.watched_episode_count ?? src.watchedEpisodes ?? 0)));
  const description = src.description || src.summary || src.short_description || src.about || 'Açıklama eklenmedi.';
  const storyText = src.storyText || src.story_text || src.story || src.hikaye || src.narrative || src.long_description || '';
  return {
    id: src.id || src.slug || slugify(title),
    title,
    status: src.status || src.progress_status || src.state || src.status_label || 'Devam Eden',
    genre: src.genre || src.category || src.genre_label || (Array.isArray(src.genres)?src.genres.map(x=>typeof x==='string'?x:x?.name).filter(Boolean).join(', '):'Arşiv'),
    tags: Array.isArray(src.tags) ? src.tags.join(', ') : (src.tags || src.tag_list || ''),
    seriesName,
    cover: src.cover || src.coverUrl || src.cover_url || src.image || src.image_url || src.background_image || '/assets/hayatimiz-kapak.png',
    banner: src.banner || src.bannerUrl || src.banner_url || src.background || src.background_image || src.hero_image || '',
    releaseDate: bestReleaseDate(src.releaseDate, src.release_date, src.released, src.release),
    platforms: Array.isArray(src.platforms) ? src.platforms.map(x=>typeof x==='string'?x:x?.platform?.name||x?.name).filter(Boolean).join(', ') : (src.platforms || src.platform || ''),
    description,
    storyText,
    youtubePlaylistUrl: src.youtubePlaylistUrl || src.youtube_playlist_url || src.playlistUrl || src.playlist_url || src.youtube_url || '',
    youtubePlaylistId: src.youtubePlaylistId || src.youtube_playlist_id || extractYoutubePlaylistId(src.youtubePlaylistUrl || src.youtube_playlist_url || src.playlistUrl || src.playlist_url || src.youtube_url || ''),
    videoUrl: src.videoUrl || src.video_url || src.youtubeVideoUrl || src.youtube_video_url || '',
    episodeSyncSource: src.episodeSyncSource || src.episode_sync_source || '',
    episodeSyncedAt: src.episodeSyncedAt || src.episode_synced_at || '',
    rawgId: src.rawgId || src.rawg_id || '',
    rawgSlug: src.rawgSlug || src.rawg_slug || src.slug || '',
    steamAppId: src.steamAppId || src.steam_app_id || '',
    score: Number(src.score || src.rating || 0),
    metaSource: src.metaSource || src.meta_source || '',
    metaCheckedAt: src.metaCheckedAt || src.meta_checked_at || '',
    coverSource: src.coverSource || src.cover_source || '',
    episodeCount,
    watchedEpisodeCount,
    collectionName: src.collectionName || src.collection_name || src.collection || seriesName || '',
    seriesOrder: Number(src.seriesOrder ?? src.series_order ?? src.sortOrder ?? src.sort_order ?? i ?? 0),
    sortOrder: Number(src.sortOrder ?? src.sort_order ?? src.seriesOrder ?? src.series_order ?? i ?? 0),
    statusBucket: src.statusBucket || src.status_bucket || statusBucket(src.status || 'Devam Eden'),
    episodes: Array.isArray(src.episodes) ? src.episodes.map(normalizeEpisode) : [],
    isFeatured: src.isFeatured === true || src.is_featured === true || src.featured === true
  };
}

const LOCAL_META_CATALOG = [
  {rx:/007|first\s*light|james\s*bond/i,title:'007 First Light',seriesName:'James Bond',genre:'Aksiyon, Gizlilik, Macera',releaseDate:'27.03.2026',platforms:'PC, PlayStation 5, Xbox Series S/X, Nintendo Switch',tags:'Türkçe Altyazılı, Sinematik, Aksiyon',score:0,steamAppId:'3768760',rawgSlug:'007-first-light',cover:'https://cdn.akamai.steamstatic.com/steam/apps/3768760/header.jpg',banner:'https://cdn.akamai.steamstatic.com/steam/apps/3768760/capsule_616x353.jpg',description:`James Bond'un MI6 içindeki ilk büyük operasyonunu, gizli yapılanmalar ve yüksek riskli ajanlık görevleri üzerinden takip eden sinematik aksiyon arşivi.`,storyText:`Görevin henüz başında, çiçeği burnunda bir ajan olan James Bond, MI6 tarafından küresel dengeleri tehdit eden gizli bir yapılanmayı çökertmekle görevlendirilir. First Light operasyonu, Bond'un sadece fiziksel sınırlarını değil, aynı zamanda bir ajan olarak ahlaki sınırlarını ve sadakatini de ilk kez ciddi şekilde test edeceği bir vaftiz törenine dönüşür.`},
  {rx:/plague.*innocence|innocence/i,title:'A Plague Tale: Innocence',seriesName:'A Plague Tale',genre:'Macera, Gizlilik, Hikaye',releaseDate:'14.05.2019',platforms:'PC, PlayStation, Xbox, Nintendo Switch',tags:'Türkçe Altyazılı, Hikaye, Macera',score:8.3,steamAppId:'752590',rawgSlug:'a-plague-tale-innocence',cover:'https://cdn.akamai.steamstatic.com/steam/apps/752590/header.jpg',banner:'https://cdn.akamai.steamstatic.com/steam/apps/752590/capsule_616x353.jpg'},
  {rx:/alan\s*wake/i,title:'Alan Wake Remastered',seriesName:'Alan Wake',genre:'Korku, Gerilim, Hikaye',releaseDate:'05.10.2021',platforms:'PC, PlayStation, Xbox, Nintendo Switch',tags:'Türkçe Altyazılı, Korku, Hikaye',score:8.0,steamAppId:'108710',rawgSlug:'alan-wake-remastered',cover:'https://cdn.akamai.steamstatic.com/steam/apps/108710/header.jpg',banner:'https://cdn.akamai.steamstatic.com/steam/apps/108710/capsule_616x353.jpg'},
  {rx:/cyberpunk\s*2077/i,title:'Cyberpunk 2077',seriesName:'Cyberpunk',genre:'Aksiyon RPG, Açık Dünya, Bilim Kurgu',releaseDate:'10.12.2020',platforms:'PC, PlayStation 5, Xbox Series S/X',tags:'Türkçe Altyazılı, RPG, Açık Dünya',score:9.1,steamAppId:'1091500',rawgSlug:'cyberpunk-2077',cover:'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',banner:'https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg'},
  {rx:/witcher\s*3|wild\s*hunt/i,title:'The Witcher 3: Wild Hunt',seriesName:'The Witcher',genre:'RPG, Açık Dünya, Fantastik',releaseDate:'19.05.2015',platforms:'PC, PlayStation, Xbox, Nintendo Switch',tags:'Türkçe Altyazılı, RPG, Açık Dünya',score:9.6,steamAppId:'292030',rawgSlug:'the-witcher-3-wild-hunt',cover:'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',banner:'https://cdn.akamai.steamstatic.com/steam/apps/292030/capsule_616x353.jpg'},
  {rx:/red\s*dead|rdr\s*2/i,title:'Red Dead Redemption 2',seriesName:'Red Dead',genre:'Aksiyon, Macera, Açık Dünya, Western',releaseDate:'05.12.2019',platforms:'PC, PlayStation, Xbox',tags:'Türkçe Altyazılı, Açık Dünya, Hikaye',score:9.7,steamAppId:'1174180',rawgSlug:'red-dead-redemption-2',cover:'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',banner:'https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg'}
];
function localGameMetaCandidate(title){
  const q=String(title||'').trim();
  if(!q) return null;
  const row=LOCAL_META_CATALOG.find(x=>x.rx.test(q));
  if(row) return {...row, source:'Yerel güvenli bilgi kataloğu'};
  const slug=slugify(q);
  return {title:q,seriesName:q.split(':')[0],genre:'Aksiyon, Macera, Hikaye',releaseDate:'',platforms:'PC, PlayStation 5, Xbox Series S/X',tags:'Türkçe Altyazılı, Hikaye',score:0,rawgSlug:slug,cover:'',banner:'',source:'Yerel güvenli varsayılan'};
}
async function apiJson(action, payload){
  const session = (typeof currentUser === 'function') ? currentUser() : null;
  const merged = { currentEmail: session?.email || '', ownerEmail: session?.email || '', ...(payload || {}) };
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), action && String(action).includes('playlist') ? 45000 : 25000);
  try{
    const res = await fetch(`/api?action=${encodeURIComponent(action)}&t=${Date.now()}`, {method:'POST',headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify(merged), signal:controller.signal});
    const data = await res.json().catch(()=>({ok:false}));
    if(!res.ok || data.ok===false) throw new Error(data.error || data.message || 'Servis cevap vermedi.');
    return data;
  }finally{
    clearTimeout(timer);
  }
}
function syncState(){ return readJson(STORAGE.supabaseSync, {mode:'local', status:'Yerel güvenli mod', message:'Supabase henüz denenmedi.', checkedAt:''}); }
function saveSyncState(v){ writeJson(STORAGE.supabaseSync, {...syncState(), ...(v||{}), checkedAt:new Date().toISOString()}); }
function dataHealthState(){ return readJson(STORAGE.dataHealth, {checkedAt:'', mode:'Bekleniyor', games:0, users:0, events:0, notes:0, maintenance:'Bilinmiyor', message:'Veri sağlığı henüz kontrol edilmedi.'}); }
function saveDataHealth(v){ writeJson(STORAGE.dataHealth, {...dataHealthState(), ...(v||{}), checkedAt:new Date().toISOString()}); }
async function checkAdminDataHealth({force=false}={}){
  try{
    const data=await apiJson('admin-data-health',{adminToken:sessionToken()});
    const health=data.health || {};
    saveDataHealth({mode:'Supabase aktif', games:Number(health.games||0), users:Number(health.users||0), events:Number(health.events||0), notes:Number(health.notes||0), maintenance:health.maintenance || 'Bilinmiyor', schemaVersion:health.schemaVersion || '', message:data.message || 'Supabase veri sağlığı kontrol edildi.'});
    saveSyncState({mode:'supabase', status:'Supabase veri sağlığı aktif', message:'Oyun, kullanıcı, takvim, not ve bakım tabloları kontrol edildi.'});
    if(force){ toast('Supabase veri sağlığı kontrol edildi.'); render(); }
    return data;
  }catch(err){
    saveDataHealth({mode:'Yerel güvenli mod', message:err?.message || 'Supabase veri sağlığı kontrol edilemedi.'});
    saveSyncState({mode:'local', status:'Yerel güvenli mod', message:err?.message || 'Supabase veri sağlığı kontrol edilemedi.'});
    if(force){ toast('Supabase veri sağlığı kontrol edilemedi, yerel güvenli mod açık.'); render(); }
    return null;
  }
}

function sessionToken(){ const u=currentUser(); return String(u?.adminToken || u?.token || ''); }
async function ensureSupabaseAdminToken(){
  const u=currentUser();
  if(!u) throw new Error('Supabase kaydı için önce giriş yapmalısın.');
  if(String(u.adminToken||u.token||'').trim()) return String(u.adminToken||u.token||'').trim();
  if(!String(u.email||'').trim()) throw new Error('Supabase kaydı için geçerli e-posta gerekli.');
  const data=await apiJson('session-refresh',{email:String(u.email||'').trim().toLowerCase()});
  const token=String(data?.adminToken||'').trim();
  if(!token) throw new Error('Supabase yetki tokeni alınamadı. Kurucu hesabıyla tekrar giriş yap.');
  const next={...u, adminToken:token, role:data?.user?.role || u.role || 'owner', displayName:data?.user?.full_name || data?.user?.displayName || u.displayName || 'Hayatımız Oyun'};
  localStorage.setItem(STORAGE.session, JSON.stringify(next));
  return token;
}
function splitMaybeArray(v){ return Array.isArray(v) ? v : splitText(v); }
function normalizeRemoteGame(g,i=0){
  return normalizeGame({
    id:g.id, title:g.title || g.name || g.game_title, status:g.status || g.status_label || g.status_slug, genre:g.genre || g.genre_label || g.genre_slug,
    tags:Array.isArray(g.tags) ? g.tags.join(', ') : (g.tags || ''), seriesName:g.series_name || g.seriesName || g.series_title || g.franchise || g.collection_name, collectionName:g.collection_name || g.collectionName,
    cover:g.cover_url || g.cover || g.background_image, banner:g.banner_url || g.banner || g.background_image, releaseDate:bestReleaseDate(g.release_date, g.releaseDate, g.released),
    platforms:Array.isArray(g.platforms) ? g.platforms.join(', ') : (g.platforms || ''), description:g.description || g.summary, storyText:g.story_text || g.storyText || g.story || g.hikaye,
    youtubePlaylistUrl:g.youtube_playlist_url || g.playlist_url || g.youtubePlaylistUrl, youtubePlaylistId:g.youtube_playlist_id || g.youtubePlaylistId,
    episodes:Array.isArray(g.episodes) ? g.episodes : [], episodeCount:g.episode_count ?? g.episodeCount, watchedEpisodeCount:g.watched_episode_count ?? g.watchedEpisodeCount,
    rawgId:g.rawg_id || g.rawgId, rawgSlug:g.rawg_slug || g.rawgSlug, steamAppId:g.steam_app_id || g.steamAppId, score:g.score,
    metaSource:g.meta_source || g.metaSource, metaCheckedAt:g.meta_checked_at || g.metaCheckedAt, coverSource:g.cover_source || g.coverSource,
    sortOrder:g.sort_order ?? g.series_order ?? i, seriesOrder:g.series_order ?? g.sort_order ?? i, statusBucket:g.status_bucket || g.statusBucket, isFeatured:g.is_featured === true || g.isFeatured === true
  }, i);
}
function gameToRemotePayload(g){
  const game=normalizeGame(g,0);
  return {
    id:game.id, title:game.title, status:game.status, genre:game.genre, tags:splitMaybeArray(game.tags), seriesName:game.seriesName, collectionName:collectionName(game),
    cover:game.cover, banner:game.banner, releaseDate:bestReleaseDate(game.releaseDate), platforms:splitMaybeArray(game.platforms), description:game.description, storyText:game.storyText,
    youtubePlaylistUrl:game.youtubePlaylistUrl, youtubePlaylistId:game.youtubePlaylistId || extractYoutubePlaylistId(game.youtubePlaylistUrl),
    episodes:Array.isArray(game.episodes) ? game.episodes.map(normalizeEpisode) : loadEpisodes(game.id),
    episode_count:Number(game.episodeCount||0), watched_episode_count:Number(game.watchedEpisodeCount||0),
    rawgId:game.rawgId, rawgSlug:game.rawgSlug, steamAppId:game.steamAppId, score:Number(game.score||0),
    metaSource:game.metaSource, metaCheckedAt:game.metaCheckedAt, coverSource:game.coverSource,
    sortOrder:Number(game.sortOrder||0), seriesOrder:Number(game.seriesOrder ?? game.sortOrder ?? 0), statusBucket:statusBucket(game.status), isFeatured:game.isFeatured === true
  };
}
async function refreshGamesFromSupabase({force=false}={}){
  if(window.__HAYATIMIZ_SUPABASE_SYNCING__) return;
  window.__HAYATIMIZ_SUPABASE_SYNCING__=true;
  try{
    const localBefore=loadGames();
    const data=await apiJson('games-list',{});
    const remote=(Array.isArray(data.games)?data.games:[]).map(normalizeRemoteGame).map(r=>{
      const localMatch=localBefore.find(g=>String(g.id)===String(r.id) || String(g.title||'').toLocaleLowerCase('tr')===String(r.title||'').toLocaleLowerCase('tr'));
      const localEpisodes=Array.isArray(localMatch?.episodes) && localMatch.episodes.length ? localMatch.episodes.map(normalizeEpisode) : loadEpisodes(localMatch?.id || r.id);
      if((!Array.isArray(r.episodes) || !r.episodes.length) && localEpisodes.length) return {...r, episodes:localEpisodes, episodeCount:Math.max(Number(r.episodeCount||0), localEpisodes.length)};
      return r;
    });
    const remoteOk = data && data.ok === true && Array.isArray(data.games);
    const remoteEmpty = remoteOk && remote.length === 0;
    // v4.0.5: Supabase 0 döndü diye yerel veya ekrandaki oyunları asla silme.
    // Sıfır kayıt sadece gerçekten ilk kurulumda ve yerelde kayıt yoksa kabul edilir.
    if(remoteOk){
      if(remote.length > 0){
        saveGames(remote, {source:'supabase-refresh'});
        localStorage.setItem(STORAGE.lastRemoteSync,new Date().toISOString());
      }else if(localBefore.length > 0){
        localStorage.setItem(STORAGE.lastRemoteSync,new Date().toISOString());
        saveSyncState({mode:'supabase-safe', status:'Supabase boş döndü, arşiv korunuyor', message:`Supabase 0 oyun döndürdü; ${localBefore.length} mevcut oyun silinmedi.`, remoteCount:0, preservedLocalCount:localBefore.length});
        if(force) { toast('Supabase boş döndü; mevcut oyunlar korunuyor.'); render(); }
        return;
      }else{
        saveSyncState({mode:'supabase-empty', status:'Supabase bağlı ama oyun yok', message:'Supabase oyun tablosu boş. Yeni oyun eklenene kadar arşiv boş kalır.', remoteCount:0});
      }
    }
    saveSyncState({mode:'supabase', status:remote.length?'Supabase aktif':'Supabase aktif ama oyun tablosu boş', message:data.warning || `${remote.length} oyun Supabase üzerinden okundu.`, remoteCount:remote.length, recovered:data.recovered===true});
    if(force) { toast(remote.length?'Supabase verileri yenilendi.':'Supabase bağlı ama oyun yok.'); render(); }
  }catch(err){
    saveSyncState({mode:'local', status:'Yerel güvenli mod', message:err?.message || 'Supabase bağlantısı kurulamadı.', remoteCount:0});
    if(force) { toast('Supabase bağlanamadı, yerel güvenli mod açık.'); render(); }
  }finally{ window.__HAYATIMIZ_SUPABASE_SYNCING__=false; }
}

function autoRefreshGamesPageFromSupabase(){
  try{
    const now=Date.now();
    if(window.__HAYATIMIZ_GAMES_PAGE_REFRESH_AT && now-window.__HAYATIMIZ_GAMES_PAGE_REFRESH_AT<12000) return;
    window.__HAYATIMIZ_GAMES_PAGE_REFRESH_AT=now;
    setTimeout(()=>refreshGamesFromSupabase({force:false}).then(()=>{ if(route()==='/yonetim/mevcut-oyunlar') render(); }).catch(()=>{}), 150);
  }catch{}
}

async function persistGameToSupabase(game, editId=''){
  const token=await ensureSupabaseAdminToken();
  if(!token){
    saveSyncState({mode:'supabase-required', status:'Supabase oturumu gerekli', message:'Oyun yerel kaydedilmedi. Supabase kaydı için kurucu hesabıyla giriş yap.'});
    throw new Error('Supabase kaydı için kurucu/yetkili hesabıyla giriş yapmalısın.');
  }
  const targetId=String(editId || game.id || '').trim();
  const localRowsBefore=loadGames();
  const localBefore=localRowsBefore.find(g=>String(g.id)===targetId || String(g.id)===String(game.id));
  const localEpisodes=mergeEpisodeListsForSave(
    Array.isArray(game.episodes) && game.episodes.length ? game.episodes : [],
    Array.isArray(localBefore?.episodes) && localBefore.episodes.length ? localBefore.episodes : loadEpisodes(targetId || game.id)
  );
  if(localEpisodes.length){
    game={...game, episodes:localEpisodes, episodeCount:Math.max(Number(game.episodeCount||0), localEpisodes.length)};
  }
  const action=editId?'games-update':'games-add';
  const data=await apiJson(action,{adminToken:token, gameId:editId, game:gameToRemotePayload(game)});
  if(!data || data.ok === false){
    throw new Error(data?.error || data?.message || 'Supabase oyun kaydı başarısız oldu.');
  }
  if(data?.game){
    let remote=normalizeRemoteGame(data.game);
    const remoteEpisodes=Array.isArray(remote.episodes) ? remote.episodes : [];
    const mergedEpisodes=mergeEpisodeListsForSave(localEpisodes, remoteEpisodes);
    if(mergedEpisodes.length){
      remote={...remote, episodes:mergedEpisodes, episodeCount:Math.max(Number(remote.episodeCount||0), mergedEpisodes.length)};
      saveEpisodes(remote.id || targetId || game.id, mergedEpisodes, {skipGamePatch:true});
    }
    const rows=loadGames();
    const finalTargetId=String(targetId||game.id||remote.id);
    const exists=rows.some(g=>String(g.id)===finalTargetId || String(g.id)===String(remote.id));
    saveGames(exists ? rows.map(g=>{
      if(String(g.id)===finalTargetId || String(g.id)===String(remote.id)){
        const preserved=mergeEpisodeListsForSave(mergedEpisodes, Array.isArray(g.episodes)?g.episodes:[]);
        return {...g, ...remote, id:g.id, episodes:preserved, episodeCount:Math.max(Number(remote.episodeCount||0), preserved.length)};
      }
      return g;
    }) : [{...remote, episodes:mergedEpisodes}, ...rows], {source:'supabase-save', allowDecrease:false});
  }else{
    await refreshGamesFromSupabase({force:false});
  }
  saveSyncState({mode:'supabase', status:'Supabase kayıt aktif', message:editId?'Oyun sadece Supabase üzerinde güncellendi.':'Oyun sadece Supabase üzerine kaydedildi.', lastGameSync:game.title || game.id});
  return data;
}
async function deleteGameRemote(id, options={}){ const token=sessionToken(); if(!token || options.explicitDelete !== true) return null; await apiJson('games-delete',{adminToken:token, gameId:id, confirmPhrase:'OYUNU SIL'}); saveSyncState({mode:'supabase', status:'Supabase silme aktif', message:'Oyun Supabase üzerinden manuel onayla silindi.'}); }
async function clearAllGamesRemote(){ const token=sessionToken(); if(!token) return null; await apiJson('games-delete-all',{adminToken:token}); saveSyncState({mode:'supabase', status:'Supabase toplu silme aktif', message:'Supabase games tablosu boşaltıldı.'}); }

function normalizeRemoteEvent(e,i=0){
  return {
    id:e.id || `event-${Date.now()}-${i}`,
    title:e.title || 'Yayın',
    date:e.date || e.event_date || '',
    time:e.time || e.event_time || '20:00',
    type:e.type || e.event_type || 'Ana Yayın',
    gameId:e.gameId || e.game_id || '',
    gameTitle:e.gameTitle || e.game_title || '',
    episodeNumber:e.episodeNumber || e.episode_number || '',
    episodeTitle:e.episodeTitle || e.episode_title || '',
    cover:e.cover || e.cover_url || '',
    videoUrl:e.videoUrl || e.video_url || '',
    note:e.note || '',
    isActive:e.isActive !== false,
    source:e.source || 'supabase'
  };
}
function normalizeRemoteNote(n,i=0){
  const rawStatus=String(n.status || '').toLocaleLowerCase('tr');
  const status = rawStatus.includes('plan') ? 'Planlandı' : rawStatus.includes('deleted') ? 'Silindi' : (n.status==='Tamamlandı' || n.status==='Planlandı' ? n.status : 'Tamamlandı');
  return {
    id:n.id || `note-${Date.now()}-${i}`,
    version:n.version || VERSION,
    title:n.title || 'Güncelleme Notu',
    summary:n.summary || n.description || n.note || '',
    description:n.description || n.note || n.summary || '',
    status,
    pinned:n.pinned === true,
    planned:status === 'Planlandı' || n.planned === true,
    source:n.source || 'supabase'
  };
}
async function refreshSiteRuntimeFromSupabase({force=false}={}){
  try{
    const localBefore=loadMaintenance();
    const data=await apiJson('settings-get',{});
    if(data && data.maintenance){
      const remote=sanitizeMaintenance({...data.maintenance, source:'supabase'});
      const localUpdated=Date.parse(localBefore.updatedAt||0)||0;
      const remoteUpdated=Date.parse(remote.updatedAt||remote.updated_at||0)||0;
      const publicRoute=!isYönetim();
      const remoteKapali=remote.enabled !== true;
      const localAdminEdit=isYönetim() && String(localBefore.source||'')==='admin-form' && localUpdated && (!remoteUpdated || localUpdated > remoteUpdated + 1000);
      if(localAdminEdit){
        // Yönetici bakım formunda daha yeni bir değişiklik yaptıysa Supabase Yenile düğmesi eski kapalı/açık değerle üstüne yazamaz.
        // Böylece bakım modu açıkken yenile deyince kapalıya dönme hatası engellenir.
        saveMaintenance({...localBefore, enabled:parseMaintenanceEnabled(localBefore.enabled), source:'local-newer-preserved'});
        saveSyncState({mode:'local', status:'Bakım modu yerel güncel kayıt korundu', message:'Yerel bakım ayarı Supabase kaydından daha yeni olduğu için eski uzak kayıtla üstüne yazılmadı.'});
        if(force){ toast('Yerel bakım ayarı daha güncel; Supabase eski değerle değiştirmedi.'); render(); }
        return data;
      }
      if(publicRoute || force || remoteKapali){
        saveMaintenance({...remote, enabled:parseMaintenanceEnabled(remote.enabled), source:'supabase', updatedAt:remote.updatedAt || remote.updated_at || new Date().toISOString()});
      }else{
        saveMaintenance({...remote, enabled:parseMaintenanceEnabled(remote.enabled)});
      }
    }
    saveSyncState({mode:'supabase', status:'Supabase site ayarları aktif', message:'Bakım modu Supabase runtime config üzerinden okundu.'});
    if(force){ toast('Bakım modu Supabase üzerinden yenilendi.'); render(); }
    return data;
  }catch(err){
    saveSyncState({mode:'local', status:'Bakım modu yerel güvenli modda', message:err?.message || 'Çalışma ayarı okunamadı.'});
    if(force){ toast('Bakım modu Supabase bağlanamadı, yerel güvenli mod açık.'); render(); }
    return null;
  }
}
async function refreshEventsFromSupabase({force=false}={}){
  try{
    const data=await apiJson('calendar-events-list',{});
    const rows=(Array.isArray(data.events)?data.events:[]).map(normalizeRemoteEvent);
    saveEvents(rows);
    saveSyncState({mode:'supabase', status:'Supabase takvim aktif', message:`${rows.length} yayın takvimi kaydı Supabase üzerinden okundu.`});
    if(force){ toast(rows.length?'Takvim Supabase üzerinden yenilendi.':'Takvim Supabase bağlı ama kayıt yok.'); render(); }
    return rows;
  }catch(err){
    saveSyncState({mode:'local', status:'Takvim yerel güvenli modda', message:err?.message || 'Takvim okunamadı.'});
    if(force){ toast('Takvim Supabase bağlanamadı, yerel güvenli mod açık.'); render(); }
    return loadEvents();
  }
}
async function refreshNotesFromSupabase({force=false}={}){
  try{
    const data=await apiJson('update-notes-list',{});
    const rows=(Array.isArray(data.notes)?data.notes:[]).map(normalizeRemoteNote).filter(n=>n.status!=='Silindi');
    saveNotes(mergeDefaultNotes(rows));
    saveSyncState({mode:'supabase', status:'Supabase güncelleme notları aktif', message:`${rows.length} not Supabase üzerinden okundu.`});
    if(force){ toast(rows.length?'Güncelleme notları yenilendi.':'Supabase bağlı ama not yok.'); render(); }
    return rows;
  }catch(err){
    saveSyncState({mode:'local', status:'Güncelleme notları yerel güvenli modda', message:err?.message || 'Notlar okunamadı.'});
    if(force){ toast('Güncelleme notları Supabase bağlanamadı, yerel güvenli mod açık.'); render(); }
    return loadNotes();
  }
}
async function refreshSiteDataFromSupabase({force=false}={}){
  await Promise.allSettled([
    refreshGamesFromSupabase({force:force === true}),
    refreshEventsFromSupabase({force:false}),
    refreshNotesFromSupabase({force:false}),
    refreshSiteRuntimeFromSupabase({force:false})
  ]);
  if(force){ toast('Supabase site verileri yenilendi.'); render(); }
}
async function persistEventToSupabase(event){
  const token=sessionToken();
  if(!token){ saveSyncState({mode:'local', status:'Takvim yerel kayıt aktif', message:'Supabase takvim kaydı için kurucu hesabıyla giriş yap.'}); return null; }
  const data=await apiJson('calendar-events-upsert',{adminToken:token,event});
  if(data?.event){
    const remote=normalizeRemoteEvent(data.event);
    const rows=loadEvents();
    const exists=rows.some(e=>String(e.id)===String(event.id));
    saveEvents(exists?rows.map(e=>String(e.id)===String(event.id)?remote:e):[remote,...rows]);
  }
  saveSyncState({mode:'supabase', status:'Supabase takvim kayıt aktif', message:'Yayın takvimi Supabase üzerinde kaydedildi.'});
  return data;
}
async function deleteEventRemote(event){
  const token=sessionToken();
  if(!token || !event?.id) return null;
  await apiJson('calendar-events-delete',{adminToken:token,id:event.id});
  saveSyncState({mode:'supabase', status:'Supabase takvim silme aktif', message:'Yayın takvimi kaydı Supabase üzerinde pasife alındı.'});
}
async function persistNoteToSupabase(note){
  const token=sessionToken();
  if(!token){ saveSyncState({mode:'local', status:'Not yerel kayıt aktif', message:'Supabase not kaydı için kurucu hesabıyla giriş yap.'}); return null; }
  const data=await apiJson('update-note-save',{adminToken:token,id:note.id,version:note.version,title:note.title,summary:note.summary,status:note.status});
  if(data?.note){
    const remote=normalizeRemoteNote(data.note);
    const rows=loadNotes();
    const exists=rows.some(n=>String(n.id)===String(note.id));
    saveNotes(exists?rows.map(n=>String(n.id)===String(note.id)?remote:n):[remote,...rows]);
  }
  saveSyncState({mode:'supabase', status:'Supabase not kayıt aktif', message:'Güncelleme notu Supabase üzerinde kaydedildi.'});
  return data;
}
async function deleteNoteRemote(note){
  const token=sessionToken();
  if(!token || !note?.id) return null;
  await apiJson('update-note-delete',{adminToken:token,id:note.id});
  saveSyncState({mode:'supabase', status:'Supabase not silme aktif', message:'Güncelleme notu Supabase üzerinde silindi.'});
}
async function persistMaintenanceToSupabase(maintenance){
  const token=sessionToken();
  const stamp=new Date().toISOString();
  const payload={...maintenance, enabled:parseMaintenanceEnabled(maintenance.enabled), adminBypass:true, updatedAt:stamp, updated_at:stamp};
  if(!token){ saveSyncState({mode:'local', status:'Bakım yerel kayıt aktif', message:'Supabase bakım kaydı için kurucu hesabıyla giriş yap.'}); return null; }
  const data=await apiJson('maintenance-save',{adminToken:token,key:'maintenance_mode',maintenance:payload});
  if(data?.maintenance) saveMaintenance({...payload, ...data.maintenance, enabled:parseMaintenanceEnabled(data.maintenance.enabled), source:'supabase'});
  else saveMaintenance({...payload, source:'supabase'});
  saveSyncState({mode:'supabase', status:'Supabase bakım modu aktif', message:payload.enabled ? 'Bakım modu Supabase üzerinde açıldı.' : 'Bakım modu Supabase üzerinde kapatıldı.'});
  return data;
}
function cleanFetchedGameTitle(value=''){
  return String(value || '')
    .replace(/[™®©]/g,'')
    .replace(/\s*[-–—]\s*Steam.*$/i,'')
    .replace(/\s*\|\s*.*$/,'')
    .replace(/\s+/g,' ')
    .trim();
}
function shouldReplaceGameTitle(current='', fetched=''){
  const cur=String(current||'').trim();
  const got=cleanFetchedGameTitle(fetched);
  if(!got) return false;
  if(!cur) return true;
  const norm=v=>String(v||'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const c=norm(cur), g=norm(got);
  if(!c) return true;
  // Kullanıcı tam oyun adını yazdıysa meta çekme bunu bozmasın.
  if(g===c || g.includes(c)) return got.length > cur.length && cur.length < 8;
  return false;
}
function mapMeta(raw, title){
  const m = raw?.meta || raw?.steam || raw || {};
  const local = localGameMetaCandidate(title) || {};
  const fetchedTitle = cleanFetchedGameTitle(m.title || local.title || '');
  const finalTitle = shouldReplaceGameTitle(title, fetchedTitle) ? fetchedTitle : (String(title||'').trim() || fetchedTitle);
  const steamId = m.steamAppId || m.steam_app_id || m.appid || m.appId || local.steamAppId || '';
  const incomingSeries = m.seriesName || m.series_name || m.series || m.franchise || m.franchise_name || m.collectionName || m.collection_name || '';
  const safeSeriesName = cleanSeriesName(local.seriesName || incomingSeries, finalTitle);
  return {
    title: finalTitle,
    genre: m.genre || local.genre || '',
    seriesName: safeSeriesName || '',
    releaseDate: bestReleaseDate(m.releaseDate, m.release_date, m.released, local.releaseDate),
    platforms: Array.isArray(m.platforms) ? m.platforms.join(', ') : (m.platforms || local.platforms || ''),
    tags: Array.isArray(m.tags) ? m.tags.join(', ') : (m.tags || local.tags || ''),
    score: m.score || m.rating || local.score || 0,
    rawgSlug: m.rawgSlug || m.rawg_slug || m.slug || local.rawgSlug || '',
    rawgId: m.rawgId || m.rawg_id || (m.rawg_id === 0 ? '0' : '') || local.rawgId || m.rawgSlug || m.rawg_slug || local.rawgSlug || '',
    steamAppId: steamId,
    cover: m.cover || m.cover_url || m.background_image || m.image || (steamId ? `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg` : local.cover),
    banner: m.banner || m.banner_url || m.background || (steamId ? `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/capsule_616x353.jpg` : local.banner),
    description: m.description || m.summary || local.description || `${m.title || title} için RAWG/Steam bilgi alanları hazırlandı. Tür, kapak, tarih, platform ve seri bilgileri kontrol edilerek kaydedilebilir.`,
    storyText: m.storyText || m.story_text || local.storyText || professionalStoryText({title:m.title || local.title || title, genre:m.genre || local.genre, seriesName:safeSeriesName || local.seriesName}),
    source: raw?.source || m.source || local.source || 'Bilgi paneli'
  };
}
function setField(form, name, value, onlyEmpty=false){
  const el=form?.elements?.[name];
  if(!el || value===undefined || value===null || value==='') return;
  if(onlyEmpty && String(el.value||'').trim()) return;
  el.value=String(value);
  el.dispatchEvent(new Event('input',{bubbles:true}));
}
function fillMetaToForm(form, meta, mode='safe'){
  const onlyEmpty = mode === 'empty';
  const titleEl=form?.elements?.title;
  if(titleEl && shouldReplaceGameTitle(titleEl.value, meta.title)) setField(form,'title',cleanFetchedGameTitle(meta.title), false);
  setField(form,'genre',meta.genre, onlyEmpty);
  setField(form,'seriesName',meta.seriesName, onlyEmpty);
  setField(form,'releaseDate',bestReleaseDate(meta.releaseDate, meta.released), onlyEmpty);
  setField(form,'platforms',meta.platforms, onlyEmpty);
  setField(form,'tags',meta.tags, onlyEmpty);
  setField(form,'cover',meta.cover, onlyEmpty);
  setField(form,'banner',meta.banner, onlyEmpty);
  setField(form,'description',meta.description, onlyEmpty);
  setField(form,'storyText',meta.storyText, onlyEmpty);
  setField(form,'rawgId',meta.rawgId, onlyEmpty);
  setField(form,'rawgSlug',meta.rawgSlug, onlyEmpty);
  setField(form,'steamAppId',meta.steamAppId, onlyEmpty);
  setField(form,'score',meta.score, onlyEmpty);
  setField(form,'metaSource',meta.source || 'v4.0.5 final meta paneli', false);
  setField(form,'metaCheckedAt',new Date().toISOString(), false);
  const box=form.querySelector('[data-meta-status]');
  if(box) box.innerHTML=`<b>Bilgi hazır:</b> ${esc(meta.source || 'v4.0.5')} • ${esc(meta.title || '')}`;
  const img=document.querySelector('.previewBox img');
  if(img && meta.cover) img.src=meta.cover;
}
async function resolveMetaForForm(form, source){
  const title=String(form?.elements?.title?.value || '').trim();
  if(!title){ toast('Önce oyun adını yaz.'); return; }
  const statusBox=form.querySelector('[data-meta-status]');
  if(statusBox) statusBox.textContent='Bilgi çekiliyor...';
  const steamRaw=String(form?.elements?.steamAppId?.value || '').trim();
  const steamAppId=(steamRaw.match(/(\d{3,})/)||[])[1] || steamRaw;
  let raw=null;
  try{
    raw = await apiJson(source==='steam'?'steam-meta-lite':'game-meta-lite', {title, steamAppId, steamdbUrl:steamRaw, releaseDate:form?.elements?.releaseDate?.value || '', cover:form?.elements?.cover?.value || ''});
  }catch(err){
    const local=localGameMetaCandidate(title) || {title};
    if(steamAppId){
      raw = {ok:true, meta:{...local, steamAppId, cover:`https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/header.jpg`, banner:`https://cdn.akamai.steamstatic.com/steam/apps/${steamAppId}/capsule_616x353.jpg`, rawgSlug:local.rawgSlug || slugify(title), rawgId:local.rawgId || local.rawgSlug || slugify(title), source:`Steam CDN yerel kesin kapak • App ID ${steamAppId}`}, source:`Steam CDN yerel kesin kapak • App ID ${steamAppId}`};
    }else{
      raw = {ok:true, meta:{...local, cover:'', banner:'', rawgId:local.rawgId || local.rawgSlug || slugify(title)}, source:'Servis yok / yerel güvenli bilgi'};
    }
  }
  const meta=mapMeta(raw, title);
  fillMetaToForm(form, meta, 'safe');
  toast(source==='steam'?'Steam bilgileri uygulandı.':'RAWG/Bilgi uygulandı.');
}

function loadGames(){
  const stored = firstStoredArray(GAME_KEYS);
  if(stored !== null){
    const normalized = stored.map(normalizeGame);
    if(!keyExists(STORAGE.games)) writeJson(STORAGE.games, normalized);
    localStorage.setItem(STORAGE.gamesInitialized,'1');
    return normalized;
  }
  localStorage.setItem(STORAGE.gamesInitialized,'1');
  writeJson(STORAGE.games, []);
  return [];
}
function saveGames(rows, options={}){
  const incoming = Array.isArray(rows)?rows:[];
  const normalized = incoming.map(normalizeGame);
  const current = firstStoredArray(GAME_KEYS) || [];
  const allowEmpty = options && options.allowEmpty === true;
  const allowDecrease = options && options.allowDecrease === true;
  const explicitDelete = options && options.explicitDelete === true;
  // v4.0.5: Ben silmeden mevcut oyunlar silinmesin.
  // Boş liste veya daha az kayıt, yalnızca açık/manuel silme onayıyla yazılabilir.
  if(current.length > 0 && normalized.length === 0 && !allowEmpty && !explicitDelete){
    saveSyncState({mode:'protected', status:'Arşiv korundu', message:`Boş oyun listesi yazma engellendi. ${current.length} kayıt korunuyor.`});
    return;
  }
  if(current.length > 0 && normalized.length < current.length && !allowDecrease && !explicitDelete){
    saveSyncState({mode:'protected', status:'Arşiv korundu', message:`Kayıt sayısı ${current.length} → ${normalized.length} düşecekti; manuel silme onayı olmadığı için engellendi.`});
    return;
  }
  try{
    localStorage.setItem('hayatimiz_games_last_backup', JSON.stringify(current));
    localStorage.setItem('hayatimiz_games_last_backup_at', new Date().toISOString());
  }catch{}
  for(const key of GAME_KEYS) writeJson(key, normalized);
  localStorage.setItem(STORAGE.gamesInitialized,'1');
  localStorage.setItem('hayatimiz_games_last_saved_at', new Date().toISOString());
}
function deleteGame(id, options={}){
  if(!options.explicitDelete){
    saveSyncState({mode:'protected', status:'Silme engellendi', message:'Oyun silme işlemi açık manuel onay olmadan çalıştırılmadı.'});
    return false;
  }
  const next=loadGames().filter(g=>String(g.id)!==String(id));
  saveGames(next, {source:'confirmed-single-delete', allowEmpty:true, allowDecrease:true, explicitDelete:true});
  return true;
}
function clearAllGames(){ toast('Toplu oyun silme güvenlik için kapalı. Mevcut oyunlar korunuyor.'); saveSyncState({mode:'protected', status:'Toplu silme kapalı', message:'Tüm oyunları sil işlemi kapatıldı.'}); }
function restoreDemoGames(){ saveGames(DEFAULT_GAMES.map(normalizeGame)); }
function firstArray(keys, fallback=[]){ const stored=firstStoredArray(keys); return stored === null ? fallback : stored; }
function loadEvents(){ return firstArray(EVENTS_KEYS, []); }
function saveEvents(rows){ for(const k of EVENTS_KEYS) writeJson(k, Array.isArray(rows)?rows:[]); }
function mergeDefaultNotes(rows){
  const list = Array.isArray(rows) ? rows : [];
  const deprecatedPlanIds = new Set(['plan-v229-takvim-playlist-stabilite','plan-v230-admin-dashboard-veri-sagligi','plan-v226','plan-v226-dashboard','plan-v227','plan-v221']);
  const cleaned = list.filter(n=>{
    const id=String(n?.id||'');
    const status=String(n?.status||'');
    const version=String(n?.version||'');
    if(deprecatedPlanIds.has(id) && status.includes('Plan')) return false;
    if(status.includes('Plan') && /^v2\.(1|2)\./.test(version)) return false;
    return true;
  });
  const has = note => cleaned.some(n => String(n.id||'')===String(note.id||'') || (String(n.version||'')===String(note.version||'') && String(n.title||'')===String(note.title||'')));
  const additions = DEFAULT_NOTES.filter(note => !has(note));
  return [...additions, ...cleaned];
}
function loadNotes(){
  const local=firstArray(NOTES_KEYS, []);
  const rows = Array.isArray(local) ? local : [];
  const merged = mergeDefaultNotes(rows);
  if(JSON.stringify(merged)!==JSON.stringify(rows)) saveNotes(merged);
  return merged.length ? merged : DEFAULT_NOTES;
}
function saveNotes(rows){ const list=Array.isArray(rows)?rows:[]; const compact=compactForStorage(list); for(const k of NOTES_KEYS) writeJson(k, compact); }
function parseMaintenanceEnabled(value){
  if(value === true) return true;
  if(value === false || value == null) return false;
  const text = String(value).trim().toLocaleLowerCase('tr');
  return ['true','1','evet','açık','acik','open','on'].includes(text);
}
function sanitizeMaintenance(raw){
  const base = {enabled:false,message:'Hayatımız Oyun kısa süreli bakımda.',eta:'',percent:0,adminBypass:true,managedBy:'v4.0.5-maintenance-guard'};
  const cfg = {...base, ...(raw && typeof raw==='object' ? raw : {})};
  // Bakım modunu asla otomatik kapatma. Eski paketlerde adminBypass eksik/false gelince
  // enabled=true değeri kapatılıyordu; bu yüzden ziyaretçiler ve normal üyeler siteyi görüyordu.
  // Artık Supabase veya yönetim formundan gelen enabled=true değeri korunur.
  cfg.enabled = parseMaintenanceEnabled(cfg.enabled ?? cfg.is_enabled ?? cfg.active ?? cfg.maintenance_mode);
  cfg.adminBypass = cfg.adminBypass !== false;
  cfg.percent = Math.max(0, Math.min(100, Number(cfg.percent || cfg.progress || 0)));
  cfg.message = String(cfg.message || cfg.title || base.message);
  cfg.eta = String(cfg.eta || cfg.estimated_opening || cfg.estimatedOpening || '');
  return cfg;
}
function loadMaintenance(){
  let found = null;
  for(const key of MAINTENANCE_KEYS){ if(keyExists(key)){ found = readJson(key, null); break; } }
  return sanitizeMaintenance(found || {enabled:false,message:'Hayatımız Oyun kısa süreli bakımda.',eta:'',percent:0,adminBypass:true,managedBy:'v4.0.5-runtime'});
}
function saveMaintenance(v){
  const cfg = sanitizeMaintenance({...v, enabled: parseMaintenanceEnabled(v?.enabled), percent: Math.max(0, Math.min(100, Number(v?.percent||0))), managedBy:'v4.0.5-runtime', updatedAt:new Date().toISOString()});
  for(const key of MAINTENANCE_KEYS) writeJson(key, cfg);
  localStorage.setItem(STORAGE.maintenanceFix,'1');
}
function loadUsers(){ return readJson(STORAGE.users, []); }
function saveUsers(rows){ writeJson(STORAGE.users, (Array.isArray(rows)?rows:[]).filter(u=>!BLOCKED_AUTO_EMAILS.includes(String(u.email||'').trim().toLowerCase()))); }
function isYönetimEmail(email){ return ADMIN_EMAILS.includes(String(email||'').trim().toLowerCase()); }
function currentUser(){ return readJson(STORAGE.session, null); }
function isLoggedIn(){ return !!currentUser(); }
function isYönetim(){ const u=currentUser(); return !!u && (['owner','admin','kurucu','yonetici','yönetici','moderator','editor'].includes(String(u.role||'').toLocaleLowerCase('tr')) || isYönetimEmail(u.email)); }
function roleLabel(role, email=''){
  const r=String(role||'user').toLocaleLowerCase('tr');
  if(isYönetimEmail(email) || ['owner','admin','kurucu','yonetici','yönetici'].includes(r)) return 'Kurucu';
  if(r === 'moderator' || r === 'moderatör') return 'Moderatör';
  if(r === 'editor' || r === 'editör') return 'İçerik Editörü';
  if(r === 'banned' || r === 'banlı') return 'Banlı';
  return 'Üye';
}
function roleValue(role, email=''){
  const r=String(role||'user').toLocaleLowerCase('tr');
  if(isYönetimEmail(email) || ['owner','admin','kurucu','yonetici','yönetici'].includes(r)) return 'kurucu';
  if(r === 'moderator' || r === 'moderatör') return 'moderator';
  if(r === 'editor' || r === 'editör') return 'editor';
  if(r === 'banned' || r === 'banlı') return 'banned';
  return 'user';
}
function roleOptionsHtml(currentRole, email=''){
  const current=roleValue(currentRole,email);
  const allowOwner = String(email||'').trim().toLowerCase() === ADMIN_EMAILS[0] || current === 'kurucu';
  const allRoles=[['kurucu','👑 Kurucu'],['moderator','🛡️ Moderatör'],['editor','✍️ İçerik Editörü'],['user','👤 Üye'],['banned','🚫 Banlı']];
  const roles = allowOwner ? allRoles : allRoles.filter(([value])=>value !== 'kurucu');
  return roles.map(([value,label])=>`<option value="${value}" ${current===value?'selected':''}>${label}</option>`).join('');
}
function userTopbar(){
  const user=currentUser();
  const role=user ? roleLabel(user.role, user.email) : 'Üye';
  const publicLinks = [
    ['/ana-sayfa','🏠 Ana Sayfa'],['/oyun-arsivi','🎮 Arşiv'],['/koleksiyonlar','🗂️ Koleksiyonlar'],['/seriler','🎬 Seriler'],['/yayin-takvimi','📅 Yayın Takvimi'],['/status','📡 Site Durumu'],['/site-rehberi','📘 Site Rehberi']
  ];
  const auth = user
    ? `<div class="topUser"><span class="roleChip">${esc(role)}</span><a class="topBtn" href="/hesabim">👤 Profil</a><button class="topBtn dangerSoft" data-action="logout">🚪 Çıkış Yap</button></div>`
    : `<div class="topUser"><span class="roleChip">👤 Üye</span><a class="topBtn" href="/giris-yap">🔐 Giriş Yap</a><a class="topBtn primarySoft" href="/kayit-ol">📝 Kayıt Ol</a></div>`;
  return `<header class="topBar proStickyTop topOnlyBar"><div class="topIdentity"><b>🎮 Hayatımız Oyun</b><small>${VERSION} • 👑 Tek Kurucu + Yetki Stabilite</small></div><nav class="topQuickNav fullTopNav">${publicLinks.map(([href,label])=>`<a class="${active(href)?'active':''}" href="${href}">${label}</a>`).join('')}</nav>${isYönetim()?'<a class="topAdminOpen" href="/yonetim">🛡️ Yönetim Paneli</a>':''}${auth}</header>`;
}

function signOut(){ localStorage.removeItem(STORAGE.session); }
function route(){ return decodeURI(location.pathname || '/'); }
function isAuthRoute(p=route()){ return ['/giris-yap','/kayit-ol','/auth/login','/auth/register'].includes(p); }
function setRoute(path){ history.pushState({},'',path); render(); window.scrollTo(0,0); }
function toast(msg){ const old=$('.toast'); if(old) old.remove(); const t=document.createElement('div'); t.className='toast'; t.textContent=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),3000); }
function active(path){ const p=route(); return p===path || (path!=='/' && p.startsWith(path)); }
function countBy(rows, key){ return rows.reduce((acc,item)=>{ const k=item[key] || 'Diğer'; acc[k]=(acc[k]||0)+1; return acc; },{}); }
function statusClass(status){ const s=String(status||'').toLowerCase(); return s.includes('tamam')?'green':s.includes('yak')||s.includes('plan')?'amber':s.includes('ara')?'red':''; }
function tagList(g){ return String(g.tags||'').split(',').map(x=>x.trim()).filter(Boolean); }
function splitText(v){ return String(v||'').split(',').map(x=>x.trim()).filter(Boolean); }
function fieldValue(obj, key, fallback=''){ return esc(obj && obj[key] !== undefined && obj[key] !== null ? obj[key] : fallback); }
function uniqueValues(rows, getter){ return Array.from(new Set(rows.map(getter).flat().map(x=>String(x||'').trim()).filter(Boolean))).sort((a,b)=>a.localeCompare(b,'tr')); }
function queryParams(){ return new URLSearchParams(location.search || ''); }
function selectedOption(current, value){ return String(current||'')===String(value||'') ? 'selected' : ''; }
function clearTextMatch(g, q){ if(!q) return true; return [g.title,g.genre,g.seriesName,g.description,g.tags,g.status].join(' ').toLocaleLowerCase('tr').includes(String(q).toLocaleLowerCase('tr')); }
function filterGames(rows, filters){
  return rows.filter(g => clearTextMatch(g, filters.q)
    && (!filters.status || filters.status==='Tümü' || g.status===filters.status)
    && (!filters.genre || filters.genre==='Tümü' || g.genre===filters.genre)
    && (!filters.series || filters.series==='Tümü' || (g.seriesName||'Serisiz')===filters.series)
    && (!filters.tag || filters.tag==='Tümü' || tagList(g).includes(filters.tag))
  );
}
function progressPercent(g){ const total=Number(g.episodeCount||0); const watched=Number(g.watchedEpisodeCount||0); if(!total) return g.status==='Tamamlanan'?100:0; return Math.max(0, Math.min(100, Math.round((watched/total)*100))); }

function watchSettings(){ return readJson(STORAGE.watchSettings, {quality:'Otomatik', theater:true}); }
function saveWatchSettings(patch){ writeJson(STORAGE.watchSettings, {...watchSettings(), ...(patch||{})}); }
function loadWatchHistory(){ return readJson(STORAGE.watchHistory, []); }
function saveWatchHistory(rows){ writeJson(STORAGE.watchHistory, Array.isArray(rows)?rows.slice(0,120):[]); }
function watchHistoryForCurrentUser(){
  const user=currentUser();
  const email=String(user?.email||'ziyaretci').toLowerCase();
  return loadWatchHistory().filter(h=>String(h.email||'ziyaretci').toLowerCase()===email);
}
function watchProfileSummary(){
  const games=buildArchiveModel(loadGames()).games;
  const history=watchHistoryForCurrentUser();
  const watchedGames=games.filter(g=>Number(g.watchedEpisodeCount||0)>0);
  const totalEpisodes=games.reduce((sum,g)=>sum+(Number(g.episodeCount||0)||loadEpisodes(g.id).length||0),0);
  const watchedEpisodes=games.reduce((sum,g)=>sum+Number(g.watchedEpisodeCount||0),0);
  const progress=totalEpisodes?Math.round((watchedEpisodes/totalEpisodes)*100):0;
  const last=history[0] || null;
  const continueRows=games.filter(g=>{ const total=Number(g.episodeCount||0)||loadEpisodes(g.id).length||0; const watched=Number(g.watchedEpisodeCount||0); return total>0 && watched<total; }).sort((a,b)=>Number(b.watchedEpisodeCount||0)-Number(a.watchedEpisodeCount||0)).slice(0,6);
  return {history, watchedGames, totalEpisodes, watchedEpisodes, progress, last, continueRows};
}
function addWatchHistory(game, episodeNumber=0, episodeTitle=''){
  if(!game) return;
  const user=currentUser();
  const email=String(user?.email||'ziyaretci').toLowerCase();
  const total=Number(game.episodeCount||0)||loadEpisodes(game.id).length||0;
  const watched=Number(game.watchedEpisodeCount||episodeNumber||0);
  const row={id:`watch-${Date.now()}-${Math.random().toString(16).slice(2)}`,email,displayName:user?.displayName||user?.email||'Ziyaretçi',gameId:game.id,gameTitle:game.title,seriesName:game.seriesName||'',episodeNumber:Number(episodeNumber||watched||0),episodeTitle:episodeTitle||`${Number(episodeNumber||watched||0)}. Bölüm`,watchedEpisodeCount:watched,totalEpisodes:total,progress:total?Math.round((watched/total)*100):0,watchedAt:new Date().toISOString(),source:'site'};
  const next=[row, ...loadWatchHistory().filter(h=>!(String(h.email).toLowerCase()===email && String(h.gameId)===String(row.gameId) && Number(h.episodeNumber)===Number(row.episodeNumber)))];
  saveWatchHistory(next);
  persistWatchHistoryToSupabase(row).catch(err=>console.warn('İzleme geçmişi Supabase yerel modda kaldı:', err.message));
}
async function persistWatchHistoryToSupabase(row){
  if(!row || !row.gameId) return null;
  return apiJson('watch-history-add',{...row, adminToken:sessionToken()});
}
function clearCurrentWatchHistory(){
  const user=currentUser();
  const email=String(user?.email||'ziyaretci').toLowerCase();
  saveWatchHistory(loadWatchHistory().filter(h=>String(h.email||'ziyaretci').toLowerCase()!==email));
}

function videoIdFromUrl(raw){
  const value=String(raw||'').trim();
  if(!value) return '';
  try{ const u=new URL(value); if(u.hostname.includes('youtu.be')) return u.pathname.replace('/','').slice(0,11); const v=u.searchParams.get('v'); if(v) return v.slice(0,11); const m=u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})|\/shorts\/([a-zA-Z0-9_-]{11})/); if(m) return (m[1]||m[2]||'').slice(0,11); }catch{}
  const m=value.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/) || value.match(/^([a-zA-Z0-9_-]{11})$/);
  return m ? m[1] : '';
}
function videoEmbedSrc(game, episode){
  const videoId = videoIdFromUrl(episode?.videoUrl) || episode?.videoId || videoIdFromUrl(game?.videoUrl || game?.youtubeUrl || '');
  if(videoId) return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?rel=0&modestbranding=1&playsinline=1`;
  const playlistId = game?.youtubePlaylistId || extractYoutubePlaylistId(game?.youtubePlaylistUrl || '');
  if(playlistId) return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlistId)}&rel=0&modestbranding=1&playsinline=1`;
  return '';
}
function alphaKey(title){
  const t=String(title||'').trim();
  if(!t) return '#';
  const ch=t[0].toLocaleUpperCase('tr');
  if(/[0-9]/.test(ch)) return '0-9';
  return ch.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleUpperCase('tr');
}
function alphabetGroups(rows){
  const groups=new Map();
  [...(rows||[])].sort((a,b)=>String(a.title).localeCompare(String(b.title),'tr')).forEach(g=>{ const k=alphaKey(g.title); if(!groups.has(k)) groups.set(k, []); groups.get(k).push(g); });
  const order=[...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(x=>x==='0'?'0-9':x);
  return Array.from(groups.entries()).sort((a,b)=>{ const ia=order.indexOf(a[0]); const ib=order.indexOf(b[0]); return (ia<0?999:ia)-(ib<0?999:ib) || a[0].localeCompare(b[0],'tr'); });
}

function sortGamesForView(rows, sort='akilli'){
  const arr=[...(rows||[])];
  const mode=String(sort||'akilli');
  if(mode==='az') return arr.sort((a,b)=>String(a.title||'').localeCompare(String(b.title||''),'tr'));
  if(mode==='za') return arr.sort((a,b)=>String(b.title||'').localeCompare(String(a.title||''),'tr'));
  if(mode==='series') return arr.sort((a,b)=>String(a.seriesName||'Serisiz').localeCompare(String(b.seriesName||'Serisiz'),'tr') || Number(a.seriesOrder ?? a.sortOrder ?? 0)-Number(b.seriesOrder ?? b.sortOrder ?? 0) || String(a.title||'').localeCompare(String(b.title||''),'tr'));
  if(mode==='status') return arr.sort((a,b)=>statusBucket(a.status).localeCompare(statusBucket(b.status),'tr') || String(a.title||'').localeCompare(String(b.title||''),'tr'));
  if(mode==='new') return arr.sort((a,b)=>String(b.releaseDate||'').localeCompare(String(a.releaseDate||''),'tr') || String(a.title||'').localeCompare(String(b.title||''),'tr'));
  if(mode==='numeric') return arr.sort((a,b)=>{ const an=alphaKey(a.title)==='0-9'?0:1; const bn=alphaKey(b.title)==='0-9'?0:1; return an-bn || String(a.title||'').localeCompare(String(b.title||''),'tr'); });
  return arr.sort((a,b)=>Number(a.sortOrder||0)-Number(b.sortOrder||0) || String(a.title||'').localeCompare(String(b.title||''),'tr'));
}
function sortSelectOptions(current){
  const options=[['akilli','🎯 Akıllı sıra'],['az','🔤 A’dan Z’ye'],['za','🔡 Z’den A’ya'],['numeric','🔢 0-9 önce'],['series','🎬 Seri sırasına göre'],['status','📌 Duruma göre'],['new','🗓️ Yeni çıkış önce']];
  return options.map(([value,label])=>`<option value="${value}" ${String(current)===value?'selected':''}>${label}</option>`).join('');
}
function alphabetMiniIndex(rows, base='/oyun-arsivi'){
  const groups=alphabetGroups(rows);
  if(!groups.length) return '';
  return `<section class="alphaMini proAlphaJump"><div class="sectionHead compact"><div><h2>🔤 Harfe Git</h2><p>A Harfinde Başlayan Oyunlar, B Harfinde Başlayan Oyunlar ve 0-9 ile başlayan oyunlara hızlı geçiş.</p></div></div><div class="alphaIndex">${groups.map(([k,items])=>`<a href="#harf-${encodeURIComponent(k)}"><b>${esc(k)}</b><span>${items.length} oyun</span></a>`).join('')}</div></section>`;
}
function alphabetGroupedCards(rows){
  const groups=alphabetGroups(rows);
  if(!groups.length) return '';
  return groups.map(([k,items])=>`<section class="alphaGroup" id="harf-${encodeURIComponent(k)}"><div class="sectionHead"><div><h2>🔤 ${esc(k)} Harfinde Başlayan Oyunlar</h2><p>🎮 ${items.length} oyun bu harf grubunda listeleniyor.</p></div><a class="btn secondary" href="#top">⬆️ Üste Dön</a></div><div class="grid archiveGrid">${items.map(gameCard).join('')}</div></section>`).join('');
}
function seriesLetterIndex(items){
  const groups=new Map();
  for(const item of items||[]){ const name=String(item?.[0]||'Serisiz'); const k=alphaKey(name); groups.set(k,(groups.get(k)||0)+1); }
  const order=[...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(x=>x==='0'?'0-9':x);
  const rows=Array.from(groups.entries()).sort((a,b)=>{ const ia=order.indexOf(a[0]); const ib=order.indexOf(b[0]); return (ia<0?999:ia)-(ib<0?999:ib) || a[0].localeCompare(b[0],'tr'); });
  if(!rows.length) return '';
  return `<section class="alphaMini proAlphaJump"><div class="sectionHead compact"><div><h2>🎬🔤 Seri Harfine Git</h2><p>A serisi, B serisi ve 0-9 ile başlayan serilere hızlı geçiş.</p></div></div><div class="alphaIndex">${rows.map(([k,count])=>`<a href="#seri-harf-${encodeURIComponent(k)}"><b>${esc(k)}</b><span>${count} seri</span></a>`).join('')}</div></section>`;
}
function professionalStoryText(gameOrTitle, genre='', seriesName=''){
  const g=typeof gameOrTitle==='object' ? gameOrTitle : {title:gameOrTitle, genre, seriesName};
  const title=String(g.title||'Bu oyun').trim();
  const series=cleanSeriesName(g.seriesName, title) || title;
  const lower=`${title} ${g.genre||''} ${series}`.toLocaleLowerCase('tr');
  if(/007|first\s*light|james\s*bond/.test(lower)) return 'Görevin henüz başında, çiçeği burnunda bir ajan olan James Bond, MI6 tarafından küresel dengeleri tehdit eden gizli bir yapılanmayı çökertmekle görevlendirilir. "First Light" (İlk Işık) operasyonu, Bond’un sadece fiziksel sınırlarını değil, aynı zamanda bir ajan olarak ahlaki sınırlarını ve sadakatini de ilk kez ciddi şekilde test edeceği bir vaftiz törenine dönüşür.';
  if(/plague.*innocence|innocence/.test(lower)) return `${title}, salgın ve savaşın gölgesindeki Orta Çağ Fransa’sında Amicia ile küçük kardeşi Hugo’nun hayatta kalma mücadelesini takip eder. Yolculuk, iki kardeşin hem peşlerindeki karanlık güçlerden kaçmasını hem de Hugo’nun taşıdığı gizemli tehdidin gerçek yüzünü anlamaya çalışmasını merkezine alır.`;
  if(/alan\s*wake/.test(lower)) return `${title}, karanlıkla gerçeklik arasındaki çizginin giderek kaybolduğu ${series} evreninde geçen gerilim dolu bir hikaye deneyimi sunar. Anlatı, karakterin zihinsel mücadelesini, kasabanın sırlarını ve bölüm bölüm artan tehdit duygusunu spoiler vermeden öne çıkarır.`;
  const type=String(g.genre||'hikaye odaklı macera').trim().toLocaleLowerCase('tr');
  return `${title}, ${series} serisinin atmosferini ve ana çatışmasını merkezine alan ${type} odaklı bir arşiv deneyimi sunar. Hikaye anlatımı; sadece teknik bilgi vermek yerine karakterlerin hedeflerini, karşılaştıkları tehdidi, bölüm bölüm yükselen gerilimi ve izleyicinin seriden ne beklemesi gerektiğini spoiler vermeden açıklar.`;
}
function publicStoryForGame(g){
  const raw=String(g?.storyText||g?.hikaye||'').trim();
  const looksBad=/Platform bilgisi:|Türkçe gösterim için hazırlanmıştır|RAWG meta|oyunun evrenine|karakterlerine ve bölüm bölüm|Ana konu;|örnek/i.test(raw);
  if(raw.length>130 && !looksBad) return raw;
  return professionalStoryText(g||{});
}
function shortStoryForGame(g){ const story=publicStoryForGame(g); const parts=story.split('. ').filter(Boolean); return parts.slice(0,2).join('. ') + (parts.length>2?'.':''); }
function localUserRows(){
  const local=loadUsers()
    .filter(u=>!BLOCKED_AUTO_EMAILS.includes(String(u.email||'').trim().toLowerCase()))
    .map((u,i)=>({id:u.id||`local-${i}`,email:u.email,displayName:u.displayName||u.full_name||u.email,role:roleValue(u.role||'user',u.email),is_active:u.is_active!==false,source:u.source||'Tarayıcı'}));
  const current=currentUser();
  const currentEmail=String(current?.email||'').trim().toLowerCase();
  if(current && !BLOCKED_AUTO_EMAILS.includes(currentEmail) && !local.some(u=>String(u.email).toLowerCase()===currentEmail)) local.unshift({id:'current-session',email:current.email,displayName:current.displayName||current.email,role:roleValue(current.role||'user',current.email),is_active:true,source:'Oturum'});
  return local;
}


function statusBucket(status){
  const s=String(status||'').toLocaleLowerCase('tr');
  if(s.includes('tamam')) return 'Tamamlanan';
  if(s.includes('devam')) return 'Devam Eden';
  if(s.includes('yak') || s.includes('plan')) return 'Planlanan / Yakında';
  if(s.includes('ara')) return 'Ara Verildi';
  return 'Diğer';
}
function collectionName(g){
  return String(g.collectionName || g.seriesName || g.genre || statusBucket(g.status) || 'Genel Koleksiyon').trim() || 'Genel Koleksiyon';
}
function buildArchiveModel(rows){
  const games=(Array.isArray(rows)?rows:[]).map(normalizeGame).sort((a,b)=>Number(a.sortOrder||0)-Number(b.sortOrder||0) || String(a.title).localeCompare(String(b.title),'tr'));
  const statuses=countBy(games.map(g=>({...g,statusBucket:statusBucket(g.status)})),'statusBucket');
  const series=new Map(); const collections=new Map();
  for(const g of games){
    const sk=g.seriesName || 'Serisiz Oyunlar';
    if(!series.has(sk)) series.set(sk, []);
    series.get(sk).push(g);
    const ck=collectionName(g);
    if(!collections.has(ck)) collections.set(ck, []);
    collections.get(ck).push(g);
  }
  const episodeTotal=games.reduce((sum,g)=>sum+Number(g.episodeCount||0),0);
  const watchedTotal=games.reduce((sum,g)=>sum+Number(g.watchedEpisodeCount||0),0);
  return {games,statuses,series,collections,episodeTotal,watchedTotal};
}
function seriesBucket(rows){
  const buckets=rows.map(g=>statusBucket(g.status));
  if(buckets.every(x=>x==='Tamamlanan')) return 'Tamamlanan Seriler';
  if(buckets.some(x=>x==='Devam Eden')) return 'Devam Eden Seriler';
  if(buckets.some(x=>x==='Planlanan / Yakında')) return 'Planlanan / Yakında';
  if(buckets.some(x=>x==='Ara Verildi')) return 'Ara Verilen Seriler';
  return 'Diğer Seriler';
}
function collectionCard(name, rows){
  const total=rows.length; const episodes=rows.reduce((sum,g)=>sum+Number(g.episodeCount||0),0); const watched=rows.reduce((sum,g)=>sum+Number(g.watchedEpisodeCount||0),0); const pct=episodes?Math.round((watched/episodes)*100):0;
  const main=rows[0] || {};
  return `<article class="collectionCard"><div class="collectionCover"><img src="${esc(main.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(name)}"><span class="pill ${statusClass(main.status)}">${esc(statusBucket(main.status))}</span></div><div class="collectionBody"><h3>${esc(name)}</h3><p>${total} oyun • ${episodes} bölüm • ${pct}% takip</p><div class="progressMini"><i><span style="width:${pct}%"></span></i><small>${watched}/${episodes} bölüm izlendi</small></div><div class="collectionMiniList">${rows.slice(0,4).map(g=>`<span>${esc(g.title)}</span>`).join('')}</div><div class="collectionActions"><a class="miniBtn primary" href="/oyun-arsivi?series=${encodeURIComponent(name)}">Koleksiyonu Aç</a><a class="miniBtn" href="${seriesWatchHref(name)}">Tüm Seriyi İzle</a></div></div></article>`;
}
function moveGameOrder(id, delta){
  const rows=loadGames().map((g,i)=>({...g, sortOrder:Number(g.sortOrder||i)})).sort((a,b)=>Number(a.sortOrder)-Number(b.sortOrder));
  const idx=rows.findIndex(g=>String(g.id)===String(id));
  if(idx<0) return [];
  const target=idx+Number(delta||0);
  if(target<0 || target>=rows.length) return rows;
  const tmp=rows[idx]; rows[idx]=rows[target]; rows[target]=tmp;
  const next=rows.map((g,i)=>({...g, sortOrder:i, seriesOrder:Number(g.seriesOrder ?? g.sortOrder ?? i)}));
  saveGames(next);
  return next;
}
function orderedSeriesRows(rows){
  return (Array.isArray(rows)?rows:[]).map((g,i)=>normalizeGame(g,i)).sort((a,b)=>Number(a.seriesOrder ?? a.sortOrder ?? 0)-Number(b.seriesOrder ?? b.sortOrder ?? 0) || String(a.title).localeCompare(String(b.title),'tr'));
}
function getSeriesRows(name){
  const key=String(name||'').trim();
  if(!key) return [];
  return orderedSeriesRows(loadGames().filter(g=>String(g.seriesName||'Serisiz Oyunlar')===key));
}
function seriesWatchHref(name){
  return `/izle?series=${encodeURIComponent(name)}`;
}
function seriesTotals(rows){
  const games=orderedSeriesRows(rows);
  const episodes=games.reduce((sum,g)=>sum+(loadEpisodes(g.id).length || Number(g.episodeCount||0)),0);
  const watched=games.reduce((sum,g)=>sum+Number(g.watchedEpisodeCount||0),0);
  const pct=episodes?Math.round((watched/episodes)*100):0;
  return {games, episodes, watched, pct};
}

function nextEpisodeLabelForSeries(rows){
  const games=orderedSeriesRows(rows);
  let maxWatched=0, maxKnown=0;
  for(const g of games){
    const eps=loadEpisodes(g.id);
    const total=eps.length || Number(g.episodeCount||0);
    maxKnown=Math.max(maxKnown,total);
    maxWatched=Math.max(maxWatched,Number(g.watchedEpisodeCount||0));
  }
  const next=(maxWatched||0)+1;
  return maxKnown && next<=maxKnown ? `${next}. Bölüm sıradaki` : `${next}. Bölüm yakında`;
}
function seriesPremiumCard(name, rows){
  const totals=seriesTotals(rows);
  const games=totals.games;
  const main=games[0]||{};
  const bucket=seriesBucket(rows);
  const nextLabel=nextEpisodeLabelForSeries(rows);
  const banner=main.banner || main.cover || '/assets/hayatimiz-kapak.png';
  const gameLines=games.slice(0,5).map((g,i)=>{
    const eps=loadEpisodes(g.id).length || Number(g.episodeCount||0);
    const watched=Number(g.watchedEpisodeCount||0);
    return `<a href="/oyun-detay?id=${encodeURIComponent(g.id)}" class="seriesGameLine premiumLine"><b>${i+1}</b><img src="${esc(g.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(g.title)}"><span>🎮 ${esc(g.title)}</span><small>${watched}/${eps} bölüm</small></a>`;
  }).join('');
  return `<article class="seriesPanel proSeriesPanel premiumSeriesCard ${statusClass(bucket)}" style="--series-bg:url('${esc(banner)}')"><div class="premiumSeriesShade"></div><div class="seriesCoverLine premiumSeriesHead"><img src="${esc(main.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(name)}"><div><span class="pill ${statusClass(bucket)}">📌 ${esc(bucket)}</span><h3>🎬 ${esc(name)}</h3><p>🎮 ${games.length} oyun • ▶️ ${totals.episodes} bölüm • 📊 %${totals.pct} takip</p><strong class="nextEpisodeBadge">⏭️ ${esc(nextLabel)}</strong></div></div><div class="progressMini"><i><span style="width:${totals.pct}%"></span></i><small>✅ ${totals.watched}/${totals.episodes} bölüm izlendi</small></div><div class="seriesGameList premiumSeriesList">${gameLines || '<span class="muted">Bu seride oyun yok.</span>'}</div><div class="seriesActions"><a class="miniBtn primary" href="${seriesWatchHref(name)}">▶️ Tüm Seriyi İzle</a><a class="miniBtn" href="/oyun-arsivi?series=${encodeURIComponent(name)}&sort=az">🎮 Oyunları Aç</a>${isYönetim()?`<a class="miniBtn" href="/yonetim/seriler?series=${encodeURIComponent(name)}">🛠️ Seriyi Düzenle</a>`:''}</div></article>`;
}
async function persistSeriesUpdateToSupabase(seriesName, updates){
  const token=sessionToken();
  if(!token){ saveSyncState({mode:'local', status:'Seri yerel kaydedildi', message:'Supabase seri kaydı için kurucu/moderatör hesabıyla giriş yap.'}); return null; }
  const data=await apiJson('series-games-save',{adminToken:token, seriesName, updates});
  saveSyncState({mode:'supabase', status:'Supabase seri kayıt aktif', message:`${data.updated||0} oyun seri düzeni Supabase üzerine kaydedildi.`});
  return data;
}
function renumberSeriesEditor(form){
  if(!form) return;
  const rows=[...form.querySelectorAll('[data-series-dnd-item]')];
  let n=0;
  for(const row of rows){
    const cb=row.querySelector('input[type="checkbox"][name="gameIds"]');
    const input=row.querySelector('[data-series-order-input]');
    if(cb?.checked && input) input.value=String(++n);
  }
  updateSeriesEditorPreview(form);
}
function selectedSeriesRowsFromForm(form){
  if(!form) return [];
  return [...form.querySelectorAll('[data-series-dnd-item]')].filter(row=>row.querySelector('input[type="checkbox"][name="gameIds"]')?.checked).map((row,i)=>{
    const id=row.dataset.gameId||'';
    const title=row.dataset.gameTitle||row.querySelector('.seriesDndTitle b')?.textContent||id;
    const order=Number(row.querySelector('[data-series-order-input]')?.value||i+1);
    return {id,title,order};
  }).sort((a,b)=>a.order-b.order || a.title.localeCompare(b.title,'tr'));
}
function updateSeriesEditorPreview(form){
  const target=form?.querySelector('[data-series-preview]');
  if(!target) return;
  const rows=selectedSeriesRowsFromForm(form);
  target.innerHTML = rows.length ? rows.map((r,i)=>`<span><b>${i+1}</b> ${esc(r.title)}</span>`).join('') : '<span>Henüz seçili oyun yok.</span>';
}
function sortSeriesEditorRows(form, mode){
  const list=form?.querySelector('[data-series-dnd-list]');
  if(!list) return;
  const rows=[...list.querySelectorAll('[data-series-dnd-item]')];
  const selected=rows.filter(row=>row.querySelector('input[type="checkbox"][name="gameIds"]')?.checked);
  const rest=rows.filter(row=>!row.querySelector('input[type="checkbox"][name="gameIds"]')?.checked);
  const cmp=(a,b)=>{
    if(mode==='episode') return Number(b.dataset.episodeTotal||0)-Number(a.dataset.episodeTotal||0) || a.dataset.gameTitle.localeCompare(b.dataset.gameTitle,'tr');
    if(mode==='status') return String(a.dataset.status||'').localeCompare(String(b.dataset.status||''),'tr') || a.dataset.gameTitle.localeCompare(b.dataset.gameTitle,'tr');
    if(mode==='release') return String(a.dataset.releaseDate||'9999').localeCompare(String(b.dataset.releaseDate||'9999'),'tr') || a.dataset.gameTitle.localeCompare(b.dataset.gameTitle,'tr');
    return a.dataset.gameTitle.localeCompare(b.dataset.gameTitle,'tr');
  };
  selected.sort(cmp);
  list.innerHTML='';
  [...selected,...rest].forEach(row=>list.appendChild(row));
  renumberSeriesEditor(form);
}


function extractYoutubePlaylistId(raw){
  const value=String(raw||'').trim();
  if(!value) return '';
  try{ const u=new URL(value); const list=u.searchParams.get('list'); if(list) return list; }catch{}
  const m=value.match(/[?&]list=([^&\s]+)/)||value.match(/playlist\?list=([^&\s]+)/)||value.match(/list=([^&\s]+)/)||value.match(/^(PL|UU|OL)[a-zA-Z0-9_-]{10,}$/);
  return m ? decodeURIComponent(m[1] || m[0]) : '';
}
function episodeStoreKey(gameId){ return `${STORAGE.episodes}:${String(gameId||'global')}`; }
function pickEpisodeThumbnail(ep={}, videoId=''){
  const direct = ep.thumbnail || ep.thumbnailUrl || ep.thumbnail_url || ep.image || ep.image_url || ep.cover || ep.cover_url || ep.snippet?.thumbnails?.maxres?.url || ep.snippet?.thumbnails?.standard?.url || ep.snippet?.thumbnails?.high?.url || ep.snippet?.thumbnails?.medium?.url || ep.snippet?.thumbnails?.default?.url || '';
  if(direct && !/hayatimiz-kapak|hayatimiz-logo|site-logo|logo\.png/i.test(String(direct))) return String(direct);
  const yt = videoId || ep.videoId || ep.youtubeVideoId || ep.youtube_video_id || ep.contentDetails?.videoId || '';
  if(yt) return `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`;
  return '';
}
function normalizeEpisode(ep={}, i=0){
  const rawNumber=Number(ep.number || ep.episodeNumber || ep.episode_number || i+1);
  const n=Number.isFinite(rawNumber) && rawNumber>0 ? rawNumber : i+1;
  const rawUrl=String(ep.videoUrl || ep.video_url || ep.url || '').trim();
  const fromUrl = typeof videoIdFromUrl==='function' ? videoIdFromUrl(rawUrl) : '';
  const videoId=String(ep.videoId || ep.youtubeVideoId || ep.youtube_video_id || ep.contentDetails?.videoId || fromUrl || '').trim();
  const url=rawUrl || (videoId?`https://www.youtube.com/watch?v=${videoId}`:'');
  const thumb=pickEpisodeThumbnail(ep, videoId);
  const rawTitle=ep.title || ep.name || ep.snippet?.title || ep.episodeTitle || ep.episode_title || `${n}. Bölüm`;
  const title=typeof cleanYoutubeTitle==='function' ? cleanYoutubeTitle(rawTitle) : String(rawTitle||`${n}. Bölüm`);
  return {id:ep.id || (videoId?`yt-${videoId}`:`ep-${n}`), number:n, title, description:ep.description || ep.snippet?.description || '', thumbnail:thumb, videoId, videoUrl:url, watched:ep.watched === true || ep.is_watched === true};
}
function isBadEpisodeTitle(title){
  const t=String(title||'').trim();
  if(!t) return true;
  return /^\d+\.\s*Bölüm$/i.test(t) || /^.+\s+\d+\.\s*Bölüm$/i.test(t);
}
function isSiteFallbackThumb(url){
  return !String(url||'').trim() || /hayatimiz-kapak|hayatimiz-logo|site-logo|placeholder/i.test(String(url||''));
}
function isYoutubeThumb(url){
  return /ytimg\.com|i\.ytimg\.com|youtube/i.test(String(url||''));
}
function pickBetterEpisodeTitle(oldTitle, newTitle){
  if(isBadEpisodeTitle(newTitle) && !isBadEpisodeTitle(oldTitle)) return oldTitle;
  if(isBadEpisodeTitle(oldTitle) && !isBadEpisodeTitle(newTitle)) return newTitle;
  // YouTube'dan gelen uzun başlıkları koru; otomatik öneri başlıkları gerçek başlığın üstüne yazmasın.
  if(String(oldTitle||'').includes('||') && !String(newTitle||'').includes('||')) return oldTitle;
  return oldTitle || newTitle || '';
}
function pickBetterEpisodeThumb(oldThumb, newThumb){
  if(isSiteFallbackThumb(newThumb) && !isSiteFallbackThumb(oldThumb)) return oldThumb;
  if(isSiteFallbackThumb(oldThumb) && !isSiteFallbackThumb(newThumb)) return newThumb;
  if(isYoutubeThumb(oldThumb) && !isYoutubeThumb(newThumb)) return oldThumb;
  return oldThumb || newThumb || '';
}

function dedupeEpisodes(items=[]){
  const seen=new Set();
  const safe=Array.isArray(items)?items:[];
  return safe
    .map((ep,i)=>normalizeEpisode(ep,i))
    .filter((ep)=>{
      const key=ep.videoId?`video:${ep.videoId}`:(ep.videoUrl?`url:${ep.videoUrl}`:`num:${ep.number}:${ep.title}`);
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a,b)=>Number(a.number||0)-Number(b.number||0));
}

function mergeEpisodeListsForSave(localList=[], remoteList=[]){
  const local=dedupeEpisodes(localList || []);
  const remote=dedupeEpisodes(remoteList || []);
  if(!remote.length) return local;
  if(!local.length) return remote;
  const byKey=new Map();
  local.forEach(ep=>byKey.set(ep.videoId?`video:${ep.videoId}`:`num:${ep.number}`, ep));
  remote.forEach(ep=>{
    const key=ep.videoId?`video:${ep.videoId}`:`num:${ep.number}`;
    const old=byKey.get(key);
    if(!old){ byKey.set(key, ep); return; }
    byKey.set(key, {
      ...ep,
      ...old,
      title: pickBetterEpisodeTitle(old.title, ep.title),
      thumbnail: pickBetterEpisodeThumb(old.thumbnail, ep.thumbnail),
      videoId: old.videoId || ep.videoId,
      videoUrl: old.videoUrl || ep.videoUrl,
      description: old.description || ep.description || '',
      number: Number(old.number || ep.number || 0)
    });
  });
  return [...byKey.values()].sort((a,b)=>Number(a.number||0)-Number(b.number||0));
}
function loadEpisodes(gameId){
  const id=String(gameId||'');
  const direct=readJson(episodeStoreKey(id), null);
  if(Array.isArray(direct) && direct.length) return direct.map(normalizeEpisode);
  const game=loadGames().find(g=>String(g.id)===id);
  if(game && Array.isArray(game.episodes) && game.episodes.length) return game.episodes.map(normalizeEpisode);
  // v4.0.5: Sahte/kafasına göre bölüm üretme kapalı. Gerçek YouTube API sonucu yoksa boş göster.
  return [];
}
function saveEpisodes(gameId, episodes, options={}){
  const id=String(gameId||'');
  const list=(Array.isArray(episodes)?episodes:[]).map(normalizeEpisode);
  writeJson(episodeStoreKey(id), list);
  localStorage.setItem('hayatimiz_episodes_last_saved_at', new Date().toISOString());
  if(id && !options.skipGamePatch){
    try{
      const rows=loadGames();
      const next=rows.map((g,i)=>String(g.id)===id ? normalizeGame({...g, episodes:list, episodeCount:list.length || Number(g.episodeCount||0), updatedAt:new Date().toISOString()}, i) : g);
      saveGames(next);
    }catch(err){ console.warn('Bölüm listesi oyun kaydına gömülemedi:', err); }
  }
  return list;
}
function makeLocalEpisodes(title, playlistUrl, count=8){
  const playlistId=extractYoutubePlaylistId(playlistUrl);
  const safeTitle=String(title||'Seri').trim() || 'Seri';
  const n=Math.max(1, Math.min(24, Number(count||8)));
  return Array.from({length:n}, (_,i)=>({id:`local-${slugify(safeTitle)}-${i+1}`, number:i+1, title:`${safeTitle} ${i+1}. Bölüm`, description:playlistId?`Oynatma listesi ID: ${playlistId}`:'Yerel güvenli bölüm', thumbnail:'/assets/hayatimiz-kapak.png', videoId:'', videoUrl:playlistUrl || '', watched:false}));
}
async function fetchPlaylistEpisodes(playlistUrl, title){
  const playlistId=extractYoutubePlaylistId(playlistUrl);
  if(!playlistId) throw new Error('Geçerli playlist linki gerekli.');
  const data=await apiJson('playlist-items', {playlistUrl, title});
  const episodes=Array.isArray(data.episodes) ? data.episodes.map(normalizeEpisode) : [];
  if(!episodes.length) throw new Error(data.error || 'YouTube playlistItems.list gerçek bölüm döndürmedi. Playlist gizli/boş olabilir veya YOUTUBE_API_KEY hatalıdır.');
  return {episodes, count:data.count || episodes.length, source:data.source || 'YouTube Data API v3 playlistItems.list'};
}
function renderEpisodeList(episodes, watched=0, fallbackCover='/assets/hayatimiz-kapak.png'){
  const list=(Array.isArray(episodes)?episodes:[]).slice(0,50);
  if(!list.length) return '<div class="empty compactEmpty">Henüz bölüm listesi yok. Oynatma listesi bağlantısı ekleyip bölümleri çekebilirsin.</div>';
  return `<div class="episodeList">${list.map(ep=>{ const img=ep.thumbnail && !isSiteFallbackThumb(ep.thumbnail) ? ep.thumbnail : fallbackCover; return `<article class="episodeItem ${Number(ep.number)<=Number(watched)?'watched':''}"><img src="${esc(img||'/assets/hayatimiz-kapak.png')}" onerror="this.src='${esc(fallbackCover||'/assets/hayatimiz-kapak.png')}'" alt="${esc(ep.title)}"><div><span class="pill">${esc(ep.number)}. Bölüm</span><h4>${esc(ep.title)}</h4>${ep.videoUrl?`<a class="miniBtn" href="${esc(ep.videoUrl)}" target="_blank" rel="noreferrer">YouTube Aç</a>`:''}</div></article>`; }).join('')}</div>`;
}
function updateGamePatch(id, patch){
  const safePatch={...patch};
  if(Array.isArray(safePatch.episodes)){ safePatch.episodeCount=safePatch.episodes.length || Number(safePatch.episodeCount||0); }
  const next=loadGames().map((g,i)=>String(g.id)===String(id)?normalizeGame({...g,...safePatch,updatedAt:new Date().toISOString()},i):g);
  saveGames(next);
  return next.find(g=>String(g.id)===String(id));
}
async function syncPlaylistForForm(form){
  const playlistUrl=String(form?.elements?.youtubePlaylistUrl?.value||'').trim();
  const title=String(form?.elements?.title?.value||'').trim();
  if(!playlistUrl){ toast('Önce YouTube oynatma listesi URL gir.'); return; }
  const box=form.querySelector('[data-youtube-status]');
  if(box) box.textContent='Oynatma listesi bölümleri çekiliyor...';
  const result=await fetchPlaylistEpisodes(playlistUrl, title || 'Oyun');
  setField(form,'episodeCount',result.count || result.episodes.length, false);
  const hidden=form.elements?.episodesJson;
  if(hidden) hidden.value=JSON.stringify(result.episodes);
  const pid=extractYoutubePlaylistId(playlistUrl);
  setField(form,'youtubePlaylistId',pid,false);
  const editId=String(form.elements?.gameId?.value||'').trim();
  if(editId){
    saveEpisodes(editId, result.episodes);
    updateGamePatch(editId,{episodes:result.episodes, episodeCount:result.count || result.episodes.length, youtubePlaylistUrl:playlistUrl, youtubePlaylistId:pid, episodeSyncSource:result.source, episodeSyncedAt:new Date().toISOString()});
  }
  const preview=form.querySelector('[data-youtube-preview]');
  if(preview) preview.innerHTML=renderEpisodeList(result.episodes, Number(form.elements?.watchedEpisodeCount?.value||0), String(form.elements?.cover?.value||'/assets/hayatimiz-kapak.png'));
  if(box) box.innerHTML=`<b>${result.count || result.episodes.length} bölüm hazır.</b> ${esc(result.source)}`;
  toast('Oynatma listesi bölümleri hazırlandı.');
}
async function syncPlaylistForGame(id){
  const game=loadGames().find(g=>String(g.id)===String(id));
  if(!game){ toast('Oyun bulunamadı.'); return; }
  if(!game.youtubePlaylistUrl){ toast('Bu oyunda playlist URL yok. Düzenle sayfasından ekle.'); return; }
  const data=await apiJson('playlist-sync-lite', {playlistUrl:game.youtubePlaylistUrl, playlistId:extractYoutubePlaylistId(game.youtubePlaylistUrl), title:game.title, gameId:game.id});
  const result={episodes:Array.isArray(data.episodes)?data.episodes.map(normalizeEpisode):[], count:data.count||0, source:data.source||'YouTube Data API v3 playlistItems.list'};
  saveEpisodes(game.id, result.episodes);
  updateGamePatch(game.id,{episodes:result.episodes, episodeCount:result.count || result.episodes.length, youtubePlaylistUrl:game.youtubePlaylistUrl, youtubePlaylistId:extractYoutubePlaylistId(game.youtubePlaylistUrl), episodeSyncSource:result.source, episodeSyncedAt:new Date().toISOString()});
  toast(`${game.title}: ${result.count || result.episodes.length} bölüm senkronize edildi.`);
  render();
}
function setWatchedForGame(id, value){
  const game=loadGames().find(g=>String(g.id)===String(id));
  if(!game) return;
  const total=Number(game.episodeCount||loadEpisodes(id).length||0);
  const watched=Math.max(0, Math.min(total || 9999, Number(value||0)));
  updateGamePatch(id,{watchedEpisodeCount:watched});
  const eps=loadEpisodes(id).map(ep=>({...ep, watched:Number(ep.number)<=watched}));
  if(eps.length) saveEpisodes(id, eps);
}
function canShowYönetimLinks(){ return isYönetim(); }
function nav(){ return ''; }

function emergencySafeHtml(message='Site güvenli moda alındı.'){
  const safeMsg = esc(message || 'Beklenmeyen hata yakalandı.');
  return `<main class="emergencyApp"><section class="emergencyCard"><span class="badge green">🛡️ v4.0.5 • Güvenli Açılış</span><h1>🎮 Hayatımız Oyun</h1><p>${safeMsg}</p><p class="muted">Bu ekran siteyi boş/hatalı bırakmamak için devreye girer. Menüden sayfaları açabilirsin.</p><div class="emergencyLinks"><a href="/ana-sayfa">🏠 Ana Sayfa</a><a href="/oyun-arsivi">🎮 Arşiv</a><a href="/seriler">🎬 Seriler</a><a href="/yayin-takvimi">📅 Yayın Takvimi</a><a href="/giris-yap">🔐 Giriş Yap</a></div></section></main>`;
}
function appBootRepair(){
  try{
    // Eski paketlerden kalan aşırı büyük/gereksiz not önbelleği ana sayfayı bozmasın.
    for(const key of NOTES_KEYS){
      const raw=localStorage.getItem(key);
      if(raw && raw.length > 650000){ localStorage.removeItem(key); }
    }
  }catch(err){ console.warn('Açılış onarımı atlandı:', err && err.message ? err.message : err); }
}

function adminDock(){
  if(!isYönetim() || !route().startsWith('/yonetim')) return '';
  const items=[['/yonetim','🛡️ Panel'],['/yonetim/oyun-ekle','➕ Oyun Ekle'],['/yonetim/not-defteri-oyun-ekle','📝 Notla Oyun Ekle'],['/yonetim/mevcut-oyunlar','🎮 Oyunlar'],['/yonetim/seriler','🎬 Seriler'],['/yonetim/bolum-takibi','▶️ Bölümler'],['/yonetim/yayin-takvimi','📅 Takvim'],['/yonetim/guncelleme-notlari','📝 Notlar'],['/yonetim/bakim-modu','🛠️ Bakım'],['/yonetim/kullanicilar','👥 Kullanıcılar ve Yetkiler'],['/yonetim/veri-sagligi','💾 Veri Sağlığı'],['/yetkili-rehberi','👑 Yetkili Rehberi']];
  return `<section class="adminDock proAdminDock"><div><b>🛡️ Yönetim Paneli</b><small>Yönetim araçları</small></div><nav>${items.map(([href,label])=>`<a class="${active(href)?'active':''}" href="${href}">${label}</a>`).join('')}</nav></section>`;
}
function layout(content){ return `<main class="app noSideApp"><section class="main fullMain">${userTopbar()}${adminDock()}${content}</section></main>`; }
function adminOnly(contentFn){
  if(isYönetim()) return contentFn();
  return layout(`<section class="panel authPanel"><span class="badge red">Yetki gerekli</span><h1>Yönetim alanı gizli</h1><p class="muted">Yönetim paneli, oyun ekleme, mevcut oyunlar ve bakım modu artık herkese görünmez. Devam etmek için 👑 Kurucu, 🛡️ Moderatör veya ✍️ İçerik Editörü hesabıyla giriş yap.</p><div class="actions"><a class="btn primary" href="/giris-yap">Giriş Yap</a><a class="btn secondary" href="/kayit-ol">Kayıt Ol</a></div><p class="muted small">Kurucu e-posta: ${esc(ADMIN_EMAILS[0])}</p></section>`);
}
function maintenanceZiyaretçi(){
  const m=loadMaintenance();
  const startedAt=m.startedAt || m.started_at || m.updatedAt || m.updated_at || new Date().toISOString();
  const autoPct=(()=>{
    const start=new Date(startedAt).getTime();
    const ageMin=Math.max(0, Math.floor((Date.now()-start)/60000));
    const base=Number(m.percent||0);
    // Ziyaretçi ve normal kullanıcı bakım ekranında yüzde otomatik ilerler; 99'da durur, site açılınca ekran kapanır.
    return Math.max(0, Math.min(99, Math.max(base, Math.min(99, 12 + ageMin*3))));
  })();
  const pct=autoPct;
  const notes=loadNotes();
  const done=notes.filter(n=>!String(n.status||'').toLocaleLowerCase('tr').includes('plan')).slice(0,2);
  const planned=notes.filter(n=>String(n.status||'').toLocaleLowerCase('tr').includes('plan')).slice(0,2);
  const doneFallback=[
    {version:VERSION,title:'Bakım ekranı yenilendi',summary:'Site güncellenirken ziyaretçiler daha anlaşılır bakım ekranı görür.'},
    {version:VERSION,title:'Takvim ve kapak sistemi geliştirildi',summary:'Yayın takviminde oyun kapakları otomatik eşleşir.'},
    {version:VERSION,title:'Kullanıcı güvenliği korundu',summary:'Banlı kullanıcılar siteye erişemez; yetki sistemi korunur.'}
  ];
  const plannedFallback=[
    {version:'v4.0.5',title:'Açılış Sonrası Stabilite',summary:'Canlı yayından sonra mobil, veri ve görünüm kontrolleri yapılacak.'},
    {version:'v4.1.0',title:'Topluluk ve Bildirim Merkezi',summary:'Favori serilere yeni bölüm bildirimi, duyurular ve kullanıcı etkileşimleri geliştirilecek.'}
  ];
  const doneRows=(done.length?done:doneFallback);
  const plannedRows=(planned.length?planned:plannedFallback);
  const itemHtml=(row,icon)=>`<article class="maintenanceUpdateItem"><span>${icon} ${esc(row.version||VERSION)}</span><b>${esc(row.title||'Güncelleme')}</b><small>${esc(row.summary||row.description||'')}</small></article>`;
  return `<main class="maintenanceZiyaretçi proMaintenance v221Maintenance gameWallpaperMaintenance updateMaintenancePage"><section class="maintenanceCard proMaintenanceCard v221MaintenanceCard updateMaintenanceCard"><div class="bondSky"><span></span><span></span><span></span></div><div class="bondScan"></div><div class="maintenanceGlow bondGlow"></div><span class="badge amber">🛠️ ${VERSION} • Bakım Modu</span><h1>Site Güncelleniyor</h1><p>${esc(m.message || 'Hayatımız Oyun kısa süreli güncelleme bakımında. Yeni düzenlemeler hazırlanırken site birazdan yeniden açılacak.')}</p><div class="maintenanceProgress bondProgress"><i><span style="width:${pct}%"></span></i><b>%${pct}</b></div><div class="maintenanceInfoGrid cleanMaintenanceInfo compactMaintenanceInfo"><article><b>🎮 Durum</b><span>4.0 açılış hazırlığı devam ediyor.</span></article><article><b>⏰ Tahmini Açılış</b><span>${esc(m.eta || 'Yakında güncellenecek.')}</span></article><article><b>💬 Destek</b><span>Discord</span></article></div><div class="maintenanceUpdatesGrid"><section><h2>✅ Bu Güncellemede Eklenenler</h2><div class="maintenanceUpdateList">${doneRows.map(r=>itemHtml(r,'✅')).join('')}</div></section><section><h2>🚀 Sonraki Güncellemelerde Gelecekler</h2><div class="maintenanceUpdateList">${plannedRows.map(r=>itemHtml(r,'🚀')).join('')}</div></section></div><div class="maintenancePublicActions"><button class="btn ghost" type="button" data-maintenance-retry>🔄 Tekrar Kontrol Et</button><a class="btn secondary" href="https://discord.gg/QXc74Q6UUE" target="_blank" rel="noreferrer">💬 Discord</a></div><small class="maintenanceNote">Bakım tamamlanınca site otomatik normal ekrana döner. İlerleme yüzdesi ziyaretçi ekranında otomatik güncellenir.</small></section></main>`;
}
function bannedZiyaretçi(){
  const discord='https://discord.gg/QXc74Q6UUE';
  const u=currentUser() || {};
  return `<main class="maintenanceZiyaretçi bannedPage v221Banned"><section class="maintenanceCard proMaintenanceCard bannedCard v221BannedCard"><div class="maintenanceGlow"></div><span class="badge red">🚫 Hesap Banlandı</span><h1>Erişim Engellendi</h1><p>Bu hesap Hayatımız Oyun sitesine ulaşamaz. Kurucu veya yetkililerle iletişime geçiniz.</p><div class="banInfo"><b>👤 Hesap:</b> <span>${esc(u.email || 'Bilinmiyor')}</span></div><div class="maintenancePublicActions"><a class="btn primary" href="${discord}" target="_blank" rel="noreferrer">💬 Discord ile iletişime geç</a><button class="btn secondary" type="button" data-action="logout">Çıkış Yap</button></div><small class="maintenanceNote">Banlı kullanıcılar ana sayfa, arşiv, izleme, takvim, profil ve yönetim alanlarına ulaşamaz.</small></section></main>`;
}
function gameCard(g){
  const cls=statusClass(g.status); const tags=tagList(g).slice(0,4); const episodes=loadEpisodes(g.id); const total=episodes.length || Number(g.episodeCount||0); const watched=Number(g.watchedEpisodeCount||0); const pct=total?Math.max(0,Math.min(100,Math.round((watched/total)*100))):progressPercent(g); const episodeText=total?`${total} bölüm`:'Bölüm bekliyor';
  const nextEp=episodes.find(ep=>Number(ep.number)>watched) || episodes[0];
  return `<article class="gameCard proGameCard"><div class="posterWrap"><img src="${esc(g.cover)}" alt="${esc(g.title)}" onerror="this.src='/assets/hayatimiz-kapak.png'"><span class="statusBadge ${cls}">${esc(g.status)}</span></div><div class="cardBody"><div class="cardTop"><span class="pill ${cls}">${esc(g.genre||'Arşiv')}</span><span class="pill">${esc(episodeText)}</span></div><h3>${esc(g.title)}</h3><p>${esc(g.description)}</p><div class="progressMini"><i><span style="width:${pct}%"></span></i><small>${watched}/${total || 0} bölüm • ${pct}% takip</small></div><div class="storyPreview">${esc(shortStoryForGame(g))}</div>${nextEp?`<div class="nextEpisodeLine"><b>Sıradaki:</b> ${esc(nextEp.title)} </div>`:''}<div class="cardActions"><a class="miniBtn primary" href="/izle?id=${encodeURIComponent(g.id)}">Siteden İzle</a><a class="miniBtn" href="/oyun-detay?id=${encodeURIComponent(g.id)}">Detay</a>${nextEp?.videoUrl?`<a class="miniBtn" href="${esc(nextEp.videoUrl)}" target="_blank" rel="noreferrer">YouTube Aç</a>`:''}</div>${tags.length?`<div class="tags">${tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`:''}<div class="metaLine"><span>${g.seriesName?`🎬 ${esc(g.seriesName)}`:'🎬 Serisiz'}</span><span>${g.releaseDate?`📅 ${esc(g.releaseDate)}`:'📅 Tarih yok'}</span></div></div></article>`;
}
function quickCard(href, icon, title, text){ return `<a class="quickCard" href="${href}"><span class="quickIcon">${icon}</span><b>${esc(title)}</b><small>${esc(text)}</small></a>`; }
function statusBar(label,count,total,cls=''){ const pct=total?Math.round((count/total)*100):0; return `<div class="statusBar"><div><span class="pill ${cls}">${esc(label)}</span><b>${count}</b></div><i><span style="width:${pct}%"></span></i></div>`; }
function oldHomeTile(g){
  const pct = progressPercent(g);
  const cls = statusClass(g.status);
  return `<article class="oldHomeTile"><div class="oldHomePoster"><img src="${esc(g.cover)}" alt="${esc(g.title)}" onerror="this.src='/assets/hayatimiz-kapak.png'"><span class="pill ${cls}">${esc(g.status || 'Arşiv')}</span></div><div class="oldHomeTileBody"><h3>${esc(g.title)}</h3><p>${esc(g.description || 'Açıklama eklenmedi.')}</p><div class="oldHomeMeta"><span>🎮 ${esc(g.genre || 'Kategori yok')}</span><span>🎬 ${esc(g.seriesName || 'Serisiz')}</span><span>📅 ${esc(g.releaseDate || 'Tarih yok')}</span></div><div class="progressMini"><i><span style="width:${pct}%"></span></i><small>%${pct} takip / ${Number(g.episodeCount||0)} bölüm</small></div><div class="cardActions"><a class="miniBtn primary" href="/izle?id=${encodeURIComponent(g.id)}">Siteden İzle</a><a class="miniBtn" href="/oyun-detay?id=${encodeURIComponent(g.id)}">Detay</a></div></div></article>`;
}
function oldContinueCard(g){
  const total = Number(g.episodeCount || 0);
  const watched = Number(g.watchedEpisodeCount || 0);
  const pct = progressPercent(g);
  return `<article class="oldContinueCard"><img src="${esc(g.cover)}" alt="${esc(g.title)}" onerror="this.src='/assets/hayatimiz-kapak.png'"><div><span class="pill ${statusClass(g.status)}">${esc(g.status || 'Devam Eden')}</span><h3>${esc(g.seriesName || g.title)}</h3><p>${esc(g.title)} • ${watched}/${total || 0} bölüm</p><div class="progressMini"><i><span style="width:${pct}%"></span></i></div><a class="miniBtn primary" href="/oyun-arsivi?q=${encodeURIComponent(g.title)}">Seriyi Aç</a></div></article>`;
}
function oldHomeAction(href, icon, title, text){ return `<a class="oldActionCard" href="${href}"><span>${icon}</span><b>${esc(title)}</b><small>${esc(text)}</small></a>`; }



function trTodayInfo(){
  const now=new Date();
  const day=now.toLocaleDateString('tr-TR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});
  const time=now.toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'});
  return {now, day, time, iso:now.toISOString().slice(0,10)};
}
function normalizeCalendarGameName(v){
  return String(v||'')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/ı/g,'i')
    .replace(/&/g,' and ')
    .replace(/\b(\d+)\s*\.?\s*bolum\b/g,' ')
    .replace(/\bepisode\s*\d+\b/g,' ')
    .replace(/\b(ep|part)\s*\d+\b/g,' ')
    .replace(/turkce|altyazili|dublajli|canli|yayini|yayin|video|playlist|bolum/gi,' ')
    .replace(/[^a-z0-9]+/g,' ')
    .trim()
    .replace(/\s+/g,' ');
}
function eventSearchName(e){
  const raw=String(e?.gameTitle || e?.game_title || e?.game || e?.title || '').trim();
  const noEpisode=raw
    .replace(/\s*[•|\-–—]\s*\d+\s*\.?\s*Bölüm.*$/i,'')
    .replace(/\s*[•|\-–—]\s*Episode\s*\d+.*$/i,'')
    .replace(/\s*[•|\-–—]\s*Part\s*\d+.*$/i,'');
  return noEpisode.trim() || raw;
}
function findGameForCalendarEvent(e){
  const queryRaw=eventSearchName(e);
  const query=normalizeCalendarGameName(queryRaw);
  if(!query) return null;
  const games=loadGames();
  const rowScore=(g)=>{
    const fields=[g.title,g.seriesName,g.collectionName,g.id,g.rawgSlug].map(normalizeCalendarGameName).filter(Boolean);
    let best=0;
    for(const f of fields){
      if(f===query) best=Math.max(best,100);
      if(f.startsWith(query) || query.startsWith(f)) best=Math.max(best,82);
      if(f.includes(query) || query.includes(f)) best=Math.max(best,70);
      const qWords=query.split(' ').filter(w=>w.length>1);
      const hit=qWords.filter(w=>f.includes(w)).length;
      if(qWords.length && hit===qWords.length) best=Math.max(best,66);
      if(qWords.length && hit>=Math.ceil(qWords.length*0.7)) best=Math.max(best,52);
    }
    return best;
  };
  const ranked=games.map(g=>({g,score:rowScore(g)})).filter(x=>x.score>=52).sort((a,b)=>b.score-a.score);
  return ranked[0]?.g || null;
}
function eventGameCover(e){
  const direct=e && (e.cover || e.coverUrl || e.cover_url || e.image || e.image_url);
  if(direct && !String(direct).includes('hayatimiz-kapak')) return direct;
  const found=findGameForCalendarEvent(e);
  if(found && (found.cover || found.banner)) return found.cover || found.banner;
  const local=localGameMetaCandidate(eventSearchName(e));
  if(local && local.cover && !String(local.cover).includes('hayatimiz-kapak')) return local.cover;
  if(local && local.banner && !String(local.banner).includes('hayatimiz-kapak')) return local.banner;
  const q=eventSearchName(e);
  const meta=localGameMetaCandidate(q);
  if(meta?.cover && !String(meta.cover).includes('hayatimiz-kapak')) return meta.cover;
  return direct || '/assets/hayatimiz-kapak.png';
}
function eventDisplayTitle(e){
  const game=String(e?.gameTitle||'').trim();
  const ep=String(e?.episodeNumber||'').trim();
  const type=String(e?.type||'Yayın').trim();
  return game ? `${game}${ep?' • '+ep:''}` : (String(e?.title||'').trim() || type || 'Yayın');
}
function todayClockHtml(){
  const t=trTodayInfo();
  return `<article class="todayClockCard" data-today-clock><span>📍 Bugün</span><b>${esc(t.day)}</b><strong>🕒 ${esc(t.time)}</strong></article>`;
}

function calendarHomeBlock(events){
  const rows=(Array.isArray(events)?events:[]).slice(0,6);
  if(!rows.length) return `<article class="homeCalendarCard emptyCalendar"><h3>📅 Yayın Takvimi</h3><p class="muted">Henüz takvim kaydı yok. Yetkili panelinden yayın planı eklenince ana sayfada takvim şeklinde görünecek.</p><a class="miniBtn primary" href="/yayin-takvimi">📅 Takvimi Aç</a>${isYönetim()?'<a class="miniBtn" href="/yonetim/yayin-takvimi">🛠️ Yönet</a>':''}</article>`;
  return `<article class="homeCalendarCard"><div class="sectionHead compact"><div><h3>📅 Ana Sayfa Yayın Takvimi</h3><p>Yaklaşan yayınlar kart düzeninde gösterilir.</p></div><a class="miniBtn" href="/yayin-takvimi">📅 Tüm Takvim</a></div><div class="homeCalendarGrid">${rows.map(e=>{ const day=String(e.date||'Tarih').slice(-2)||'--'; const month=String(e.date||'').slice(5,7)||'--'; return `<div class="homeCalendarDay coverDay"><img src="${esc(eventGameCover(e))}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(eventDisplayTitle(e))}"><b>${esc(day)}</b><span>${esc(month)}</span><strong>${esc(eventDisplayTitle(e))}</strong><small>${esc(e.time||'20:00')} • ${esc(e.type||'Plan')}</small></div>`; }).join('')}</div></article>`;
}

function publicCalendarPage(){
  const rows=loadEvents().filter(e=>e && e.date).sort((a,b)=>String(a.date).localeCompare(String(b.date)) || String(a.time||'').localeCompare(String(b.time||'')));
  const liveCount=rows.filter(e=>String(e.type||'').toLowerCase().includes('canlı')).length;
  const videoCount=rows.filter(e=>String(e.type||'').toLowerCase().includes('video')).length;
  const baseDate=rows[0]?.date ? new Date(rows[0].date+'T12:00:00') : new Date();
  const year=baseDate.getFullYear();
  const month=baseDate.getMonth();
  const monthTitle=baseDate.toLocaleDateString('tr-TR',{month:'long',year:'numeric'});
  const daysInMonth=new Date(year,month+1,0).getDate();
  const firstDay=(new Date(year,month,1).getDay()+6)%7;
  const byDay=new Map();
  rows.forEach(e=>{ const d=new Date(String(e.date)+'T12:00:00'); if(d.getFullYear()===year && d.getMonth()===month){ const key=d.getDate(); if(!byDay.has(key)) byDay.set(key,[]); byDay.get(key).push(e); } });
  const cells=[];
  for(let i=0;i<firstDay;i++) cells.push({empty:true});
  for(let d=1;d<=daysInMonth;d++) cells.push({day:d,date:`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,events:byDay.get(d)||[]});
  while(cells.length%7) cells.push({empty:true});
  const week=['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];
  const listHtml=rows.length?`<section class="publicCalendarList panel"><div class="sectionHead compact"><div><h2>📌 Yaklaşan Yayınlar</h2><p>Tüm kayıtlar takvimin altında oyun kapaklı kartlar olarak da görünür.</p></div></div><div class="miniList coverEventList">${rows.map(e=>`<article class="event coverEvent"><img src="${esc(eventGameCover(e))}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(eventDisplayTitle(e))}"><div><span class="pill green">${esc(e.date||'Tarih yok')} • ${esc(e.time||'20:00')}</span><h3>${esc(eventDisplayTitle(e))}</h3><p>${esc(e.type||'Yayın')} ${e.videoUrl?'• Video bağlantısı hazır':''}</p>${e.videoUrl?`<a class="miniBtn primary" href="${esc(e.videoUrl)}" target="_blank" rel="noreferrer">▶️ Video / Yayını Aç</a>`:''}</div></article>`).join('')}</div></section>`:'';
  return layout(`<section class="archiveHero calendarPublicHero"><div><span class="badge green">📅 ${VERSION} • Public Yayın Takvimi</span><h1>📅 Yayın Takvimi</h1><p>Normal kullanıcılar ve ziyaretçiler yayınları artık liste gibi değil, ay bazlı gerçek takvim kutuları içinde takip eder.</p></div><div class="actions"><a class="btn primary" href="/ana-sayfa">🏠 Ana Sayfa</a><a class="btn secondary" href="/oyun-arsivi?sort=az">🎮 Arşiv</a>${isYönetim()?'<a class="btn secondary" href="/yonetim/yayin-takvimi">🛠️ Takvimi Yönet</a>':''}</div></section><section class="archiveStats calendarStats">${todayClockHtml()}<article><b>${rows.length}</b><span>📅 Toplam Plan</span></article><article><b>${liveCount}</b><span>🔴 Canlı Yayın</span></article><article><b>${videoCount}</b><span>▶️ Video</span></article><article><b>${rows.length?monthTitle:'Takvim'}</b><span>🗓️ Ay Görünümü</span></article></section><section class="panel publicMonthCalendar"><div class="sectionHead compact"><div><h2>🗓️ ${esc(monthTitle)}</h2><p>${rows.length?'Yayınlar gün kutularına işlendi.':'Henüz yayın planı yok; yine de takvim görünümü boş ay olarak gösterilir.'}</p></div>${isYönetim()?'<a class="btn primary" href="/yonetim/yayin-takvimi">📅 Yayın Ekle</a>':''}</div><div class="todayCalendarInfo">${todayClockHtml()}</div><div class="publicCalendarWeek">${week.map(w=>`<b>${w}</b>`).join('')}</div><div class="publicMonthGrid">${cells.map(c=>c.empty?'<article class="publicMonthCell mutedCell"></article>':`<article class="publicMonthCell ${c.events.length?'hasEvent':''} ${String(c.date||'')===trTodayInfo().iso?'todayCell':''}"><strong>${c.day}</strong>${c.events.length?c.events.slice(0,3).map(e=>`<div class="publicTinyEvent withCover"><img src="${esc(eventGameCover(e))}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(eventDisplayTitle(e))}"><span>${esc(e.time||'20:00')}</span><b>${esc(eventDisplayTitle(e))}</b><small>${esc(e.type||'Plan')}</small></div>`).join(''):'<em>Plan yok</em>'}${c.events.length>3?`<i>+${c.events.length-3} kayıt</i>`:''}</article>`).join('')}</div></section>${listHtml}`);
}
function home(){
  const games=loadGames(), notes=loadNotes(), events=loadEvents();
  const model=buildArchiveModel(games);
  const series=new Set(games.map(g=>g.seriesName).filter(Boolean));
  const genres=new Set(games.map(g=>g.genre).filter(Boolean));
  const episodeTotal=games.reduce((sum,g)=>sum+Number(g.episodeCount||loadEpisodes(g.id).length||0),0);
  const watchedTotal=games.reduce((sum,g)=>sum+Number(g.watchedEpisodeCount||0),0);
  const completed=games.filter(g=>String(g.status||'').toLocaleLowerCase('tr').includes('tamam')).length;
  const active=games.filter(g=>String(g.status||'').toLocaleLowerCase('tr').includes('devam')).length;
  const planned=games.filter(g=>/yak|plan/i.test(String(g.status||''))).length;
  const featured=games.find(g=>g.isFeatured) || games[0] || null;
  const featuredEpisodes=featured ? loadEpisodes(featured.id) : [];
  const featuredTotal=featured ? (featuredEpisodes.length || Number(featured.episodeCount||0)) : 0;
  const featuredWatched=featured ? Number(featured.watchedEpisodeCount||0) : 0;
  const featuredPct=featured ? (featuredTotal?Math.round(Math.min(100,(featuredWatched/featuredTotal)*100)):progressPercent(featured)) : 0;
  const featuredHtml = featured ? `<aside class="homeV214Feature"><div class="featurePoster"><img src="${esc(featured.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(featured.title)}"><span class="pill ${statusClass(featured.status)}">${esc(featured.status||'Arşiv')}</span></div><h2>${esc(featured.title)}</h2><p>${esc(shortStoryForGame(featured))}</p><div class="progressMini"><i><span style="width:${featuredPct}%"></span></i><small>${featuredWatched}/${featuredTotal||0} bölüm • %${featuredPct} takip</small></div><div class="cardActions"><a class="miniBtn primary" href="/izle?id=${encodeURIComponent(featured.id)}">▶️ İzle</a><a class="miniBtn" href="/oyun-detay?id=${encodeURIComponent(featured.id)}">📖 Detay</a></div></aside>` : `<aside class="homeV214Feature emptyFeature"><div class="emptyGameIllustration">🎮</div><span class="pill amber">Arşiv boş</span><h2>Henüz oyun eklenmedi</h2><p>Oyun ekli değilken ana sayfa hata ekranına düşmez ve Alan Wake gibi örnek oyun göstermez. İlk oyunu eklediğinde bu vitrin otomatik olarak gerçek arşiv kartına dönüşür.</p><div class="cardActions">${isYönetim()?'<a class="miniBtn primary" href="/yonetim/oyun-ekle">➕ İlk Oyunu Ekle</a>':''}<a class="miniBtn" href="/oyun-arsivi?sort=az">🎮 Arşivi Aç</a></div></aside>`;
  const latestGames=games.slice(0,6);
  const continued=games.filter(g=>String(g.status||'').toLocaleLowerCase('tr').includes('devam')).slice(0,4);
  const latestNote=notes[0] || DEFAULT_NOTES[0];
  const topSeries=Array.from(model.series.entries()).sort((a,b)=>b[1].length-a[1].length || a[0].localeCompare(b[0],'tr')).slice(0,4);
  const controlScore=Math.min(100, Math.max(78, 78 + Math.min(12,games.length) + Math.min(10,notes.length)));
  return layout(`<section class="homeV214" id="top"><section class="homeV214Hero"><div class="homeV214Glow"></div><div class="homeV214Copy"><span class="badge green">🛠️ ${VERSION} FIX • Ana sayfa boş arşiv tasarımı</span><h1>Hayatımız Oyun arşivi daha profesyonel, daha anlaşılır ve izlemeye hazır.</h1><p>Oyun ekli değilken bile ana sayfa profesyonel boş arşiv tasarımıyla açılır. Demo oyun gösterilmez, güvenli hata ekranına düşmez.</p><form class="homeV214Search" data-search-form><span>🔎</span><input name="q" placeholder="Oyun, seri, tür veya etiket ara..."><button class="btn primary" type="submit">Arşivde Ara</button></form><div class="homeV214Actions"><a class="btn primary" href="/oyun-arsivi?sort=az">🎮 Oyun Arşivi</a><a class="btn secondary" href="/seriler?sort=az">🎬 Seriler</a><a class="btn secondary" href="/site-rehberi">📘 Site Rehberi</a><a class="btn secondary" href="/yayin-takvimi">📅 Yayın Takvimi</a></div></div>${featuredHtml}</section><section class="homeV214Stats"><article><b>${games.length}</b><span>🎮 Oyun</span><small>Kalıcı arşiv</small></article><article><b>${series.size}</b><span>🎬 Seri</span><small>Doğru seri adı</small></article><article><b>${episodeTotal}</b><span>▶️ Bölüm</span><small>${watchedTotal} izlendi</small></article><article><b>%${controlScore}</b><span>📡 Site Sağlığı</span><small>Güvenli mod</small></article><article><b>${notes.length}</b><span>📝 Not</span><small>Güncelleme merkezi</small></article></section><section class="homeV214Quick">${oldHomeAction('/oyun-arsivi?sort=az','🔤','A-Z Oyunlar','A Harfinde Başlayan Oyunlar dahil')}${oldHomeAction('/seriler?sort=az','🎬','Seriler','Seri içi oyun sırası')}${oldHomeAction('/koleksiyonlar','🗂️','Koleksiyonlar','Seri ve tür grupları')}${oldHomeAction('/status','📡','Site Durumu','Bakım ve veri sağlığı')}${oldHomeAction('/yayin-takvimi','📅','Yayın Takvimi','Public yayın planı')}${isYönetim()?oldHomeAction('/yonetim','🛡️','Yönetim Paneli','Admin araçları'):oldHomeAction('/giris-yap','🔐','Giriş Yap','Hesabına giriş yap')}</section>${calendarHomeBlock(events)}<section class="homeV214Grid"><div class="homeV214Main"><div class="sectionHead"><div><h2>✨ Öne Çıkan Oyunlar</h2><p>Gerçek oyun eklendiğinde kartlar burada görünür. Boş arşivde demo/örnek kart basılmaz.</p></div><a class="btn secondary" href="/oyun-arsivi?sort=az">Tümünü Gör</a></div><div class="homeV214Cards">${latestGames.length?latestGames.map(oldHomeTile).join(''):'<div class="empty">🎮 Henüz oyun yok. İlk oyun eklendiğinde bu alan otomatik dolacak.</div>'}</div><div class="sectionHead"><div><h2>🎬 Devam Eden Seriler</h2><p>Seriler doğru adla çekilir ve tüm seri izleme bağlantısı korunur.</p></div><a class="btn secondary" href="/seriler?sort=az">Serileri Aç</a></div><div class="homeV214Continue">${continued.length?continued.map(oldContinueCard).join(''):'<div class="empty">🎬 Devam eden seri bulunmadı. Seri eklenince burada görünecek.</div>'}</div></div><aside class="homeV214Rail"><article class="homeV214Panel"><h3>📊 Arşiv Özeti</h3>${statusBar('Devam Eden',active,games.length,'green')}${statusBar('Tamamlanan',completed,games.length,'green')}${statusBar('Plan/Yakında',planned,games.length,'amber')}<p class="muted">${genres.size} kategori • ${model.collections.size} koleksiyon</p></article><article class="homeV214Panel"><h3>📝 Son Güncelleme</h3><span class="pill green">${esc(latestNote.version||VERSION)}</span><h4>${esc(latestNote.title||'Güncelleme')}</h4><p class="muted">${esc(latestNote.summary||'')}</p></article><article class="homeV214Panel"><h3>🎬 Popüler Seriler</h3>${topSeries.length?topSeries.map(([name,rows])=>`<a class="homeSeriesLine" href="/seriler?sort=az#seri-harf-${encodeURIComponent(alphaKey(name))}"><b>${esc(name)}</b><span>${rows.length} oyun</span></a>`).join(''):'<p class="muted">Henüz seri yok.</p>'}</article></aside></section></section>`);
}

function archive(){
  const params=queryParams();
  const filters={q:params.get('q')||'',status:params.get('status')||'',genre:params.get('genre')||'',series:params.get('series')||'',tag:params.get('tag')||'',sort:params.get('sort')||'az'};
  const games=sortGamesForView(loadGames(), filters.sort || 'az');
  const model=buildArchiveModel(games);
  const filtered=sortGamesForView(filterGames(games, filters), filters.sort || 'az');
  const filteredModel=buildArchiveModel(filtered);
  const statuses=['Tümü',...uniqueValues(games,g=>statusBucket(g.status))];
  const genres=['Tümü',...uniqueValues(games,g=>g.genre)];
  const series=['Tümü',...uniqueValues(games,g=>g.seriesName || 'Serisiz')];
  const tags=['Tümü',...uniqueValues(games,g=>tagList(g))];
  const activeFilterCount=Object.entries(filters).filter(([k,v])=>v && v!=='Tümü' && !(k==='sort' && v==='az')).length;
  return layout(`<section class="archiveHero v209Hero" id="top"><div><span class="badge green">🎮 ${VERSION} • Premium Arşiv Merkezi</span><h1>🎮 Oyun Arşivi</h1><p>🔤 Arama, filtre, A-Z ve 0-9 grupları güçlendirildi. Kapaklar artık dev banner gibi açılmaz; her oyun kartı daha kompakt ve okunabilir görünür.</p></div><div class="actions">${isYönetim()?'<a class="btn primary" href="/yonetim/oyun-ekle">➕ Oyun Ekle</a>':''}<a class="btn secondary" href="/seriler?sort=az">🎬 Seriler</a><a class="btn secondary" href="/koleksiyonlar">🗂️ Koleksiyonlar</a></div></section><section class="archiveStats"><article><b>${games.length}</b><span>🎮 Toplam Oyun</span></article><article><b>${filtered.length}</b><span>🔎 Filtre Sonucu</span></article><article><b>${filteredModel.collections.size}</b><span>🗂️ Koleksiyon</span></article><article><b>${filteredModel.episodeTotal}</b><span>▶️ Bölüm</span></article></section><form class="filterPanel" data-search-form><label>🔎 Arama<input class="input" name="q" placeholder="Oyun, tür, seri, etiket ara" value="${esc(filters.q)}"></label><label>📌 Durum<select name="status">${statuses.map(s=>`<option ${selectedOption(filters.status,s)}>${esc(s)}</option>`).join('')}</select></label><label>🎭 Tür<select name="genre">${genres.map(s=>`<option ${selectedOption(filters.genre,s)}>${esc(s)}</option>`).join('')}</select></label><label>🎬 Seri<select name="series">${series.map(s=>`<option ${selectedOption(filters.series,s)}>${esc(s)}</option>`).join('')}</select></label><label>🏷️ Etiket<select name="tag">${tags.map(s=>`<option ${selectedOption(filters.tag,s)}>${esc(s)}</option>`).join('')}</select></label><label>🔤 Sıralama<select name="sort">${sortSelectOptions(filters.sort)}</select></label><div class="filterActions"><button class="btn primary" type="submit">🔎 Filtrele</button><a class="btn secondary" href="/oyun-arsivi?sort=az">🧹 Temizle</a></div></form>${activeFilterCount?`<p class="muted"><b>${activeFilterCount}</b> aktif filtre/sıralama var.</p>`:''}${alphabetMiniIndex(filtered)}${filtered.length?alphabetGroupedCards(filtered):'<div class="empty">⚠️ Bu filtreyle oyun bulunamadı.</div>'}`);
}
function collectionsPage(){
  const model=buildArchiveModel(loadGames());
  const byCollection=Array.from(model.collections.entries()).sort((a,b)=>b[1].length-a[1].length || a[0].localeCompare(b[0],'tr'));
  const byGenre=new Map();
  for(const g of model.games){ const key=g.genre || 'Kategori Yok'; if(!byGenre.has(key)) byGenre.set(key, []); byGenre.get(key).push(g); }
  return layout(`<section class="archiveHero v209Hero"><div><span class="badge green">${VERSION} • Koleksiyon Merkezi</span><h1>Koleksiyonlar</h1><p>Koleksiyonlar artık boş görünmez; seri, tür ve durum sayaçları aynı oyun listesinden beslenir. Oyun silme/ekleme sonrası sayılar otomatik yenilenir.</p></div>${isYönetim()?'<a class="btn primary" href="/yonetim/mevcut-oyunlar">Sıralamayı Yönet</a>':'<a class="btn secondary" href="/oyun-arsivi">Arşive Dön</a>'}</section><section class="archiveStats"><article><b>${model.collections.size}</b><span>Koleksiyon</span></article><article><b>${model.series.size}</b><span>Seri</span></article><article><b>${model.games.length}</b><span>Oyun</span></article><article><b>${model.episodeTotal}</b><span>Bölüm</span></article></section><section class="statusDashboard">${Object.entries(model.statuses).map(([label,count])=>`<a class="statusBigChip" href="/oyun-arsivi?status=${encodeURIComponent(label)}"><span class="pill ${statusClass(label)}">${esc(label)}</span><b>${count}</b><small>Durum sayacı</small></a>`).join('')}</section><div class="sectionHead"><div><h2>Seri / Koleksiyon Grupları</h2><p>${byCollection.length} grup listeleniyor.</p></div></div>${byCollection.length?`<section class="collectionGrid">${byCollection.map(([name,rows])=>collectionCard(name, rows)).join('')}</section>`:'<div class="empty">Koleksiyon oluşturmak için önce oyun ekle.</div>'}<div class="sectionHead"><div><h2>Tür Koleksiyonları</h2><p>Kategori bazlı hızlı koleksiyon özetleri.</p></div></div>${byGenre.size?`<section class="genreCollectionGrid">${Array.from(byGenre.entries()).map(([name,rows])=>`<a class="genreBubble" href="/oyun-arsivi?genre=${encodeURIComponent(name)}"><b>${esc(name)}</b><span>${rows.length} oyun</span><small>${rows.reduce((sum,g)=>sum+Number(g.episodeCount||0),0)} bölüm</small></a>`).join('')}</section>`:''}`);
}
function seriesPage(){
  const model=buildArchiveModel(loadGames());
  const params=queryParams();
  const sort=params.get('sort')||'az';
  const all=Array.from(model.series.entries()).map(([name,rows])=>[cleanSeriesName(name, rows[0]?.title)||name, orderedSeriesRows(sortGamesForView(rows, sort==='az'||sort==='za'||sort==='numeric'?sort:'series'))]).filter(([name])=>name && name!=='Serisiz Oyunlar').sort((a,b)=>{
    if(sort==='za') return String(b[0]).localeCompare(String(a[0]),'tr');
    if(sort==='numeric') return (alphaKey(a[0])==='0-9'?0:1)-(alphaKey(b[0])==='0-9'?0:1) || String(a[0]).localeCompare(String(b[0]),'tr');
    return String(a[0]).localeCompare(String(b[0]),'tr');
  });
  const completed=all.filter(([,rows])=>seriesBucket(rows)==='Tamamlanan Seriler');
  const active=all.filter(([,rows])=>seriesBucket(rows)==='Devam Eden Seriler');
  const upcoming=all.filter(([,rows])=>['Planlanan / Yakında','Ara Verilen Seriler'].includes(seriesBucket(rows)));
  const other=all.filter(x=>![...completed,...active,...upcoming].includes(x));
  const letterGroups=new Map();
  for(const item of all){ const k=alphaKey(item[0]); if(!letterGroups.has(k)) letterGroups.set(k,[]); letterGroups.get(k).push(item); }
  const order=[...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(x=>x==='0'?'0-9':x);
  const orderedLetters=Array.from(letterGroups.entries()).sort((a,b)=>{ const ia=order.indexOf(a[0]); const ib=order.indexOf(b[0]); return (ia<0?999:ia)-(ib<0?999:ib) || a[0].localeCompare(b[0],'tr'); });
  const block=(title,desc,items,cls)=>items.length?`<section class="seriesBucket premiumSeriesBucket ${cls}"><div class="sectionHead"><div><h2>${title}</h2><p>${desc}</p></div><a class="btn secondary" href="#top">⬆️ Üste Dön</a></div><div class="seriesGrid proSeriesGrid premiumSeriesGrid">${items.map(([name,rows])=>seriesPremiumCard(name,rows)).join('')}</div></section>`:'';
  return layout(`<section class="archiveHero v209Hero seriesHeroPro premiumSeriesHero" id="top"><div><span class="badge green">🎬 ${VERSION} • Premium Seri Merkezi</span><h1>🎬 Seriler</h1><p>Tamamlanan, devam eden ve yakında gelecek seriler artık ayrı ayrı görünür. Her seri kompakt kart, kapak/banner, ilerleme yüzdesi ve sıradaki bölüm bilgisiyle listelenir.</p></div><div class="actions"><a class="btn secondary" href="/koleksiyonlar">🗂️ Koleksiyon Merkezi</a>${isYönetim()?'<a class="btn primary" href="/yonetim/seriler">🛠️ Serileri Yönet</a>':''}</div></section><section class="archiveStats premiumSeriesStats"><article><b>${all.length}</b><span>🎬 Toplam Seri</span></article><article><b>${active.length}</b><span>🟢 Devam Eden</span></article><article><b>${completed.length}</b><span>✅ Tamamlanan</span></article><article><b>${upcoming.length}</b><span>⏳ Yakında</span></article></section><form class="filterPanel seriesSortPanel" data-series-sort-form><label>🔤 Seri / oyun sıralaması<select name="sort">${sortSelectOptions(sort)}</select></label><div class="filterActions"><button class="btn primary" type="submit">🔤 Sırala</button><a class="btn secondary" href="/seriler?sort=az">🧹 A-Z Varsayılan</a></div></form>${seriesLetterIndex(all)}${block('🟢 Devam Eden Seriler','Aktif yayınlanan seriler ana sayfada ve seri merkezinde daha belirgin gösterilir.',active,'active')}${block('✅ Tamamlanan Seriler','Bitmiş seriler arşiv rozeti ve toplam bölüm bilgisiyle ayrı listelenir.',completed,'done')}${block('⏳ Yakında Gelecek / Planlanan Seriler','Planlanan ve ara verilen seriler sıradaki yayın hazırlığı olarak ayrılır.',upcoming,'upcoming')}${block('🎬 Diğer Seriler','Durumu netleşmemiş seriler kompakt kartlarla listelenir.',other,'other')}${orderedLetters.length?`<section class="seriesBucket compactLetterBucket"><div class="sectionHead"><div><h2>🔤 Harfe Göre Seri Dizini</h2><p>Serileri A-Z hızlı bulmak için kompakt dizin.</p></div></div>${orderedLetters.map(([letter,items])=>`<details id="seri-harf-${encodeURIComponent(letter)}"><summary>🎬 ${esc(letter)} • ${items.length} seri</summary><div class="seriesCompactLinks">${items.map(([name])=>`<a href="/oyun-arsivi?series=${encodeURIComponent(name)}">${esc(name)}</a>`).join('')}</div></details>`).join('')}</section>`:'<div class="empty">⚠️ Seri oluşturmak için önce oyun ekle.</div>'}`);
}

function gameDetailPage(){
  const params=queryParams();
  const id=params.get('id') || '';
  const games=buildArchiveModel(loadGames()).games;
  const game=games.find(g=>String(g.id)===String(id)) || games.find(g=>slugify(g.title)===String(id)) || games[0];
  if(!game) return layout(`<section class="panel authPanel"><span class="badge amber">📖 Oyun Detayı</span><h1>Oyun bulunamadı</h1><p class="muted">Arşivde kayıtlı oyun yok. Yetkiliysen yönetim panelinden oyun ekleyebilirsin.</p><div class="actions"><a class="btn primary" href="/oyun-arsivi">🎮 Arşive Dön</a>${isYönetim()?'<a class="btn secondary" href="/yonetim/oyun-ekle">➕ Oyun Ekle</a>':''}</div></section>`);
  const episodes=loadEpisodes(game.id);
  const total=episodes.length || Number(game.episodeCount||0);
  const watched=Number(game.watchedEpisodeCount||0);
  const pct=total?Math.max(0, Math.min(100, Math.round((watched/total)*100))):progressPercent(game);
  const nextEp=episodes.find(ep=>Number(ep.number)>watched) || episodes[0] || null;
  const tags=tagList(game);
  const seriesRows=game.seriesName ? getSeriesRows(game.seriesName) : [];
  const story=publicStoryForGame(game);
  const banner=game.banner || game.cover || '/assets/hayatimiz-kapak.png';
  const youtube=game.videoUrl || game.youtubePlaylistUrl || (nextEp && nextEp.videoUrl) || '';
  return layout(`<section class="gameDetailHero" style="--detail-bg:url('${esc(banner)}')"><div class="gameDetailShade"></div><div class="gameDetailPoster"><img src="${esc(game.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(game.title)}"><span class="pill ${statusClass(game.status)}">${esc(game.status||'Arşiv')}</span></div><div class="gameDetailCopy"><span class="badge green">📖 ${VERSION} • Oyun Detayı</span><h1>${esc(game.title)}</h1><p>${esc(story)}</p><div class="gameDetailMeta"><span>🎭 ${esc(game.genre||'Tür yok')}</span><span>🎬 ${esc(game.seriesName||'Serisiz')}</span><span>📅 ${esc(game.releaseDate||'Tarih yok')}</span><span>⭐ ${esc(game.score||0)}</span></div><div class="actions"><a class="btn primary" href="/izle?id=${encodeURIComponent(game.id)}${nextEp?`&ep=${encodeURIComponent(nextEp.number)}`:''}">▶️ Siteden İzle</a>${game.seriesName?`<a class="btn secondary" href="${seriesWatchHref(game.seriesName)}">🎬 Tüm Seriyi İzle</a>`:''}${youtube?`<a class="btn secondary" href="${esc(youtube)}" target="_blank" rel="noreferrer">YouTube Aç</a>`:''}${isYönetim()?`<a class="btn secondary" href="/yonetim/oyun-duzenle?id=${encodeURIComponent(game.id)}">Oyunu Düzenle</a>`:''}</div></div></section><section class="detailStats"><article><b>${watched}/${total||0}</b><span>▶️ Bölüm Takibi</span><small>%${pct} ilerleme</small></article><article><b>${seriesRows.length || 1}</b><span>🎬 Seri Oyunu</span><small>${esc(game.seriesName||'Tek oyun')}</small></article><article><b>${tags.length}</b><span>🏷️ Etiket</span><small>${tags.slice(0,2).map(esc).join(', ') || 'Etiket yok'}</small></article><article><b>${nextEp?`${nextEp.number}.`: '—'}</b><span>⏭️ Sıradaki Bölüm</span><small>${esc(nextEp?.title||'Bölüm bekliyor')}</small></article></section><section class="detailGrid"><article class="panel detailStory"><span class="badge">🎭 Hikaye</span><h2>Profesyonel Hikaye Anlatımı</h2><p>${esc(story)}</p><div class="tags detailTags">${tags.length?tags.map(t=>`<span>${esc(t)}</span>`).join(''):'<span>Etiket eklenmedi</span>'}</div></article><aside class="panel detailWatchBox"><h2>▶️ İzleme Merkezi</h2><p class="muted">Siteden izleme ekranı bu oyun için güvenli oynatıcı, kalite tercihi ve bölüm listesiyle açılır.</p><div class="progressMini"><i><span style="width:${pct}%"></span></i><small>${watched}/${total||0} bölüm • %${pct}</small></div><div class="actions vertical"><a class="btn primary" href="/izle?id=${encodeURIComponent(game.id)}${nextEp?`&ep=${encodeURIComponent(nextEp.number)}`:''}">Sıradaki Bölümü İzle</a>${game.seriesName?`<a class="btn secondary" href="${seriesWatchHref(game.seriesName)}">Tüm Seriyi Aç</a>`:''}</div></aside></section><section class="panel detailEpisodes"><div class="sectionHead compact"><div><h2>📺 Bölüm Listesi</h2><p>${episodes.length?`${episodes.length} bölüm listeleniyor.`:'Bu oyunda henüz bölüm listesi yok.'}</p></div>${isYönetim()?`<a class="btn secondary" href="/yonetim/bolum-takibi">Bölüm Takibini Yönet</a>`:''}</div>${episodes.length?`<div class="detailEpisodeGrid">${episodes.map(ep=>`<a class="detailEpisodeCard ${Number(ep.number)<=watched?'watched':''}" href="/izle?id=${encodeURIComponent(game.id)}&ep=${encodeURIComponent(ep.number)}"><img src="${esc(ep.thumbnail||game.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='${esc(game.cover||'/assets/hayatimiz-kapak.png')}'" alt="${esc(ep.title)}"><span>${esc(ep.number)}. Bölüm</span><b>${esc(ep.title)}</b><small>${Number(ep.number)<=watched?'İzlendi':'İzlenmedi'}</small></a>`).join('')}</div>`:'<div class="empty">Playlist çekilirse bölümler burada profesyonel kartlarla görünecek.</div>'}</section>`);
}
function watchStatusPanel(game, episodes, current){
  const total=episodes.length || Number(game.episodeCount||0);
  const watched=Number(game.watchedEpisodeCount||0);
  const pct=total?Math.round(Math.min(100,(watched/total)*100)):0;
  const next=episodes.find(ep=>Number(ep.number)>watched) || current || null;
  return `<section class="watchStatusPanel"><article><span>📌 Aktif Oyun</span><b>${esc(game.title)}</b><small>${esc(game.seriesName||'Serisiz')}</small></article><article><span>▶️ İlerleme</span><b>${watched}/${total||0}</b><small>%${pct} tamamlandı</small></article><article><span>⏭️ Sıradaki</span><b>${next?`${esc(next.number)}. Bölüm`:'Bekliyor'}</b><small>${esc(next?.title||'Bölüm listesi yok')}</small></article></section>`;
}
function watchPage(){
  const params=queryParams();
  const id=params.get('id') || '';
  const seriesName=String(params.get('series')||'').trim();
  const epNo=Number(params.get('ep')||0);
  const games=buildArchiveModel(loadGames()).games;
  const seriesGames=seriesName ? orderedSeriesRows(games.filter(g=>String(g.seriesName||'Serisiz Oyunlar')===seriesName)) : [];
  const game=(id ? games.find(g=>String(g.id)===String(id)) : null) || seriesGames[0] || games[0];
  if(!game) return layout(`<section class="panel authPanel"><span class="badge amber">İzleme</span><h1>Henüz izlenecek oyun yok</h1><p class="muted">Önce yönetimden oyun ve YouTube bağlantısı ekle.</p><a class="btn primary" href="/yonetim/oyun-ekle">Oyun Ekle</a></section>`);
  const activeSeries=seriesName || game.seriesName || '';
  const activeSeriesRows=activeSeries ? orderedSeriesRows(games.filter(g=>String(g.seriesName||'Serisiz Oyunlar')===activeSeries)) : [game];
  const totals=seriesTotals(activeSeriesRows);
  const episodes=loadEpisodes(game.id);
  const watched=Number(game.watchedEpisodeCount||0);
  const current=episodes.find(e=>Number(e.number)===epNo) || episodes.find(e=>Number(e.number)>watched) || episodes[0] || null;
  const currentIndex=current?episodes.findIndex(e=>String(e.id)===String(current.id)):-1;
  const prev=currentIndex>0?episodes[currentIndex-1]:null;
  const next=currentIndex>=0 && currentIndex<episodes.length-1?episodes[currentIndex+1]:null;
  const embed=videoEmbedSrc(game,current); const settings=watchSettings(); const story=publicStoryForGame(game);
  const seriesTitle=activeSeries ? `${activeSeries} Serisi` : game.title;
  return layout(`<section class="watchHero seriesWatchHero watchHeroV215"><div><span class="badge green">${activeSeries?'🎬 Tüm Seriyi İzle':'▶️ Site İçi İzleme'} • ${VERSION}</span><h1>${esc(seriesTitle)}</h1><p>${esc(activeSeries?`${activeSeries} içindeki oyunları sırayla izleyebilir, bölüm ilerlemesini takip edebilir ve listedeki oyunlar arasında geçiş yapabilirsin.`:story)}</p><div class="actions"><a class="btn secondary" href="/oyun-detay?id=${encodeURIComponent(game.id)}">📖 Oyun Detayı</a><a class="btn secondary" href="/seriler">🎬 Serilere Dön</a><a class="btn secondary" href="/oyun-arsivi">🎮 Arşive Dön</a>${isYönetim()?`<a class="btn secondary" href="/yonetim/oyun-duzenle?id=${encodeURIComponent(game.id)}">Oyunu Düzenle</a>`:''}</div></div><aside><b>${esc(settings.quality)} kalite tercihi</b><span>${activeSeriesRows.length} oyun • ${totals.episodes} bölüm • ${totals.watched} izlendi</span><small>Aktif oyun: ${esc(game.title)}. Kalite tercihi siteye kaydedilir; gerçek kalite YouTube oynatıcı dişlisinden seçilir.</small></aside></section>${watchStatusPanel(game, episodes, current)}${activeSeriesRows.length>1?`<section class="seriesWatchStrip">${activeSeriesRows.map((g,i)=>`<a class="seriesWatchGame ${String(g.id)===String(game.id)?'active':''}" href="/izle?series=${encodeURIComponent(activeSeries)}&id=${encodeURIComponent(g.id)}"><b>${i+1}</b><span>${esc(g.title)}</span><small>${Number(g.watchedEpisodeCount||0)}/${loadEpisodes(g.id).length || Number(g.episodeCount||0)} bölüm</small></a>`).join('')}</section>`:''}<section class="watchLayout watchLayoutV215"><article class="watchPlayer proWatchPlayer">${embed?`<iframe src="${esc(embed)}" title="${esc(game.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`:`<div class="empty playerEmpty"><b>Video bağlantısı yok</b><p>Bu oyun için YouTube video veya playlist bağlantısı bulunamadı. Yönetimden YouTube video/playlist URL eklenirse oynatıcı otomatik aktif olur.</p>${isYönetim()?`<a class="btn primary" href="/yonetim/oyun-duzenle?id=${encodeURIComponent(game.id)}">Bağlantı Ekle</a>`:''}</div>`}<div class="watchControls"><div class="qualityPanel"><b>Kalite Ayarları</b><div class="qualityButtons">${['Otomatik','1080p','720p','480p','360p'].map(q=>`<button class="miniBtn ${settings.quality===q?'primary':''}" data-quality="${q}">${q}</button>`).join('')}</div></div><div class="episodeNavButtons">${prev?`<a class="miniBtn" href="/izle?id=${encodeURIComponent(game.id)}&ep=${encodeURIComponent(prev.number)}">← Önceki</a>`:''}${current?`<button class="miniBtn primary" data-watch-mark="${esc(game.id)}" data-ep="${esc(current.number)}">Bu Bölüme Kadar İzledim</button>`:''}${next?`<a class="miniBtn" href="/izle?id=${encodeURIComponent(game.id)}&ep=${encodeURIComponent(next.number)}">Sonraki →</a>`:''}</div></div></article><aside class="episodeSidebar episodeSidebarV215"><h2>${esc(game.title)} Bölümleri</h2>${current?`<div class="currentEpisodeBox"><span class="pill green">Şu an</span><b>${esc(current.number)}. Bölüm</b><small>${esc(current.title)}</small></div>`:''}${episodes.length?episodes.map(ep=>`<a class="watchEpisode ${current && String(current.id)===String(ep.id)?'active':''} ${Number(ep.number)<=watched?'watched':''}" href="/izle?${activeSeries?`series=${encodeURIComponent(activeSeries)}&`:''}id=${encodeURIComponent(game.id)}&ep=${encodeURIComponent(ep.number)}"><img src="${esc(ep.thumbnail||game.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='${esc(game.cover||'/assets/hayatimiz-kapak.png')}'" alt="${esc(ep.title)}"><span><b>${esc(ep.number)}. Bölüm</b><small>${esc(ep.title)}</small></span></a>`).join(''):`<div class="empty compactEmpty">Bölüm listesi yok. Playlist çekilirse burada görünür.</div>`}</aside></section><section class="panel storyPanel detailStory"><span class="badge">🎭 Hikaye</span><h2>${esc(game.title)} Hikaye Anlatımı</h2><p>${esc(story)}</p><div class="actions"><a class="btn secondary" href="/oyun-detay?id=${encodeURIComponent(game.id)}">Detay Sayfasını Aç</a>${game.seriesName?`<a class="btn secondary" href="${seriesWatchHref(game.seriesName)}">Tüm Seriyi İzle</a>`:''}</div></section>`);
}

function alphabetPage(){
  return layout(`<section class="archiveHero alphaHero"><div><span class="badge green">🔤 Alfabetik sıralama taşındı</span><h1>🔤 Artık ayrı bölüm yok</h1><p>🎮 A-Z, Z-A ve 0-9 önce sıralama artık Oyun Arşivi ve Seriler sayfalarının içinde çalışıyor. Menüden ayrı “Alfabetik Sıralama” bölümü kaldırıldı.</p></div><div class="actions"><a class="btn primary" href="/oyun-arsivi?sort=az">🎮 Oyunlarda A-Z Aç</a><a class="btn secondary" href="/seriler?sort=az">🎬 Serilerde A-Z Aç</a></div></section>`);
}
function siteGuidePage(){
  const games=loadGames(); const notes=loadNotes(); const events=loadEvents(); const model=buildArchiveModel(games);
  return layout(`<section class="guideHero"><div><span class="badge green">📘 Site Rehberi • v4.0.5</span><h1>📘 Hayatımız Oyun artık ne hale geldi?</h1><p>🎮 Site artık oyun arşivi, seri takibi, site içi izleme, kalite tercihi, Supabase kalıcı veri, bakım modu, yayın takvimi ve güncelleme notlarını tek profesyonel panelde toplayan bir YouTube oyun arşivi merkezidir.</p></div><div class="guideScore"><b>✅ ${model.games.length}</b><span>🎮 oyun kaydı</span><b>🎬 ${model.series.size}</b><span>seri grubu</span><b>▶️ ${model.episodeTotal}</b><span>bölüm kapasitesi</span></div></section><section class="guideGrid"><article class="guideCard"><h2>🏠 Ana Sayfa</h2><p>✨ Büyük vitrin, hızlı arama, öne çıkan oyunlar, devam eden seriler, son güncelleme ve hızlı işlem kartları burada görünür.</p><a class="miniBtn primary" href="/ana-sayfa">🏠 Aç</a></article><article class="guideCard"><h2>🎮 Oyun Arşivi</h2><p>🔎 Arama, durum, tür, seri, etiket ve 🔤 A-Z / Z-A / 0-9 önce sıralama burada çalışır. Alfabetik sıralama artık ayrı menü değildir.</p><a class="miniBtn primary" href="/oyun-arsivi?sort=az">🎮 Aç</a></article><article class="guideCard"><h2>🎬 Seriler</h2><p>▶️ Tüm Seriyi İzle, seri içindeki oyunları sıralı görme ve seri durumlarına göre gruplama burada bulunur.</p><a class="miniBtn primary" href="/seriler?sort=az">🎬 Aç</a></article><article class="guideCard"><h2>▶️ Siteden İzle</h2><p>📺 YouTube video veya oynatma listesi site içinde açılır. Kalite tercihi Otomatik / 1080p / 720p / 480p / 360p olarak saklanır.</p><a class="miniBtn primary" href="/izle">▶️ Aç</a></article><article class="guideCard"><h2>🗂️ Koleksiyonlar</h2><p>📦 Seri, tür ve koleksiyon grupları aynı oyun verisinden hesaplanır. Sayaçlar oyun silme/ekleme sonrası otomatik güncellenir.</p><a class="miniBtn primary" href="/koleksiyonlar">🗂️ Aç</a></article><article class="guideCard"><h2>🛠️ Bakım ve Güvenlik</h2><p>🧰 Bakım modu açıldığında ziyaretçi bakım ekranı görür; yetkili giriş yapan kullanıcı siteyi ve yönetim panelini görebilir.</p>${isYönetim()?'<a class="miniBtn primary" href="/yonetim/bakim-modu">🛠️ Aç</a>':'<a class="miniBtn" href="/giris-yap">🔐 Yetkili Girişi</a>'}</article></section><section class="guideTimeline"><div class="sectionHead"><div><h2>📝 Son durum özeti</h2><p>📌 Güncelleme notları ve status her FIX ile güncel tutulur.</p></div></div>${notes.slice(0,5).map(n=>`<article class="guideNote"><span class="pill green">${esc(n.version||VERSION)} • ${esc(n.status||'Tamamlandı')}</span><h3>🧩 ${esc(n.title)}</h3><p>${esc(n.summary||n.description||'')}</p></article>`).join('')}<article class="guideNote"><span class="pill amber">📅 Takvim</span><h3>📅 ${events.length} yayın kaydı</h3><p>Yayın takvimi Supabase bağlıysa kalıcı kaydedilir; bağlantı yoksa yerel güvenli mod devrededir.</p></article></section>`);
}
function authorityGuidePage(){
  const roles=[['👑 Kurucu','Sitenin sahibi. Tüm yönetim alanlarını, kullanıcı yetkilerini, bakım modunu, oyunları, serileri, takvimi ve güncelleme notlarını yönetir.'],['🛡️ Moderatör','Yönetim paneline girebilir. Oyun/seri takibi, takvim ve temel düzenleme işlerinde yardımcı olur. Kurucu ayarlarını bozmayacak şekilde destek rolüdür.'],['✍️ İçerik Editörü','Oyun ekleme, hikaye metni, bölüm/playlist ve içerik düzenleme işlerinde kullanılır. Yayın arşivini içerik tarafında büyütür.'],['👤 Üye','Siteyi izleyen normal kullanıcıdır. Oyunları, serileri, arşivi ve siteden izleme alanlarını görür; yönetim alanlarına giremez.'],['🚫 Banlı','Güvenlik veya kullanım sebebiyle kısıtlanan kullanıcıdır. Yönetim paneline, oyun/seri ekleme-düzenleme, bölüm/playlist çekme, yayın takvimi, bakım modu, notlar ve yetki işlemlerine erişemez. Public taraf gerekiyorsa sadece izleyici gibi görüntüleme seviyesinde kalır.']];
  return layout(`<section class="guideHero authorityHero"><div><span class="badge green">👑 Yetkili Rehberi • Türkçe Roller</span><h1>👑 Yetkiler ne anlama geliyor?</h1><p>🛡️ Sitedeki roller tamamen Türkçe gösterilir. Kurucu, Moderatör, İçerik Editörü, Üye ve Banlı rolleri farklı erişim seviyeleri için kullanılır.</p></div><div class="actions"><a class="btn primary" href="/site-rehberi">📘 Site Rehberi</a>${isYönetim()?'<a class="btn secondary" href="/yonetim/kullanicilar">👥 Kullanıcıları Yönet</a>':'<a class="btn secondary" href="/giris-yap">🔐 Giriş Yap</a>'}</div></section><section class="roleGuideGrid">${roles.map(([title,text])=>`<article class="roleGuideCard"><h2>${title}</h2><p>${text}</p></article>`).join('')}</section><section class="panel guideRules"><h2>✅ Yetki kullanım kuralı</h2><p>👑 Kurucu ana karar rolüdür. 🛡️ Moderatör ve ✍️ İçerik Editörü içerik düzenlemeye yardımcı olur. 👤 Üyeler public siteyi kullanır. 🚫 Banlı rolü erişimi sınırlamak için saklanır.</p><p>🔐 Yönetim linkleri normal ziyaretçiye gösterilmez. 🛠️ Bakım modu açıkken ziyaretçi bakım ekranı görür, yetkili kullanıcı siteye devam eder.</p><p>🧾 Bu FIX ile İngilizce rol adları kullanıcı arayüzünde Türkçe/emojili hale getirildi.</p></section>`);
}
function userPanelStats(rows){
  const list=Array.isArray(rows)?rows:[];
  const stats={total:list.length, kurucu:0, moderator:0, editor:0, user:0, banned:0, active:0};
  for(const u of list){
    const role=roleValue(u.role,u.email);
    stats[role]=(stats[role]||0)+1;
    if(u.is_active !== false && role !== 'banned') stats.active++;
  }
  return stats;
}
function userFilterParams(){
  const p=queryParams();
  return {q:String(p.get('user_q')||'').trim(), role:String(p.get('user_role')||'Tümü').trim(), source:String(p.get('user_source')||'Tümü').trim()};
}
function filterUsers(rows, filters=userFilterParams()){
  const q=String(filters.q||'').toLocaleLowerCase('tr');
  return (Array.isArray(rows)?rows:[]).filter(u=>{
    const role=roleValue(u.role,u.email);
    const src=String(u.source||'Yerel');
    const text=[u.email,u.displayName,u.full_name,roleLabel(role,u.email),src].join(' ').toLocaleLowerCase('tr');
    return (!q || text.includes(q)) && (!filters.role || filters.role==='Tümü' || role===filters.role) && (!filters.source || filters.source==='Tümü' || src===filters.source);
  });
}
function userStatsCards(rows){
  const st=userPanelStats(rows);
  return `<section class="userRoleStats v218RoleStats"><article><b>${st.total}</b><span>👥 Toplam Kullanıcı</span></article><article><b>${st.kurucu||0}</b><span>👑 Kurucu</span></article><article><b>${st.moderator||0}</b><span>🛡️ Moderatör</span></article><article><b>${st.editor||0}</b><span>✍️ İçerik Editörü</span></article><article><b>${st.user||0}</b><span>👤 Üye</span></article><article><b>${st.banned||0}</b><span>🚫 Banlı</span></article></section>`;
}
function roleGuideMini(){
  return `<section class="roleMiniGuide v218RoleGuide"><article><b>👑 Kurucu</b><span>Tüm site, bakım modu, kullanıcı yetkileri ve veriler.</span></article><article><b>🛡️ Moderatör</b><span>Yönetim paneline girer; içerik düzenine yardım eder.</span></article><article><b>✍️ İçerik Editörü</b><span>Oyun, hikaye, bölüm ve arşiv içeriklerini düzenler.</span></article><article><b>👤 Üye</b><span>Public siteyi kullanır, yönetim alanına giremez.</span></article><article><b>🚫 Banlı</b><span>Giriş yapabilir ama yönetim paneline giremez; oyun/seri ekleyemez, yetki değiştiremez, bakım/not/takvim/playlist işlemi yapamaz. Ana sayfa, arşiv, izleme, takvim, profil ve yönetim alanlarına ulaşamaz; banlandınız ekranı ve Discord iletişim bağlantısı görür.</span></article></section>`;
}
function usersPage(){ return adminOnly(()=>{ const all=localUserRows(); const filters=userFilterParams(); const rows=filterUsers(all, filters); return layout(`<section class="archiveHero userHero v218UserHero"><div><span class="badge green">👑 ${VERSION} • Yetki Paneli</span><h1>👥 Kullanıcılar ve Yetkiler</h1><p>Supabase Auth kullanıcılarını, site_users kayıtlarını ve yetki kayıtlarını tek ekranda güvenli yönet. Tek kurucu kilidi aktif: sadece mertdundaroyunda@gmail.com kurucu kalır.</p><div class="actions"><button class="btn secondary" type="button" data-refresh-users>🔄 Supabase’den Çek ve Eksikleri Kaydet</button><a class="btn secondary" href="/yetkili-rehberi">👑 Yetkili Rehberi</a></div></div><aside><b>🔐 Yetki Kilidi</b><span>Kurucu rolü sadece ana kurucu hesabında kalır.</span><small>Supabase Auth + site_users + yetki kayıtları senkron</small></aside></section>${userStatsCards(all)}<section class="panel userAddPanel v218UserAdd"><h2>➕ Kullanıcı Ekle / Yetki Ver</h2><form class="userAddForm" data-user-add-form><label class="field">Ad / Görünen İsim<input class="input" name="displayName" placeholder="Örn: İçerik Editörü"></label><label class="field">E-posta<input class="input" name="email" type="email" required placeholder="ornek@mail.com"></label><label class="field">Yetki<select name="role">${roleOptionsHtml('user','')}</select></label><button class="btn primary" type="submit">👑 Yetkiyi Kaydet</button></form><p class="muted">E-posta aynıysa kayıt güncellenir. Kurucu rolü sadece ana kurucu hesabına verilir; diğer hesaplar Moderatör/Editör/Üye/Banlı olabilir.</p></section><section class="panel userFilterPanel"><h2>🔎 Kullanıcı Ara / Filtrele</h2><form class="userFilterForm" data-user-filter-form><input class="input" name="user_q" value="${esc(filters.q)}" placeholder="E-posta, isim veya rol ara"><select class="input" name="user_role"><option ${selectedOption(filters.role,'Tümü')}>Tümü</option><option value="kurucu" ${selectedOption(filters.role,'kurucu')}>👑 Kurucu</option><option value="moderator" ${selectedOption(filters.role,'moderator')}>🛡️ Moderatör</option><option value="editor" ${selectedOption(filters.role,'editor')}>✍️ İçerik Editörü</option><option value="user" ${selectedOption(filters.role,'user')}>👤 Üye</option><option value="banned" ${selectedOption(filters.role,'banned')}>🚫 Banlı</option></select><button class="btn secondary" type="submit">Filtrele</button><a class="btn secondary" href="/yonetim/kullanicilar">Temizle</a></form></section>${roleGuideMini()}<section class="panel userTablePanel"><div class="sectionHead compact"><div><h2>👥 Kayıtlı Kullanıcılar</h2><p>${rows.length} kullanıcı gösteriliyor. Yeni açılan Supabase Auth hesapları otomatik çekilir. Yetkiyi seçip <b>Yetkiyi Kaydet</b> butonuna bas.</p></div></div><div class="userList userTable v218UserTable" data-user-list data-auto-users="1">${renderUserRows(rows)}</div></section>`); }); }
function renderUserRows(rows){
  const list=Array.isArray(rows)?rows:[]; if(!list.length) return '<div class="empty">Henüz kayıtlı kullanıcı görünmüyor. Supabase’den Çek / Kaydet butonuna basınca Auth hesapları site_users tablosuna işlenir.</div>';
  return list.map(u=>{ const email=String(u.email||''); const role=roleValue(u.role,email); const active=u.is_active!==false && role!=='banned'; const created=u.createdAt || u.created_at || u.updated_at || ''; const rawSrc=String(u.source||'Supabase').replace(/Yerel Tablo|Yerel/g,'Tarayıcı'); const src=rawSrc.includes('Yetki')?'Kalıcı kayıt + yetki':(rawSrc.includes('Supabase')?'Kalıcı kayıt':rawSrc); return `<article class="userRow proUserRow v218UserRow" data-user-id="${esc(u.id||'')}" data-user-email="${esc(email)}" data-user-source="${esc(src)}"><div class="userAvatar">${esc((u.displayName||u.full_name||email||'?').slice(0,1).toLocaleUpperCase('tr'))}</div><div class="userCell"><b>${esc(u.displayName||u.full_name||email)}</b><small>${esc(email)} • ${esc(src)} ${created?'• '+esc(String(created).slice(0,10)):''}</small></div><span class="roleChip roleChipTable role-${esc(role)}">${esc(roleLabel(role,email))}</span><select class="input roleSelect" data-role-select aria-label="Yetki seç">${roleOptionsHtml(role,email)}</select><span class="userState ${active?'ok':'blocked'}">${active?'✅ Aktif':'🚫 Kısıtlı'}</span><div class="userRowActions"><button class="miniBtn primary" data-user-role-save>💾 Supabase’ye Kaydet</button><button class="miniBtn danger" data-user-delete>🗑️ Sil</button></div></article>`; }).join('');
}
async function refreshUsersPanel(){
  const target=document.querySelector('[data-user-list]'); if(!target) return;
  target.innerHTML='<div class="empty">Kullanıcılar yükleniyor...</div>';
  try{
    const data=await apiJson('users-list',{adminToken:sessionToken(),ownerEmail:currentUser()?.email||''});
    const remote=(data.users||[]).map(u=>({id:u.id,email:u.email,displayName:u.full_name||u.displayName||u.email,role:u.role,is_active:u.is_active,source:u.source||'Supabase Kayıt'}));
    const merged=[...remote];
    for(const u of localUserRows()){
      if(u.email && !merged.some(x=>String(x.email).toLowerCase()===String(u.email).toLowerCase())) merged.push(u);
    }
    saveUsers(merged.map(u=>({id:u.id,email:u.email,displayName:u.displayName,role:u.role,is_active:u.is_active,source:u.source})));
    target.innerHTML=renderUserRows(merged);
    toast('Kullanıcı listesi yenilendi.');
  }
  catch(err){ target.innerHTML=renderUserRows(localUserRows()); toast('Supabase kullanıcıları alınamadı, yerel liste gösteriliyor.'); }
}


function loginPage(){ return layout(`<section class="panel authPanel"><span class="badge">Üyelik geri geldi</span><h1>Giriş Yap</h1><p class="muted">Kurucu veya yetkili hesabıyla giriş yapınca yönetim paneli, mevcut oyunlar ve bakım modu görünür.</p><form class="formGrid" data-login-form><label class="field full">E-posta<input class="input" type="email" name="email" required placeholder="${esc(ADMIN_EMAILS[0])}"></label><label class="field full">Şifre<input class="input" type="password" name="password" required placeholder="Yerel şifren"></label><div class="full actions"><button class="btn primary" type="submit">Giriş Yap</button><a class="btn secondary" href="/kayit-ol">Kayıt Ol</a></div></form><p class="muted small">Bu paket yerel üyelik kabuğudur. Supabase üyelik sistemi aktif açılış yapısında korunur.</p></section>`); }
function registerPage(){ return layout(`<section class="panel authPanel"><span class="badge">Kayıt ol geri geldi</span><h1>Kayıt Ol</h1><p class="muted">Kurucu e-postasıyla kayıt olursan yönetim alanları açılır. Normal kullanıcıda yönetim bağlantıları gizli kalır.</p><form class="formGrid" data-register-form><label class="field full">Ad / Kanal Adı<input class="input" name="displayName" required placeholder="Hayatımız Oyun"></label><label class="field full">E-posta<input class="input" type="email" name="email" required placeholder="${esc(ADMIN_EMAILS[0])}"></label><label class="field full">Şifre<input class="input" type="password" name="password" required placeholder="Yerel şifre belirle"></label><div class="full actions"><button class="btn primary" type="submit">Kayıt Ol</button><a class="btn secondary" href="/giris-yap">Giriş Yap</a></div></form></section>`); }
function accountPage(){
  const u=currentUser();
  if(!u) return loginPage();
  const summary=watchProfileSummary();
  const created=u.createdAt || u.created_at || 'Yerel oturum';
  const role=roleLabel(u.role, u.email);
  const last=summary.last;
  return layout(`<section class="profileHero profileHeroV217"><div><span class="badge green">👤 ${VERSION} • Kullanıcı Profili</span><h1>👤 ${esc(u.displayName||u.email)}</h1><p>Rolün <b>${esc(role)}</b>. Bu alanda kişisel izleme özetin, devam edilecek oyunlar ve son izlenen bölümler tek yerde tutulur.</p><div class="actions">${isYönetim()?'<a class="btn primary" href="/yonetim">🛡️ Yönetim Paneli</a>':''}<a class="btn secondary" href="/oyun-arsivi">🎮 Arşive Git</a><button class="btn danger" data-action="logout">🚪 Çıkış Yap</button></div></div><aside><b>${esc(u.email||'E-posta yok')}</b><span>📅 Kayıt: ${esc(created)}</span><small>Son izleme: ${last?`${esc(last.gameTitle)} • ${esc(last.episodeNumber)}. bölüm`:'Henüz izleme kaydı yok'}</small></aside></section><section class="profileStats profileStatsV217"><article><b>${summary.watchedEpisodes}/${summary.totalEpisodes||0}</b><span>▶️ Bölüm İlerlemesi</span><small>%${summary.progress} tamamlandı</small></article><article><b>${summary.watchedGames.length}</b><span>🎮 İzlenen Oyun</span><small>En az bir bölüm işaretlenen oyunlar</small></article><article><b>${summary.history.length}</b><span>🕘 Geçmiş Kaydı</span><small>Son 120 kayıt saklanır</small></article><article><b>${esc(role)}</b><span>👑 Yetki</span><small>Türkçe rol sistemi aktif</small></article></section><section class="profileGrid profileGridV217"><article class="panel"><h2>✏️ Profil Bilgileri</h2><form class="formGrid" data-profile-form><label class="field full">Görünen Ad<input class="input" name="displayName" value="${esc(u.displayName||'')}" placeholder="Kanal adın / kullanıcı adın"></label><label class="field full">E-posta<input class="input" value="${esc(u.email||'')}" disabled></label><div class="full actions"><button class="btn primary" type="submit">Profili Kaydet</button><button type="button" class="btn secondary" data-clear-watch-history>İzleme Geçmişini Temizle</button></div></form></article><article class="panel"><h2>⏭️ Devam Et</h2>${summary.continueRows.length?summary.continueRows.map(g=>{ const total=Number(g.episodeCount||0)||loadEpisodes(g.id).length||0; const watched=Number(g.watchedEpisodeCount||0); const pct=total?Math.round((watched/total)*100):0; return `<div class="profileContinue"><img src="${esc(g.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(g.title)}"><span><b>${esc(g.title)}</b><small>${watched}/${total} bölüm • %${pct}</small><i><em style="width:${pct}%"></em></i></span><a class="miniBtn primary" href="/izle?id=${encodeURIComponent(g.id)}">Devam Et</a></div>`; }).join(''):'<p class="muted">Devam edilecek kayıt yok. Bir bölüm işaretlediğinde burada görünür.</p>'}</article></section><section class="panel profileHistoryPanel"><div class="sectionHead compact"><div><h2>🕘 İzleme Geçmişi</h2><p>Son işaretlenen bölümler burada listelenir.</p></div></div>${summary.history.length?`<div class="profileHistoryList">${summary.history.slice(0,12).map(h=>`<article><span class="pill green">${esc(h.progress||0)}%</span><b>${esc(h.gameTitle||'Oyun')}</b><small>${esc(h.seriesName||'Serisiz')} • ${esc(h.episodeNumber||0)}. bölüm • ${esc(new Date(h.watchedAt||Date.now()).toLocaleString('tr-TR'))}</small><a class="miniBtn" href="/izle?id=${encodeURIComponent(h.gameId||'')}&ep=${encodeURIComponent(h.episodeNumber||0)}">Aç</a></article>`).join('')}</div>`:'<div class="empty compactEmpty">Henüz izleme geçmişi yok. İzleme sayfasında “Bu Bölüme Kadar İzledim” butonunu kullan.</div>'}</section>`);
}
function safeErrorPanel(message='Sayfa güvenli moda geçti.'){
  // Layout veya kullanıcı oturumu bozulsa bile hata ekranı tekrar hata üretmesin.
  return emergencySafeHtml(message);
}

function adminMetric(label, value, text='', state=''){
  const cls = state ? ` ${esc(state)}` : '';
  return `<article class="adminMetric${cls}"><span>${esc(label)}</span><b>${esc(String(value))}</b><small>${esc(text)}</small></article>`;
}
function adminActionCard(href, icon, title, text='', badge=''){
  return `<article class="adminActionCard"><span class="adminActionIcon adminIcon">${esc(icon)}</span><strong>${esc(title)}</strong><em>${esc(text)}</em>${badge?`<small>${esc(badge)}</small>`:''}<a class="miniBtn primary" href="${esc(href)}">Aç</a></article>`;
}

function admin(){ return adminOnly(()=>{
  try{
    const games=loadGames();
    const events=loadEvents();
    const notes=loadNotes();
    const maintenance=loadMaintenance();
    const user=currentUser() || {};
    const sync=syncState();
    const health=dataHealthState();
    const statusCounts=countBy(games,'status');
    const completed=Number(statusCounts['Tamamlanan']||0);
    const active=Number(statusCounts['Devam Eden']||0);
    const planned=Number(statusCounts['Yakında']||0) + Number(statusCounts['Planlandı']||0);
    const episodeTotal=games.reduce((sum,g)=>sum+Number(g.episodeCount||0),0);
    const cards=[
      ['/yonetim/oyun-ekle','➕','Oyun Ekle','Profesyonel kartlı form, RAWG/Steam ve YouTube oynatma listesi alanları.','v4.0.5 aktif'],
      ['/yonetim/not-defteri-oyun-ekle','📝','Notla Toplu Oyun Ekle','Not defterinden oyunları ayrıştırıp doğrudan Supabase games tablosuna kaydeder.','Yeni'],
      ['/yonetim/mevcut-oyunlar','🎮','Mevcut Oyunlar','Kayıtlı oyunları kontrol et, tek tek veya toplu sil.','Kalıcı silme aktif'],
      ['/yonetim/bolum-takibi','▶️','Bölüm Takibi','Oynatma listesi bölümleri, kaldığımız bölüm ve +1/-1 takip.','Aktif'],
      ['/koleksiyonlar','🗂️','Koleksiyonlar','Seri, tür, durum ve koleksiyon sayaçlarını ziyaretçi tarafta kontrol et.','v4.0.5'],
      ['/yonetim/yayin-takvimi','📅','Yayın Takvimi','Manuel yayın tarihleri ve video linkleri.','Korundu'],
      ['/yonetim/guncelleme-notlari','📝','Güncelleme Notları','Tamamlanan ve planlanan notları düzenle.','v4.0.5 işlendi'],
      ['/yonetim/bakim-modu','🛠️','Bakım Modu','Ziyaretçi siteyi bakım ekranına al, admin bypass korunsun.','Yetki korumalı'],
      ['/yonetim/kullanicilar','👥','Kullanıcılar ve Yetkiler','Kayıtlı kullanıcıları gör, tabloya kullanıcı ekle ve Kurucu/Moderatör/İçerik Editörü/Üye/Banlı yetkisi ver.','Aktif'],
      ['/oyun-arsivi','🗂️','Ziyaretçi Arşiv','Kullanıcı tarafındaki kartları ve filtreleri kontrol et.','Açık']
    ];
    return layout(`<section class="adminDashboardHero"><div><span class="badge green">${VERSION} • Yönetim Merkezi</span><h1>🛡️ Yönetim Merkezi</h1><p>Oyun, kullanıcı, yetki, takvim ve bakım kayıtlarını Supabase üzerinden yönet.</p><div class="adminHeroActions"><a class="btn primary" href="/yonetim/oyun-ekle">Yeni Oyun Ekle</a><a class="btn secondary" href="/yonetim/mevcut-oyunlar">Oyunlar</a><a class="btn secondary" href="/yonetim/kullanicilar">Kullanıcıları Yönet</a><button class="btn secondary" type="button" data-users-sync-dashboard>Supabase Kullanıcı Yenile</button><button class="btn secondary" type="button" data-admin-health>Veri Sağlığı</button></div></div><aside><b>${esc(roleLabel(user.role, user.email))}</b><span>${esc(user.email||ADMIN_EMAILS[0])}</span><small>${maintenance.enabled?'Bakım modu açık, yetkili geçişi aktif.':'Bakım modu kapalı, site ziyaretçilere açık.'}</small><small>Veri: ${esc(sync.status||sync.mode)}</small></aside></section><section class="adminMetricGrid">${adminMetric('Toplam Oyun',games.length,'Kalıcı kayıt sayısı')}${adminMetric('Devam Eden',active,'Aktif seri/oyun')}${adminMetric('Tamamlanan',completed,'Biten arşivler')}${adminMetric('Plan/Yakında',planned,'Gelecek içerikler')}${adminMetric('Bölüm',episodeTotal,'Toplam bölüm alanı')}${adminMetric('Koleksiyon',buildArchiveModel(games).collections.size,'Seri/tür koleksiyonu')}${adminMetric('Takvim',events.length,'Manuel yayın kaydı')}${adminMetric('Not',notes.length,'Güncelleme notu')}${adminMetric('Bakım',maintenance.enabled?'Açık':'Kapalı',maintenance.enabled?'Ziyaretçi bakım ekranı görür':'Site normal açılır',maintenance.enabled?'danger':'ok')}</section><div class="sectionHead"><div><h2>Hızlı İşlemler</h2><p>Tüm yönetim araçları artık tek panel içinden açılır; sol menü kullanılmaz, üst menü sabit kalır.</p></div></div><section class="adminActionGrid">${cards.map(c=>adminActionCard(...c)).join('')}</section><section class="adminStatusGrid"><article class="panel"><h2>Sistem Sağlığı</h2><div class="roadList"><span class="done">Boş/siyah ekran koruması aktif</span><span class="done">Yönetim bağlantıları sadece yetkili hesapta görünür</span><span class="done">Kayıt ol / giriş yap sayfaları korunuyor</span><span class="done">Bakım modu ziyaretçi kullanıcıya ayrı ekran gösterir</span><span class="done">Şema artık tablo/veri sıfırlamaz</span><span class="done">YouTube oynatma listesi ve bölüm takibi aktif</span><span class="done">Supabase oyun/takvim/not/bakım köprüsü aktif: ${esc(sync.status||'yerel')}</span></div></article><article class="panel dataHealthCard"><h2>🧪 Supabase Veri Sağlığı</h2><div class="roadList"><span class="done">Mod: ${esc(health.mode)}</span><span class="done">Oyun: ${esc(health.games)}</span><span class="done">Kullanıcı: ${esc(health.users)}</span><span class="done">Takvim: ${esc(health.events)}</span><span class="done">Not: ${esc(health.notes)}</span><span class="done">Bakım: ${esc(health.maintenance)}</span></div><p class="muted">${esc(health.message || "Henüz kontrol edilmedi.")}</p></article><article class="panel"><h2>Sıradaki Adım</h2><article class="note"><span class="pill green">v4.0.5 • Tamamlandı</span><h3>Ana Açılış Final</h3><p>Site, kullanıcı/yetki sistemi, bakım güvenliği, arşiv, seri ve yönetim merkezi açılışa hazırlandı.</p></article></article></section>`);
  }catch(err){
    console.error('Yönetim paneli güvenli hata:', err);
    return safeErrorPanel(err && err.message ? err.message : 'Yönetim paneli oluşturulurken hata yakalandı.');
  }
}); }

const NOTE_GAME_TEMPLATE = `OYUN: 007 First Light
STEAM APP ID: 3123790
STEAMDB: https://steamdb.info/app/3123790/
DURUM: Devam Eden
SERİ: James Bond
TÜR: Aksiyon, Macera, Gizlilik
ETİKET: Türkçe Altyazılı, Hikaye Odaklı, Playlist
PLATFORM: PC, PlayStation 5, Xbox Series S/X, Nintendo Switch
ÇIKIŞ TARİHİ: 2026
TOPLAM BÖLÜM: 2
KALDIĞIMIZ BÖLÜM: 0
PLAYLIST: https://www.youtube.com/playlist?list=PLAYLIST_ID_BURAYA
KAPAK: https://...
BANNER: https://...
KISA AÇIKLAMA: Kartlarda görünecek kısa ve temiz açıklama.
HİKAYE: Karakter, görev, mekan, atmosfer ve bölüm akışı odaklı arşiv anlatımı.
---
OYUN: Alan Wake Remastered
STEAM APP ID: 108710
STEAMDB: https://steamdb.info/app/108710/
DURUM: Tamamlanan
SERİ: Alan Wake
TÜR: Psikolojik Korku, Gerilim, Hikaye Odaklı
ETİKET: Türkçe Altyazılı, %100
PLATFORM: PC, PlayStation 5, Xbox Series S/X
ÇIKIŞ TARİHİ: 05.10.2021
TOPLAM BÖLÜM: 12
KALDIĞIMIZ BÖLÜM: 12
PLAYLIST: https://www.youtube.com/playlist?list=PLAYLIST_ID_BURAYA
KISA AÇIKLAMA: Alan Wake'in karanlık atmosferli hikaye arşivi.
HİKAYE: Bright Falls çevresinde geçen psikolojik gerilim, karakter çatışması ve gizemli olay örgüsüyle arşivlenir.`;

function noteKeyNormalize(k){
  return String(k||'').toLocaleLowerCase('tr').replace(/ı/g,'i').replace(/[^a-z0-9ğüşöçİ]+/gi,'').trim();
}
function noteFieldSet(obj, key, val){
  const k=noteKeyNormalize(key); const v=String(val||'').trim(); if(!v) return;
  if(['oyun','oyunadi','ad','baslik','title','name'].includes(k)) obj.title=v;
  else if(['seri','seriadı','seriadi','series','franchise'].includes(k)) obj.seriesName=v;
  else if(['durum','status'].includes(k)) obj.status=v;
  else if(['tur','tür','kategori','genre'].includes(k)) obj.genre=v;
  else if(['etiket','etiketler','tags','tag'].includes(k)) obj.tags=v;
  else if(['platform','platformlar','platforms'].includes(k)) obj.platforms=v;
  else if(['tarih','cikistarihi','çıkıştarihi','releasedate','release'].includes(k)) obj.releaseDate=bestReleaseDate(v);
  else if(['kapak','kapakurl','cover','coverurl'].includes(k)) obj.cover=v;
  else if(['banner','bannerurl','hero'].includes(k)) obj.banner=v;
  else if(['playlist','youtube','youtubeplaylist','youtubeplaylisturl','oynatmalistesi'].includes(k)) { obj.youtubePlaylistUrl=v; obj.youtubePlaylistId=extractYoutubePlaylistId(v); }
  else if(['bolum','bölüm','bolumsayisi','bölümsayısı','episode','episodes','episodecount'].includes(k)) obj.episodeCount=Number(v.replace(/[^0-9]/g,''))||0;
  else if(['kaldigimiz','kaldığımız','izlenen','watched','watchedepisodecount'].includes(k)) obj.watchedEpisodeCount=Number(v.replace(/[^0-9]/g,''))||0;
  else if(['puan','score','rating'].includes(k)) obj.score=Number(v.replace(',','.'))||0;
  else if(['aciklama','açıklama','kisaaciklama','kısaaçıklama','description','summary'].includes(k)) obj.description=v;
  else if(['hikaye','hikâye','story','storytext','arsivanlatimi','arşivanlatımı'].includes(k)) obj.storyText=v;
  else if(['rawg','rawgid'].includes(k)) obj.rawgId=v;
  else if(['rawgslug','slug'].includes(k)) obj.rawgSlug=v;
  else if(['steam','steamappid','appid','steamdb','steamdburl'].includes(k)){ const m=String(v).match(/app\/(\d+)/) || String(v).match(/^(\d+)$/); obj.steamAppId=m?m[1]:v; }
}
function parseGameNotes(text){
  const rows=[]; let cur={};
  const push=()=>{ if(String(cur.title||'').trim()){ rows.push(cur); } cur={}; };
  const lines=String(text||'').replace(/\r/g,'').split('\n');
  for(const raw of lines){
    const line=raw.trim();
    if(!line) continue;
    if(/^[-=*_]{3,}$/.test(line)){ push(); continue; }
    if(line.includes('|')){
      const parts=line.split('|').map(x=>x.trim()).filter(Boolean);
      if(parts.length){ if(!parts[0].includes(':') && !cur.title) cur.title=parts.shift(); parts.forEach(part=>{ const m=part.match(/^([^:：]+)[:：](.*)$/); if(m) noteFieldSet(cur,m[1],m[2]); }); }
      continue;
    }
    const m=line.match(/^([^:：]+)[:：](.*)$/);
    if(m){ const key=m[1].trim(); const val=m[2].trim(); if(noteKeyNormalize(key)==='oyun' && cur.title) push(); noteFieldSet(cur,key,val); }
    else if(!cur.title){ cur.title=line; }
    else { cur.description = [cur.description,line].filter(Boolean).join(' '); }
  }
  push();
  return rows.map((r,i)=>normalizeGame({
    id:((window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : 'game-'+Date.now()+'-'+i),
    title:r.title,
    status:r.status || 'Devam Eden',
    genre:r.genre || 'Aksiyon, Macera, Hikaye',
    tags:r.tags || 'Türkçe Altyazılı, Hikaye Odaklı',
    seriesName:cleanSeriesName(r.seriesName || '', r.title),
    cover:r.cover || '/assets/hayatimiz-kapak.png',
    banner:r.banner || r.cover || '',
    releaseDate:bestReleaseDate(r.releaseDate),
    platforms:r.platforms || 'PC',
    description:r.description || localGameMetaCandidate(r.title)?.description || `${r.title} için arşiv kaydı.`,
    storyText:r.storyText || localGameMetaCandidate(r.title)?.storyText || professionalStoryText({title:r.title, genre:r.genre, seriesName:r.seriesName}),
    youtubePlaylistUrl:r.youtubePlaylistUrl || '',
    youtubePlaylistId:r.youtubePlaylistId || extractYoutubePlaylistId(r.youtubePlaylistUrl || ''),
    episodeCount:Number(r.episodeCount||0),
    watchedEpisodeCount:Number(r.watchedEpisodeCount||0),
    score:Number(r.score||0),
    rawgId:r.rawgId || '',
    rawgSlug:r.rawgSlug || slugify(r.title),
    steamAppId:r.steamAppId || '',
    metaSource:'Not defteri import',
    metaCheckedAt:new Date().toISOString(),
    coverSource:r.cover ? 'Not defteri' : 'Varsayılan'
  },i));
}
function noteGameImportPage(){ return adminOnly(()=>layout(`<section class="gameEditorHero"><div><span class="badge green">${VERSION} • Not Defteriyle Supabase Oyun Ekleme</span><h1>📝 Not Defterinden Oyun Ekle</h1><p>Oyunları telefonda veya PC'de Not Defteri'ne yaz, buraya yapıştır ve hepsini doğrudan Supabase games tablosuna kaydet. Yerel kayıt yapılmaz; Supabase boş dönerse mevcut oyunlar korunur.</p><div class="actions"><a class="btn secondary" href="/yonetim/oyun-ekle">Tek Oyun Ekle</a><a class="btn secondary" href="/yonetim/mevcut-oyunlar">Mevcut Oyunlar</a><a class="btn secondary" href="/NOT-DEFTERI-OYUN-EKLEME-REHBERI.md">Rehber</a></div></div><aside><b>Format kuralı</b><span>Her oyunu --- çizgisiyle ayır.</span><small>Oyun, Seri, Durum, Tür, Etiket, Platform, Tarih, Playlist alanlarını yazman yeterli.</small></aside></section><form class="panel notepadImportPanel" data-notepad-game-form><h2>📋 Oyun Notlarını Yapıştır</h2><p class="muted">Her oyun Supabase'e ayrı kayıt olarak gönderilir. Hata olursa hangi oyunda hata verdiği ekranda gösterilir.</p><textarea class="textareaTall notepadTextarea" name="notes" spellcheck="false" placeholder="${esc(NOTE_GAME_TEMPLATE)}">${esc(NOTE_GAME_TEMPLATE)}</textarea><div class="actions"><button class="btn primary" type="submit">☁️ Not Defterindeki Oyunları Supabase’ye Kaydet</button><button class="btn secondary" type="button" data-notepad-preview>Önizle</button><button class="btn secondary" type="button" data-notepad-template>Şablonu Geri Yükle</button></div><div class="notepadResult" data-notepad-result><b>Hazır.</b><span>Kaydetmeden önce Önizle butonuyla kaç oyun algılandığını kontrol edebilirsin.</span></div></form><section class="panel notepadGuide"><h2>Not Defterine Ne Yazacağım?</h2><div class="roadList"><span class="done">Oyun: oyunun adı</span><span class="done">Seri: bağlı olduğu seri</span><span class="done">Durum: Devam Eden / Tamamlanan / Yakında / Planlandı</span><span class="done">Tür: Aksiyon, Korku, RPG gibi</span><span class="done">Etiket: Türkçe Altyazılı, DLC, %100, Co-op</span><span class="done">Playlist: YouTube oynatma listesi linki</span><span class="done">Kapak/Banner: varsa görsel URL, yoksa varsayılan kapak kullanılır</span></div></section>`)); }

function gameForm(){ return adminOnly(()=>{
  const params=queryParams();
  const editId=params.get('id') || '';
  const rows=loadGames();
  const existing=editId ? rows.find(g=>String(g.id)===String(editId)) : null;
  const editing=!!existing;
  const game=existing || {title:'',status:'Devam Eden',genre:'',tags:'',seriesName:'',cover:'/assets/hayatimiz-kapak.png',banner:'',releaseDate:'',platforms:'',description:'',storyText:'',youtubePlaylistUrl:'',youtubePlaylistId:'',rawgId:'',steamAppId:'',episodeCount:0,watchedEpisodeCount:0};
  const episodes=editing ? loadEpisodes(game.id) : [];
  const statusOptions=['Devam Eden','Tamamlanan','Yakında','Planlandı','Ara Verildi'];
  const quickTags=['Türkçe Altyazılı','Türkçe Dublajlı','DLC','%100','Co-op','Multiplayer','Singleplayer','Hikaye Odaklı','Korku','Aksiyon','Macera'];
  const quickGenres=['Aksiyon','Macera','RPG','FPS','TPS','Korku','Hayatta Kalma','Simülasyon','Strateji','Yarış','Spor','Açık Dünya','Soulslike','Metroidvania','Platform','Bulmaca','Gizlilik','Bilim Kurgu','Fantastik','Hikaye'];
  return layout(`<section class="gameEditorHero"><div><span class="badge green">${VERSION} • Profesyonel Oyun Formu</span><h1>${editing?'Oyunu Düzenle':'Oyun Ekle'}</h1><p>Etiketler butonlu, türler profesyonel seçimli ve Supabase kayıt akışı veri sıfırlamadan çalışır.</p><div class="actions"><a class="btn secondary" href="/yonetim/mevcut-oyunlar">Mevcut Oyunlar</a><a class="btn secondary" href="/yonetim/bolum-takibi">Bölüm Takibi</a><a class="btn secondary" href="/oyun-arsivi">Arşivi Gör</a></div></div><aside><b>${editing?'Düzenleme modu':'Yeni kayıt modu'}</b><span>${editing?esc(game.title):'Kayıt yalnızca Supabase games tablosuna yazılır.'}</span><small>Boş/siyah ekran koruması aktif kalır.</small></aside></section><form class="gameEditorLayout" data-game-form><input type="hidden" name="gameId" value="${fieldValue(game,'id')}"><input type="hidden" name="youtubePlaylistId" value="${fieldValue(game,'youtubePlaylistId')}"><textarea hidden name="episodesJson">${esc(JSON.stringify(episodes))}</textarea><section class="gameEditorMain"><article class="formSection"><div class="formSectionTitle"><span>01</span><div><h2>Temel Bilgiler</h2><p>Oyun adı, durum, tür ve seri alanları ayrı tutulur.</p></div></div><div class="formGrid pro"><label class="field full">Oyun Adı<input class="input" name="title" required value="${fieldValue(game,'title')}" placeholder="Örn: 007 First Light"></label><label class="field">Durum<select name="status">${statusOptions.map(s=>`<option ${selectedOption(game.status,s)}>${esc(s)}</option>`).join('')}</select></label><label class="field">Tür / Kategori<input class="input" name="genre" value="${fieldValue(game,'genre')}" placeholder="Korku, Aksiyon, Macera" list="genreSuggestions"></label><div class="field full"><span>Profesyonel Tür Seçimi</span><div class="choicePills genreChoicePills">${quickGenres.map(t=>`<label><input type="checkbox" name="genreCheck" value="${esc(t)}" ${splitText(game.genre).includes(t)?'checked':''}><span>${esc(t)}</span></label>`).join('')}</div><small>Birden fazla tür seçilebilir; kaydederken Tür/Kategori alanına eklenir.</small></div><label class="field">Seri Adı<input class="input" name="seriesName" value="${fieldValue(game,'seriesName')}" placeholder="Örn: James Bond"></label><label class="field">Çıkış Tarihi<input class="input" name="releaseDate" value="${fieldValue(game,'releaseDate')}" placeholder="2026-05-27 veya 2026"></label><label class="field">Toplam Bölüm<input class="input" type="number" min="0" name="episodeCount" value="${fieldValue(game,'episodeCount',0)}"></label><label class="field">Kaldığımız Bölüm<input class="input" type="number" min="0" name="watchedEpisodeCount" value="${fieldValue(game,'watchedEpisodeCount',0)}"></label><label class="field">Platformlar<input class="input" name="platforms" value="${fieldValue(game,'platforms')}" placeholder="PC, PlayStation 5, Xbox"></label></div></article><article class="formSection"><div class="formSectionTitle"><span>02</span><div><h2>Görseller</h2><p>Kapak ve banner alanları ayrı tutulur.</p></div></div><div class="formGrid pro"><label class="field full">Kapak URL<input class="input" name="cover" value="${fieldValue(game,'cover','')}" placeholder="/assets/hayatimiz-kapak.png veya https://..."></label><label class="field full">Banner URL<input class="input" name="banner" value="${fieldValue(game,'banner','')}" placeholder="Hero/banner görseli URL"></label></div></article><article class="formSection"><div class="formSectionTitle"><span>03</span><div><h2>Etiketler ve Kaynaklar</h2><p>Etiketler status/sürüm alanına karışmaz. RAWG, Steam ve YouTube alanları güvenli panelle yönetilir.</p></div></div><div class="formGrid pro"><label class="field full">Etiketler<input class="input" name="tags" value="${fieldValue(game,'tags')}" placeholder="Seçili etiketler burada görünür: Türkçe Altyazılı, DLC, %100"></label><div class="field full"><span>Hazır Etiketler</span><div class="choicePills tagChoicePills">${quickTags.map(t=>`<label><input type="checkbox" name="tagsCheck" value="${esc(t)}" ${splitText(game.tags).includes(t)?'checked':''}><span>${esc(t)}</span></label>`).join('')}</div><small>Butonları seç; kaydederken etiket alanına otomatik eklenir.</small></div><label class="field full">YouTube Playlist URL<input class="input" name="youtubePlaylistUrl" value="${fieldValue(game,'youtubePlaylistUrl')}" placeholder="https://youtube.com/playlist?list=..."></label><div class="youtubeToolbox full"><div><b>v4.0.5 YouTube Playlist Paneli</b><p>Playlist linkinden bölüm listesini çek, toplam bölüm sayısını doldur ve kaldığımız bölüm takibini güncelle. API hata verirse sahte bölüm üretilmez; gerçek playlistItems sonucu gerekir.</p></div><div class="metaToolActions"><button class="btn primary" type="button" data-youtube-action="sync-form">Oynatma Listesi Bölümlerini Çek</button><button class="btn secondary" type="button" data-youtube-action="count-form">Sadece Bölüm Sayısını Doldur</button></div><small data-youtube-status>${episodes.length?`${episodes.length} bölüm kayıtlı.`:'Playlist bekleniyor.'}</small><div data-youtube-preview>${renderEpisodeList(episodes, Number(game.watchedEpisodeCount||0), game.cover||'/assets/hayatimiz-kapak.png')}</div></div><label class="field">RAWG ID<input class="input" name="rawgId" value="${fieldValue(game,'rawgId')}" placeholder="RAWG ID"></label><label class="field">RAWG Slug<input class="input" name="rawgSlug" value="${fieldValue(game,'rawgSlug')}" placeholder="rawg-slug"></label><label class="field">Steam App ID<input class="input" name="steamAppId" value="${fieldValue(game,'steamAppId')}" placeholder="Steam App ID veya SteamDB URL: https://steamdb.info/app/123456/"></label><label class="field">Puan<input class="input" name="score" value="${fieldValue(game,'score',0)}" placeholder="8.5"></label><label class="field full">Meta Kaynağı<input class="input" name="metaSource" value="${fieldValue(game,'metaSource')}" placeholder="RAWG / Steam / Yerel meta"></label><input type="hidden" name="metaCheckedAt" value="${fieldValue(game,'metaCheckedAt')}"><div class="metaToolbox full"><div><b>v4.0.5 SteamDB Öncelikli Meta Paneli</b><p>Önce SteamDB/Steam App ID kapaklarını çeker; Steam sonucu yoksa yerel/RAWG yedeğine geçer.</p></div><div class="metaToolActions"><button class="btn primary" type="button" data-meta-action="rawg">SteamDB Öncelikli Çek</button><button class="btn secondary" type="button" data-meta-action="steam">Steam Kontrol</button><button class="btn secondary" type="button" data-meta-action="local">Yerel Güvenli Doldur</button></div><small data-meta-status>Meta bekleniyor.</small></div></div></article><article class="formSection"><div class="formSectionTitle"><span>04</span><div><h2>Hikaye ve Açıklama</h2><p>Kısa açıklama kartlarda, hikaye alanı detay anlatımında kullanılacak.</p></div></div><div class="formGrid pro"><label class="field full">Kısa Açıklama<textarea name="description" class="textareaTall" placeholder="Kartlarda görünecek kısa açıklama">${fieldValue(game,'description')}</textarea></label><label class="field full">Hikaye / Arşiv Anlatımı<textarea name="storyText" class="textareaTall" placeholder="Örn: Görevin henüz başında, çiçeği burnunda bir ajan olan James Bond...">${fieldValue(game,'storyText')}</textarea></label><div class="storyToolbox full"><div><b>Profesyonel Hikaye Oluştur</b><p>Tür ve platform saymak yerine karakter, görev, atmosfer ve bölüm takibi odaklı Türkçe hikaye metni üretir.</p></div><button class="btn secondary" type="button" data-story-action="generate">Hikayeyi Düzgün Oluştur</button></div></div></article><div class="formSaveBar"><button class="btn primary" type="submit">${editing?'☁️ Supabase’de Güncelle':'☁️ Supabase’ye Kaydet'}</button><a class="btn secondary" href="/yonetim/mevcut-oyunlar">Vazgeç</a></div></section><aside class="editorSide"><article class="previewBox"><img src="${esc(game.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="Önizleme"><span class="pill ${statusClass(game.status)}">${esc(game.status||'Devam Eden')}</span><h3>${esc(game.title||'Oyun önizleme')}</h3><p>${esc(game.description||'Kayıt sonrası arşiv kartlarında görünecek açıklama.')}</p></article><article class="editorHint"><h3>Bölüm Durumu</h3><p>${Number(game.watchedEpisodeCount||0)} / ${episodes.length || Number(game.episodeCount||0)} bölüm takip ediliyor.</p><a class="miniBtn" href="/yonetim/bolum-takibi">Bölüm Takibini Aç</a></article><article class="editorHint"><h3>Hızlı Tür Önerileri</h3><div class="tags">${quickGenres.map(t=>`<span>${esc(t)}</span>`).join('')}</div></article><article class="editorHint"><h3>Kural</h3><p>YouTube oynatma listesi sistemi kontrollü geri geldi. Eski kırık otomasyon aynen basılmadı; boş ekran koruması korunuyor.</p></article></aside><datalist id="genreSuggestions">${quickGenres.map(t=>`<option value="${esc(t)}"></option>`).join('')}</datalist></form>`);
}); }
function seriesManager(){ return adminOnly(()=>{
  const games=buildArchiveModel(loadGames()).games;
  const model=buildArchiveModel(games);
  const params=queryParams();
  const selected=String(params.get('series') || Array.from(model.series.keys())[0] || '').trim();
  const seriesNames=Array.from(model.series.keys()).sort((a,b)=>a.localeCompare(b,'tr'));
  const selectedRows=selected ? orderedSeriesRows(games.filter(g=>String(g.seriesName||'Serisiz Oyunlar')===selected)) : [];
  const totals=seriesTotals(selectedRows);
  const unassigned=games.filter(g=>!String(g.seriesName||'').trim()).length;
  const selectedIds=new Set(selectedRows.map(g=>String(g.id)));
  const visibleSeriesRows=games.filter(g=>{
    const currentSeries=String(g.seriesName||'').trim() || 'Serisiz Oyunlar';
    if(selected) return currentSeries===selected || currentSeries==='Serisiz Oyunlar';
    return currentSeries==='Serisiz Oyunlar';
  });
  const allRows=visibleSeriesRows.map((g,i)=>({...g, _seriesChecked:selectedIds.has(String(g.id)), _seriesOrder:Number(g.seriesOrder ?? g.sortOrder ?? i)}))
    .sort((a,b)=>Number(b._seriesChecked)-Number(a._seriesChecked) || Number(a._seriesOrder)-Number(b._seriesOrder) || String(a.title).localeCompare(String(b.title),'tr'));
  const selectedPreview=selectedRows.map((g,i)=>`<span><b>${i+1}</b> ${esc(g.title)}</span>`).join('') || '<span>Henüz seçili oyun yok.</span>';
  return layout(`<section class="archiveHero seriesAdminHero v216SeriesHero"><div><span class="badge green">${VERSION} • Gelişmiş Seri Yönetimi</span><h1>🎬 Seri Yönetimi</h1><p>Her seri artık ayrı düzenlenir. Seçili seriye ait oyunlar ve serisiz oyunlar görünür; başka seriye bağlı oyunlar yanlışlıkla bu seriye karışmaz.</p></div><div class="actions"><a class="btn secondary" href="/seriler?sort=az">🎬 Public Seriler</a><a class="btn secondary" href="/yonetim/mevcut-oyunlar">🎮 Mevcut Oyunlar</a><a class="btn primary" href="${selected?seriesWatchHref(selected):'/izle'}">▶️ Tüm Seriyi İzle</a></div></section><section class="archiveStats"><article><b>${seriesNames.length}</b><span>🎬 Seri</span></article><article><b>${selectedRows.length}</b><span>✅ Seçili Oyun</span></article><article><b>${totals.episodes}</b><span>▶️ Seri Bölümü</span></article><article><b>${unassigned}</b><span>📦 Serisiz Oyun</span></article></section><section class="seriesAdminGrid v216SeriesAdminGrid"><aside class="panel seriesAdminList"><h2>🎬 Seri Listesi</h2><p class="muted">Bir seriyi seçip içindeki oyunları düzenle.</p><div class="miniList">${seriesNames.length?seriesNames.map(name=>{ const rows=orderedSeriesRows(model.series.get(name)||[]); const t=seriesTotals(rows); return `<a class="seriesAdminLink ${name===selected?'active':''}" href="/yonetim/seriler?series=${encodeURIComponent(name)}"><b>${esc(name)}</b><small>${rows.length} oyun • ${t.episodes} bölüm • ${t.pct}% takip</small></a>`; }).join(''):'<div class="empty compactEmpty">Henüz seri yok.</div>'}</div><div class="seriesCreateHint"><h3>➕ Yeni seri oluştur</h3><p>Sağdaki formda Seri Adı yaz, sadece serisiz oyunları seç ve kaydet. Diğer serilere ait oyunlar kendi seri ekranında düzenlenir.</p></div></aside><form class="panel seriesEditor v216SeriesEditor" data-series-form><input type="hidden" name="oldSeriesName" value="${esc(selected)}"><div class="sectionHead compact"><div><h2>${selected?esc(selected):'Yeni Seri'} Düzenle</h2><p>${selectedRows.length} oyun seçili • ${totals.episodes} bölüm • ${totals.pct}% takip</p></div><button class="btn primary" type="submit">💾 Seriyi Kalıcı Kaydet</button></div><div class="seriesEditorTopGrid"><label class="field full">Seri Adı<input class="input" name="seriesName" required value="${esc(selected)}" placeholder="Örn: A Plague Tale"></label><article class="seriesOrderPreview"><b>📋 Seri Sırası Önizleme</b><div data-series-preview>${selectedPreview}</div></article></div><div class="seriesEditorToolbar"><button class="miniBtn" type="button" data-series-select-all="1">✅ Tümünü Seç</button><button class="miniBtn" type="button" data-series-clear="1">🧹 Seçimi Temizle</button><button class="miniBtn" type="button" data-series-sort-preview="az">🔤 Seçilileri A-Z Sırala</button><button class="miniBtn" type="button" data-series-sort-preview="episode">▶️ Bölüme Göre Sırala</button><button class="miniBtn" type="button" data-series-sort-preview="status">📌 Duruma Göre Sırala</button><button class="miniBtn" type="button" data-series-sort-preview="release">📅 Tarihe Göre Sırala</button></div><div class="seriesEditorHelp"><span>☰ Sürükle-bırak: satırı tutup taşı</span><span>🔢 Sayı ile sıra: Sıra alanına 1, 2, 3 yaz</span><span>✅ Seçim: oyunu seriye dahil et / çıkar</span><span>💾 Supabase: yetkili oturum varsa kalıcı kaydeder</span><span>🧩 Ayrı seri: başka serideki oyunlar bu ekranda gizlenir</span></div><div class="seriesDndList v216SeriesDndList" data-series-dnd-list>${allRows.map((g,i)=>{ const order=selectedRows.findIndex(x=>String(x.id)===String(g.id)); const eps=loadEpisodes(g.id).length || Number(g.episodeCount||0); const value=order>=0?order+1:(i+1); return `<article class="seriesDndItem ${g._seriesChecked?'selected':''}" draggable="true" data-series-dnd-item data-game-id="${esc(g.id)}" data-game-title="${esc(g.title)}" data-status="${esc(g.status||'')}" data-release-date="${esc(g.releaseDate||'9999')}" data-episode-total="${eps}"><div class="dragHandle" title="Sürükle bırak">☰</div><label class="checkLine"><input type="checkbox" name="gameIds" value="${esc(g.id)}" ${g._seriesChecked?'checked':''}> <span>Seriye dahil</span></label><img src="${esc(g.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(g.title)}"><div class="seriesDndTitle"><b>${esc(g.title)}</b><small>${esc(g.seriesName||'Serisiz')} • ${esc(g.status||'Durum yok')} • ${eps} bölüm</small></div><label class="orderField">Sıra<input class="input" type="number" min="1" name="order__${esc(g.id)}" value="${esc(value)}" data-series-order-input></label><div class="tableActions"><button class="miniBtn" type="button" data-series-row-up>↑</button><button class="miniBtn" type="button" data-series-row-down>↓</button><a class="miniBtn" href="/yonetim/oyun-duzenle?id=${encodeURIComponent(g.id)}">Oyun</a></div></article>`; }).join('')}</div><div class="formSaveBar"><button class="btn primary" type="submit">💾 Seriyi ve Sıralamayı Kaydet</button><a class="btn secondary" href="/seriler?sort=az">🎬 Seriler Sayfası</a><a class="btn secondary" href="${selected?seriesWatchHref(selected):'/izle'}">▶️ Tüm Seriyi İzle</a></div></form></section>`);
}); }

function currentGamesYönetim(){ autoRefreshGamesPageFromSupabase(); return adminOnly(()=>{ const games=buildArchiveModel(loadGames()).games; const sync=syncState(); return layout(`<div class="sectionHead"><div><h2>Mevcut Oyunlar</h2><p>${games.length} kayıt listeleniyor. Veri durumu: ${esc(sync.status||sync.mode)}. Supabase ana kaynaktır; sayfa açılınca ve butona basınca games tablosu tekrar çekilir.</p></div><div class="actions"><a class="btn primary" href="/yonetim/oyun-ekle">Yeni Oyun</a><button class="btn secondary" type="button" data-supabase-refresh>Supabase’den Çek</button><a class="btn secondary" href="/koleksiyonlar">Koleksiyonlar</a><a class="btn secondary" href="/yonetim/seriler">Serileri Yönet</a><a class="btn secondary" href="/yonetim/bolum-takibi">Bölüm Takibi</a><button class="btn secondary" data-reset-demo-games>Örnekleri Geri Yükle</button></div></div><div class="panel tablePanel">${games.length?`<table class="table adminGamesTable"><thead><tr><th>Sıra</th><th>Oyun</th><th>Durum</th><th>Koleksiyon</th><th>Bölüm</th><th>İşlem</th></tr></thead><tbody>${games.map((g,i)=>{ const eps=loadEpisodes(g.id); const total=eps.length || Number(g.episodeCount||0); return `<tr><td><b>#${i+1}</b><div class="tableActions"><button class="miniBtn" data-move-game="${esc(g.id)}" data-delta="-1">↑</button><button class="miniBtn" data-move-game="${esc(g.id)}" data-delta="1">↓</button></div></td><td><b>${esc(g.title)}</b><small>${esc(g.releaseDate||'Tarih yok')} • ${g.youtubePlaylistUrl?'Oynatma listesi var':'Oynatma listesi yok'}</small></td><td><span class="pill ${statusClass(g.status)}">${esc(g.status)}</span><small>${esc(statusBucket(g.status))}</small></td><td><b>${esc(collectionName(g))}</b><small>${esc(g.genre||'-')} • ${esc(g.seriesName||'Serisiz')}</small></td><td><b>${Number(g.watchedEpisodeCount||0)} / ${total}</b><small>${g.episodeSyncedAt?'Senkronlandı':'Bekliyor'}</small></td><td><div class="tableActions"><a class="miniBtn" href="/yonetim/oyun-duzenle?id=${encodeURIComponent(g.id)}">Düzenle</a><button class="miniBtn" data-sync-game-playlist="${esc(g.id)}">Oynatma Listesi Çek</button><button class="miniBtn danger" data-delete-game="${esc(g.id)}">Sil</button></div></td></tr>`; }).join('')}</tbody></table>`:'<div class="empty">Kayıtlı oyun yok. Bu durum artık korunur; sayfa yenilenince demo oyunlar geri gelmez.</div>'}</div>`); }); }

function episodeTracker(){ return adminOnly(()=>{ const games=loadGames(); return layout(`<div class="sectionHead"><div><h2>Bölüm Takibi</h2><p>YouTube oynatma listesiten çekilen bölümler ve kaldığımız bölüm kontrolü.</p></div><div class="actions"><a class="btn primary" href="/yonetim/oyun-ekle">Oyun Ekle</a><a class="btn secondary" href="/yonetim/mevcut-oyunlar">Mevcut Oyunlar</a></div></div><section class="episodeYönetimGrid">${games.length?games.map(g=>{ const eps=loadEpisodes(g.id); const total=eps.length || Number(g.episodeCount||0); const watched=Number(g.watchedEpisodeCount||0); return `<article class="episodeGamePanel"><div class="episodeGameHead"><img src="${esc(g.cover||'/assets/hayatimiz-kapak.png')}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(g.title)}"><div><span class="pill ${statusClass(g.status)}">${esc(g.status)}</span><h3>${esc(g.title)}</h3><p>${esc(g.seriesName||'Serisiz')} • ${watched}/${total} bölüm</p></div></div><div class="progressMini"><i><span style="width:${total?Math.round((watched/total)*100):0}%"></span></i><small>Kaldığımız bölüm: ${watched}</small></div><div class="episodeActions"><button class="miniBtn primary" data-sync-game-playlist="${esc(g.id)}">Oynatma Listesi Bölümlerini Çek</button><button class="miniBtn" data-progress-game="${esc(g.id)}" data-delta="1">+1 Bölüm</button><button class="miniBtn" data-progress-game="${esc(g.id)}" data-delta="-1">-1 Bölüm</button><a class="miniBtn" href="/yonetim/oyun-duzenle?id=${encodeURIComponent(g.id)}">Düzenle</a></div>${renderEpisodeList(eps, watched, g.cover||'/assets/hayatimiz-kapak.png')}</article>`; }).join(''):'<div class="empty">Bölüm takibi için önce oyun ekle.</div>'}</section>`); }); }
function calendarMonthName(dateValue){
  const d=new Date(String(dateValue||'')+'T00:00:00');
  if(Number.isNaN(d.getTime())) return 'Planlanmamış';
  return d.toLocaleDateString('tr-TR',{month:'long',year:'numeric'});
}
function buildCalendarMatrix(rows){
  const sorted=[...(rows||[])].sort((a,b)=>String(a.date||'9999-12-31').localeCompare(String(b.date||'9999-12-31')) || String(a.time||'').localeCompare(String(b.time||'')));
  const first=sorted.find(e=>e.date)?.date || new Date().toISOString().slice(0,10);
  const base=new Date(String(first).slice(0,7)+'-01T00:00:00');
  const year=base.getFullYear();
  const month=base.getMonth();
  const firstDay=new Date(year,month,1);
  const startOffset=(firstDay.getDay()+6)%7;
  const daysInMonth=new Date(year,month+1,0).getDate();
  const cells=[];
  for(let i=0;i<startOffset;i++) cells.push({empty:true});
  for(let d=1; d<=daysInMonth; d++){
    const iso=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    cells.push({day:d,date:iso,events:sorted.filter(e=>String(e.date||'').slice(0,10)===iso)});
  }
  while(cells.length%7) cells.push({empty:true});
  return {title:base.toLocaleDateString('tr-TR',{month:'long',year:'numeric'}), cells, sorted};
}
function adminCalendarBoard(rows){
  const cal=buildCalendarMatrix(rows);
  const week=['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'];
  return `<section class="panel calendarBoardPanel"><div class="sectionHead compact"><div><h2>🗓️ Takvim Görünümü</h2><p>${esc(cal.title)} ayı içinde yayınlar gün kutularına yerleştirildi.</p></div><span class="pill green">${rows.length} kayıt</span></div><div class="adminCalendarWeek">${week.map(w=>`<b>${w}</b>`).join('')}</div><div class="adminCalendarGrid">${cal.cells.map(c=>c.empty?'<article class="adminCalendarCell mutedCell"></article>':`<article class="adminCalendarCell ${c.events.length?'hasEvent':''}"><strong>${c.day}</strong>${c.events.slice(0,3).map(e=>`<div class="calendarTinyEvent withCover"><img src="${esc(eventGameCover(e))}" onerror="this.src='/assets/hayatimiz-kapak.png'" alt="${esc(eventDisplayTitle(e))}"><span>${esc(e.time||'20:00')}</span><b>${esc(eventDisplayTitle(e))}</b><small>${esc(e.type||'Plan')}</small></div>`).join('')}${c.events.length>3?`<em>+${c.events.length-3} kayıt daha</em>`:''}</article>`).join('')}</div></section>`;
}
function calendar(){ return adminOnly(()=>{ const rows=loadEvents(); const sync=syncState(); return layout(`<section class="adminRepairHero"><div><span class="badge green">🛡️ v4.0.5 • Yayın Takvimi ve Kapaklar</span><h1>📅 Yayın Takvimi Yönetimi</h1><p>Yönetim paneli kutuları toparlandı, takvim artık liste yerine gerçek takvim kutuları şeklinde görünür. Kayıt, silme ve Supabase yenileme akışı korunur.</p><small class="muted">Veri durumu: ${esc(sync.status||sync.mode)}</small></div><div class="actions"><button class="btn secondary" type="button" data-refresh-calendar>Supabase Takvimi Yenile</button><a class="btn secondary" href="/yayin-takvimi">Public Takvimi Aç</a></div></section><section class="adminCalendarLayout"><form class="panel formGrid adminCalendarForm" data-event-form><h2 class="full">➕ Yayın Planı Ekle</h2><label class="field">Tarih<input class="input" type="date" name="date" required></label><label class="field">Saat<input class="input" name="time" value="20:00"></label><label class="field">Tür<select name="type"><option>Ana Yayın</option><option>Video</option><option>Canlı Yayın</option><option>Plan</option></select></label><label class="field full">Oyun / Seri<input class="input" name="gameTitle" required placeholder="Oyun adı veya seri adı"></label><label class="field">Bölüm<input class="input" name="episodeNumber" placeholder="2. Bölüm"></label><label class="field full">Video URL<input class="input" name="videoUrl" placeholder="https://youtube.com/..."></label><div class="full"><button class="btn primary" type="submit">Yayını Kalıcı Kaydet</button></div></form>${adminCalendarBoard(rows)}</section><section class="panel calendarListPanel"><div class="sectionHead compact"><div><h2>📌 Kayıtlı Yayınlar</h2><p>Takvimdeki tüm yayınlar burada hızlı silme için listelenir.</p></div></div><div class="miniList calendarEventList">${rows.length?rows.map((e,i)=>`<article class="event"><span class="pill">${esc(e.date||'Tarih yok')} • ${esc(e.time||'20:00')} • ${esc(e.type||'Yayın')}</span><h3>${esc(eventDisplayTitle(e))}</h3><p>${esc(e.type||'Yayın')} ${e.videoUrl?'• Video bağlantısı hazır':''}</p><button class="btn danger" data-delete-event="${i}">Sil</button></article>`).join(''):'<div class="empty">Henüz yayın kaydı yok. Sol taraftan ilk yayını ekle.</div>'}</div></section>`); }); }
function updateNotes(){ return adminOnly(()=>{ const rows=loadNotes(); const sync=syncState(); return layout(`<div class="sectionHead"><div><h2>Güncelleme Notları</h2><p>Notlar Supabase <b>site_update_notes</b> tablosundan okunur/yazılır. Local güvenli mod korunur.</p><small class="muted">Veri durumu: ${esc(sync.status||sync.mode)}</small></div><div class="actions"><button class="btn secondary" type="button" data-refresh-notes>Supabase Notlarını Yenile</button></div></div><section class="panels"><form class="panel formGrid" data-note-form><label class="field">Sürüm<input class="input" name="version" value="v4.0.5"></label><label class="field">Durum<select name="status"><option>Tamamlandı</option><option>Planlandı</option></select></label><label class="field full">Başlık<input class="input" name="title" required placeholder="Güncelleme başlığı"></label><label class="field full">Özet<textarea name="summary" required placeholder="Bu sürümde yapılanları yaz..."></textarea></label><div class="full"><button class="btn primary" type="submit">Notu Kalıcı Kaydet</button></div></form><div class="panel"><h2>Kayıtlı Notlar</h2><div class="miniList">${rows.map((n,i)=>`<article class="note"><span class="pill ${String(n.status).includes('Plan')?'amber':'green'}">${esc(n.version||VERSION)} • ${esc(n.status||'Tamamlandı')}</span><h3>${esc(n.title)}</h3><p>${esc(n.summary||n.description||'')}</p><button class="btn danger" data-delete-note="${i}">Sil</button></article>`).join('')}</div></div></section>`); }); }
function maintenance(){ return adminOnly(()=>{ const m=loadMaintenance(); const sync=syncState(); return layout(`<div class="sectionHead"><div><h2>Bakım Modu</h2><p>Bakım modu Supabase <b>site_runtime_config.maintenance_mode</b> kaydına kalıcı yazılır. Güncelleme/fix sonrası sıfırlanmaz; kullanıcılar animasyonlu bakım ekranı görür.</p><small class="muted">Veri durumu: ${esc(sync.status||sync.mode)}</small></div><div class="actions"><button class="btn secondary" type="button" data-refresh-maintenance>Supabase Bakımı Yenile</button></div></div><form class="panel formGrid" data-maint-form><label class="field">Durum<select name="enabled"><option value="false" ${!m.enabled?'selected':''}>Kapalı</option><option value="true" ${m.enabled?'selected':''}>Açık</option></select></label><label class="field">Yüzde<input class="input" type="number" min="0" max="100" name="percent" value="${esc(m.percent||0)}"></label><label class="field full">Mesaj<input class="input" name="message" value="${esc(m.message||'Hayatımız Oyun kısa süreli bakımda.')}"></label><label class="field full">Tahmini Açılış<input class="input" name="eta" value="${esc(m.eta||'')}"></label><div class="full actions"><button class="btn primary" type="submit">💾 Supabase’ye Kalıcı Kaydet</button><button type="button" class="btn secondary" data-action="maintenance-off">Bakımı Kapat</button></div></form><section class="panel" style="margin-top:16px"><h2>Önizleme</h2><p><b>Durum:</b> ${m.enabled?'<span class="pill red">Açık - ziyaretçi kullanıcı bakım ekranı görür</span>':'<span class="pill green">Kapalı - site normal açılır</span>'}</p><p>${esc(m.message||'Mesaj yok')}</p><p class="muted">${esc(m.eta||'Tahmini açılış girilmedi')} • ${esc(m.percent||0)}%</p></section>`); }); }
function notFound(){ return layout(`<section class="panel"><h1>Sayfa bulunamadı</h1><p class="muted">Bu rota stabil kabukta bulunamadı.</p><a class="btn primary" href="/ana-sayfa">Ana Sayfaya Dön</a></section>`); }

function publicStatusPage(){
  const games=loadGames();
  const model=buildArchiveModel(games);
  const notes=loadNotes();
  const events=loadEvents();
  const maintenance=loadMaintenance();
  const sync=syncState();
  const checks=[
    ['🏠 Ana Sayfa','Hazır','Profesyonel vitrin, arama, hızlı menü ve güncelleme paneli çalışıyor.'],
    ['🎮 Oyun Arşivi','Hazır','Arama, filtre, koleksiyon sayacı ve alfabetik sıralama arşiv içinde.'],
    ['🎬 Seriler','Hazır','Tüm seriyi izle, seri içi oyun listesi ve sıralama korunuyor.'],
    ['▶️ Siteden İzle','Hazır','YouTube video/playlist oynatıcı ve kalite tercihi güvenli modda.'],
    ['📘 Rehberler','Hazır','Site rehberi ve yetkili rehberi public kullanıcıya açık.'],
    ['🛠️ Bakım Modu', maintenance.enabled?'Açık':'Kapalı', maintenance.enabled?'Ziyaretçi bakım ekranı görür; yetkili bypass korunur.':'Site public kullanıma açık görünüyor.'],
    ['💾 Veri Durumu', sync.status||sync.mode, sync.message||'Supabase yoksa local güvenli mod çalışır.'],
    ['🛡️ Boş Ekran Koruması','Aktif','JS hata verse bile güvenli hata ekranı ve HTML açılışı devrede.']
  ];
  return layout(`<section class="archiveHero statusHero"><div><span class="badge green">🛠️ ${VERSION} • Site Durumu</span><h1>📡 Site Durumu</h1><p>Bu sayfa Supabase veri sağlığı, admin yetkileri, oyun kayıtları, seri yönetimi, bakım modu ve güvenli yerel mod durumunu tek ekranda takip eder.</p></div><div class="actions"><a class="btn primary" href="/ana-sayfa">🏠 Ana Sayfa</a><a class="btn secondary" href="/oyun-arsivi">🎮 Arşiv</a><a class="btn secondary" href="/site-rehberi">📘 Rehber</a></div></section><section class="archiveStats"><article><b>${games.length}</b><span>🎮 Oyun</span></article><article><b>${model.series.size}</b><span>🎬 Seri</span></article><article><b>${model.episodeTotal}</b><span>▶️ Bölüm</span></article><article><b>${notes.length}</b><span>📝 Not</span></article></section><section class="publicStatusGrid">${checks.map(([title,status,text])=>`<article class="statusCheckCard"><span class="pill ${String(status).includes('Hazır')||String(status).includes('Aktif')||String(status).includes('Kapalı')?'green':'amber'}">${esc(status)}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</section><section class="panel publishChecklist"><h2>✅ Yayın Öncesi Kontrol Listesi</h2><div class="roadList"><span class="done">Ana sayfa boş ekrana düşmez</span><span class="done">Mobil/tablet/masaüstü buton taşmaları azaltıldı</span><span class="done">Kayıt ol / giriş yap / profil / çıkış bağlantıları korunuyor</span><span class="done">Yönetim bağlantıları yetkisiz kullanıcıya gizli</span><span class="done">Bakım modu açıkken yetkili giriş bypass korunuyor</span><span class="done">Güncelleme notları, status ve sürüm etiketi v4.0.5 olarak güncel</span></div></section><section class="panel"><h2>📝 Son Güncellemeler</h2><div class="miniList">${notes.slice(0,6).map(n=>`<article class="note"><span class="pill ${String(n.status).includes('Plan')?'amber':'green'}">${esc(n.version||VERSION)} • ${esc(n.status||'Tamamlandı')}</span><h3>${esc(n.title)}</h3><p>${esc(n.summary||n.description||'')}</p></article>`).join('')}</div></section><section class="panel"><h2>📅 Takvim Özeti</h2>${events.length?events.slice(0,4).map(e=>`<p class="activityItem">📅 ${esc(e.title||'Yayın')} • ${esc(e.date||'Tarih yok')} ${esc(e.time||'')}</p>`).join(''):'<p class="muted">Henüz yayın kaydı yok. Yönetimden takvim eklenebilir.</p>'}</section>`);
}

function dataHealthPage(){ return adminOnly(()=>{
  const games=loadGames();
  const events=loadEvents();
  const notes=loadNotes();
  const users=loadUsers();
  const model=buildArchiveModel(games);
  const health=loadJson(STORAGE.dataHealth,{});
  const missingCover=games.filter(g=>!String(g.cover||g.coverUrl||g.cover_url||'').trim() || String(g.cover||'').includes('hayatimiz-kapak')).slice(0,8);
  const missingDate=games.filter(g=>!String(g.releaseDate||g.release_date||'').trim()).slice(0,8);
  const eventMissingCover=events.filter(e=>!String(e.cover||e.coverUrl||'').trim()).slice(0,8);
  const backup={version:VERSION,createdAt:new Date().toISOString(),games,events,notes,users,maintenance:loadMaintenance(),sync:syncState()};
  const backupSize=Math.round(JSON.stringify(backup).length/1024);
  return layout(`<section class="adminRepairHero dataHealthHero"><div><span class="badge green">💾 ${VERSION} • Veri Sağlığı Merkezi</span><h1>💾 Supabase Veri Sağlığı ve Yedekleme</h1><p>Oyunlar, kullanıcılar, takvim, güncelleme notları ve bakım kaydı tek ekranda kontrol edilir. Mevcut oyunlar sen silmeden silinmez; yedek alma aracı canlı veriyi korumak için hazırdır.</p><small class="muted">Son kontrol: ${esc(health.checkedAt||'Henüz kontrol edilmedi')} • ${esc(health.message||'Kontrol için butona bas.')}</small></div><div class="actions"><button class="btn primary" type="button" data-admin-health>Supabase Sağlık Kontrolü</button><button class="btn secondary" type="button" data-backup-export>JSON Yedek İndir</button><a class="btn secondary" href="/status">Public Durum</a></div></section><section class="archiveStats"><article><b>${games.length}</b><span>🎮 Oyun</span><small>Silinme korumalı</small></article><article><b>${model.series.size}</b><span>🎬 Seri</span><small>Otomatik gruplama</small></article><article><b>${events.length}</b><span>📅 Takvim</span><small>Kapak eşleşmeli</small></article><article><b>${users.length}</b><span>👥 Kullanıcı</span><small>Tek kurucu kilidi</small></article><article><b>${backupSize} KB</b><span>☁️ Yedek</span><small>Manuel dışa aktarım</small></article></section><section class="panels dataHealthGrid"><article class="panel"><h2>🛡️ Koruma Durumu</h2><div class="roadList"><span class="done">Mevcut oyunlar manuel onay olmadan silinmez</span><span class="done">Boş/daha az liste gerçek listenin üstüne yazılamaz</span><span class="done">Toplu oyun silme kapalı</span><span class="done">Bakım modu ve kullanıcı/yetki kayıtları güncellemede korunur</span><span class="done">Sürüm etiketi v4.0.5 olarak eşitlendi</span></div></article><article class="panel"><h2>🚨 Eksik Kapak Kontrolü</h2>${missingCover.length?missingCover.map(g=>`<p class="activityItem">🖼️ ${esc(g.title)} • Kapak kontrol edilmeli</p>`).join(''):'<p class="muted">Kapak sorunu görünmüyor.</p>'}</article><article class="panel"><h2>🗓️ Eksik Tarih Kontrolü</h2>${missingDate.length?missingDate.map(g=>`<p class="activityItem">🗓️ ${esc(g.title)} • Çıkış tarihi eksik</p>`).join(''):'<p class="muted">Tarih sorunu görünmüyor.</p>'}</article><article class="panel"><h2>📅 Takvim Kapak Kontrolü</h2>${eventMissingCover.length?eventMissingCover.map(e=>`<p class="activityItem">📅 ${esc(eventDisplayTitle(e))} • Oyun kapağı eşleştirilecek</p>`).join(''):'<p class="muted">Takvim kapakları hazır görünüyor.</p>'}</article></section><section class="panel"><h2>🔧 Tek Tuş Kontrol Araçları</h2><p class="muted">Bu sayfa veri silmez. Sadece sağlık kontrolü yapar, eksikleri gösterir ve manuel yedek indirir.</p><div class="actions"><button class="btn primary" type="button" data-admin-health>Sağlık Kontrolünü Yenile</button><button class="btn secondary" type="button" data-supabase-refresh>Supabase Verilerini Yenile</button><button class="btn secondary" type="button" data-backup-export>Yedek İndir</button></div></section>`);
}); }

function shouldShowMaintenanceForRoute(p=route()){
  const m=loadMaintenance();
  if(!parseMaintenanceEnabled(m.enabled)) return false;
  // Kurucu/moderatör/editör bakım modunda siteyi ve yönetim panelini görebilir.
  if(isYönetim()) return false;
  // Normal kayıtlı üyeler ve giriş yapmamış ziyaretçiler bakım ekranı görür.
  // Sadece giriş/kayıt sayfaları açık kalır ki yetkili kullanıcı giriş yapabilsin.
  return !isAuthRoute(p);
}
function pageHtml(){ const p=route(); const u=currentUser(); const role=roleValue(u?.role||'', u?.email||''); if(u && (role==='banned' || u.is_active===false) && !isAuthRoute(p)) return bannedZiyaretçi(); if(shouldShowMaintenanceForRoute(p)) return maintenanceZiyaretçi(); if(p==='/'||p==='/ana-sayfa') return home(); if(p.startsWith('/oyun-arsivi')) return archive(); if(p.startsWith('/oyun-detay') || p.startsWith('/oyun')) return gameDetailPage(); if(p.startsWith('/izle')) return watchPage(); if(p.startsWith('/alfabetik-siralama')) return alphabetPage(); if(p.startsWith('/koleksiyonlar')) return collectionsPage(); if(p.startsWith('/seriler')) return seriesPage(); if(p==='/yayin-takvimi'||p==='/takvim') return publicCalendarPage(); if(p==='/status'||p==='/durum') return publicStatusPage(); if(p==='/site-rehberi') return siteGuidePage(); if(p==='/yetkili-rehberi') return authorityGuidePage(); if(p==='/giris-yap'||p==='/auth/login') return loginPage(); if(p==='/kayit-ol'||p==='/auth/register') return registerPage(); if(p==='/hesabim') return accountPage(); if(p==='/yonetim') return admin(); if(p==='/yonetim/not-defteri-oyun-ekle') return noteGameImportPage(); if(p==='/yonetim/oyun-ekle'||p==='/yonetim/oyun-duzenle') return gameForm(); if(p==='/yonetim/mevcut-oyunlar') return currentGamesYönetim(); if(p==='/yonetim/seriler') return seriesManager(); if(p==='/yonetim/yayin-takvimi') return calendar(); if(p==='/yonetim/guncelleme-notlari' || p==='/guncellemeler') return updateNotes(); if(p==='/yonetim/bolum-takibi') return episodeTracker(); if(p==='/yonetim/bakim-modu') return maintenance(); if(p==='/yonetim/kullanicilar') return usersPage(); if(p==='/yonetim/veri-sagligi') return dataHealthPage(); return notFound(); }
function bind(){
  document.body.addEventListener('click', e=>{
    const a=e.target.closest('a[href]'); if(a && a.origin===location.origin && !a.hasAttribute('download') && a.target !== '_blank' && !a.dataset.newTab){ e.preventDefault(); setRoute(a.pathname + a.search); return; }
    if(e.target.closest('[data-supabase-refresh]')){ e.preventDefault(); refreshSiteDataFromSupabase({force:true}).catch(err=>{ console.error(err); toast('Supabase yenileme hatası.'); }); return; }
    if(e.target.closest('[data-users-sync-dashboard]')){ e.preventDefault(); setRoute('/yonetim/kullanicilar'); setTimeout(()=>refreshUsersPanel().catch(()=>{}),150); return; }
    if(e.target.closest('[data-admin-health]')){ e.preventDefault(); checkAdminDataHealth({force:true}).catch(err=>{ console.error(err); toast('Veri sağlığı kontrol edilemedi.'); }); return; }
    if(e.target.closest('[data-backup-export]')){ e.preventDefault(); const backup={version:VERSION,createdAt:new Date().toISOString(),games:loadGames(),events:loadEvents(),notes:loadNotes(),users:loadUsers(),maintenance:loadMaintenance(),sync:syncState()}; const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`hayatimiz-oyun-${VERSION}-yedek.json`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),500); toast('Yedek dosyası indirildi.'); return; }
    if(e.target.closest('[data-refresh-calendar]')){ e.preventDefault(); refreshEventsFromSupabase({force:true}).catch(()=>{}); return; }
    if(e.target.closest('[data-refresh-notes]')){ e.preventDefault(); refreshNotesFromSupabase({force:true}).catch(()=>{}); return; }
    if(e.target.closest('[data-maintenance-retry]')){ e.preventDefault(); for(const key of MAINTENANCE_KEYS) localStorage.removeItem(key); refreshSiteRuntimeFromSupabase({force:true}).then(()=>setRoute('/ana-sayfa')).catch(()=>setRoute('/ana-sayfa')); return; }
    if(e.target.closest('[data-refresh-maintenance]')){ e.preventDefault(); refreshSiteRuntimeFromSupabase({force:true}).catch(()=>{}); return; }
    const metaBtn=e.target.closest('[data-meta-action]'); if(metaBtn){ e.preventDefault(); const form=metaBtn.closest('[data-game-form]'); const action=metaBtn.getAttribute('data-meta-action'); (async()=>{ if(action==='local'){ const title=String(form?.elements?.title?.value||'').trim(); if(!title){ toast('Önce oyun adını yaz.'); return; } fillMetaToForm(form, mapMeta({meta:localGameMetaCandidate(title), source:'Yerel güvenli bilgi'}, title), 'safe'); toast('Yerel güvenli bilgi uygulandı.'); return; } await resolveMetaForForm(form, action); })().catch(err=>{ console.error(err); toast('Bilgi çekilemedi, yerel güvenli seçenek denenebilir.'); }); return; }
    const ytBtn=e.target.closest('[data-youtube-action]'); if(ytBtn){ e.preventDefault(); const form=ytBtn.closest('[data-game-form]'); syncPlaylistForForm(form).catch(err=>{ console.error(err); toast(err.message || 'Oynatma listesi bölümleri çekilemedi.'); }); return; }
    const syncBtn=e.target.closest('[data-sync-game-playlist]'); if(syncBtn){ e.preventDefault(); syncPlaylistForGame(syncBtn.dataset.syncGamePlaylist).catch(err=>{ console.error(err); toast(err.message || 'Oynatma listesi çekilemedi.'); }); return; }
    const progressBtn=e.target.closest('[data-progress-game]'); if(progressBtn){ e.preventDefault(); const id=progressBtn.dataset.progressGame; const delta=Number(progressBtn.dataset.delta||0); const game=loadGames().find(g=>String(g.id)===String(id)); if(game){ const nextWatched=Number(game.watchedEpisodeCount||0)+delta; setWatchedForGame(id, nextWatched); const updated=loadGames().find(g=>String(g.id)===String(id)); addWatchHistory(updated||game, Math.max(0,nextWatched), 'Bölüm takip paneli'); toast('Bölüm ilerlemesi güncellendi.'); render(); } return; }
    const moveBtn=e.target.closest('[data-move-game]'); if(moveBtn){ e.preventDefault(); const next=moveGameOrder(moveBtn.dataset.moveGame, Number(moveBtn.dataset.delta||0)); const changed=(Array.isArray(next)?next:[]).map((g,i)=>({...g, sortOrder:i, seriesOrder:Number(g.seriesOrder ?? g.sortOrder ?? i)})); persistSeriesUpdateToSupabase('Genel sıralama', changed).catch(err=>console.warn('Supabase genel sıralama yerel modda kaldı:', err.message)); toast('Sıralama güncellendi.'); render(); return; }
    const rowUp=e.target.closest('[data-series-row-up]'); if(rowUp){ e.preventDefault(); const row=rowUp.closest('[data-series-dnd-item]'); const prev=row?.previousElementSibling; if(row && prev){ row.parentNode.insertBefore(row, prev); renumberSeriesEditor(row.closest('form')); } return; }
    const rowDown=e.target.closest('[data-series-row-down]'); if(rowDown){ e.preventDefault(); const row=rowDown.closest('[data-series-dnd-item]'); const next=row?.nextElementSibling; if(row && next){ row.parentNode.insertBefore(next, row); renumberSeriesEditor(row.closest('form')); } return; }
    const selectAllSeries=e.target.closest('[data-series-select-all]'); if(selectAllSeries){ e.preventDefault(); const form=selectAllSeries.closest('form'); form?.querySelectorAll('input[type="checkbox"][name="gameIds"]').forEach(cb=>{ cb.checked=true; cb.closest('[data-series-dnd-item]')?.classList.add('selected'); }); renumberSeriesEditor(form); toast('Seri için tüm oyunlar seçildi.'); return; }
    const clearSeries=e.target.closest('[data-series-clear]'); if(clearSeries){ e.preventDefault(); const form=clearSeries.closest('form'); form?.querySelectorAll('input[type="checkbox"][name="gameIds"]').forEach(cb=>{ cb.checked=false; cb.closest('[data-series-dnd-item]')?.classList.remove('selected'); }); renumberSeriesEditor(form); toast('Seri seçimi temizlendi.'); return; }
    const quickSeriesSort=e.target.closest('[data-series-sort-preview]'); if(quickSeriesSort){ e.preventDefault(); sortSeriesEditorRows(quickSeriesSort.closest('form'), quickSeriesSort.dataset.seriesSortPreview || 'az'); toast('Seçili seri oyunları yeniden sıralandı.'); return; }
    const delGame=e.target.closest('[data-delete-game]'); if(delGame){ const id=delGame.dataset.deleteGame; const game=loadGames().find(g=>String(g.id)===String(id)); const code=prompt(`Bu işlem sadece sen manuel silersen çalışır. Silmek için oyun adını aynen yaz:\n${game?.title||id}`); if(code && game && code.trim()===String(game.title||'').trim()){ const ok=deleteGame(id,{explicitDelete:true}); deleteGameRemote(id,{explicitDelete:true}).catch(err=>{ console.warn('Supabase silme yerel modda kaldı:', err.message); }); if(ok) toast('Oyun manuel onayla silindi.'); render(); }else{ toast('Silme iptal edildi. Mevcut oyunlar korundu.'); } return; }
    if(e.target.closest('[data-delete-all-games]')){ toast('Toplu silme güvenlik için kapatıldı. Oyunları tek tek silebilirsin.'); return; }
    if(e.target.closest('[data-reset-demo-games]')){ if(confirm('Örnek oyunları geri yüklemek istiyor musun?')){ restoreDemoGames(); toast('Örnek oyunlar geri yüklendi.'); render(); } return; }
    const delEvent=e.target.closest('[data-delete-event]'); if(delEvent){ const rows=loadEvents(); const idx=Number(delEvent.dataset.deleteEvent); const event=rows[idx]; rows.splice(idx,1); saveEvents(rows); deleteEventRemote(event).catch(err=>{ console.warn('Supabase takvim silme yerel modda kaldı:', err.message); }); toast('Yayın silindi.'); render(); return; }
    const delNote=e.target.closest('[data-delete-note]'); if(delNote){ const rows=loadNotes(); const idx=Number(delNote.dataset.deleteNote); const note=rows[idx]; rows.splice(idx,1); saveNotes(rows); deleteNoteRemote(note).catch(err=>{ console.warn('Supabase not silme yerel modda kaldı:', err.message); }); toast('Not silindi.'); render(); return; }
    if(e.target.closest('[data-action="maintenance-off"]')){ const stamp=new Date().toISOString(); const m={...loadMaintenance(), enabled:false, percent:0, source:'admin-form', updatedAt:stamp, updated_at:stamp, adminBypass:true}; saveMaintenance(m); persistMaintenanceToSupabase(m).then(()=>refreshSiteRuntimeFromSupabase({force:false})).catch(err=>{ console.warn('Supabase bakım kapatma yerel modda kaldı:', err.message); }); toast('Bakım modu kapatıldı.'); render(); return; }
    if(e.target.closest('[data-action="logout"]')){ signOut(); toast('Çıkış yapıldı.'); setRoute('/ana-sayfa'); return; }
    if(e.target.closest('[data-action="hard-refresh"]')) location.reload();
    if(e.target.closest('[data-clear-watch-history]')){ e.preventDefault(); clearCurrentWatchHistory(); toast('İzleme geçmişi temizlendi.'); render(); return; }
    const quality=e.target.closest('[data-quality]'); if(quality){ saveWatchSettings({quality:quality.dataset.quality}); toast(`Kalite tercihi ${quality.dataset.quality} olarak kaydedildi.`); render(); return; }
    const watchMark=e.target.closest('[data-watch-mark]'); if(watchMark){ e.preventDefault(); const id=watchMark.dataset.watchMark; const ep=Number(watchMark.dataset.ep||0); setWatchedForGame(id, ep); const game=loadGames().find(g=>String(g.id)===String(id)); const episode=loadEpisodes(id).find(x=>Number(x.number)===ep); if(game){ addWatchHistory({...game, watchedEpisodeCount:ep}, ep, episode?.title||''); persistGameToSupabase({...game, watchedEpisodeCount:ep}, id).catch(()=>{}); } toast('İzleme ilerlemesi ve profil geçmişi kaydedildi.'); render(); return; }
    const userAdd=e.target.closest('[data-user-add-form]'); if(userAdd){ e.preventDefault(); const fd=new FormData(userAdd); const email=String(fd.get('email')||'').trim().toLowerCase(); const displayName=String(fd.get('displayName')||'').trim() || email; let role=roleValue(fd.get('role')||'user', email); if(!email){ toast('E-posta yazmalısın.'); return; } if(role==='kurucu' && email!==ADMIN_EMAILS[0]){ role='user'; toast('Kurucu rolü sadece ana kurucu hesabına verilir. Kullanıcı Üye olarak kaydedildi.'); } let users=loadUsers().filter(u=>String(u.email||'').toLowerCase()!==email); const user={id:'local-'+Date.now(),email,displayName,role,is_active:role!=='banned',source:'Tarayıcı',createdAt:new Date().toISOString()}; users.unshift(user); saveUsers(users); userAdd.reset(); toast(`${displayName} tabloya ${roleLabel(role,email)} olarak eklendi.`); apiJson('user-role-set',{adminToken:sessionToken(),email,displayName,role}).then(()=>refreshUsersPanel()).then(()=>toast('Yetki Supabase tablosuna da kaydedildi.')).catch(err=>{ console.warn('Supabase yetki kaydı yerel modda kaldı:', err.message); render(); }); return; }
    if(e.target.closest('[data-refresh-users]')){ e.preventDefault(); refreshUsersPanel(); return; }
    const roleSave=e.target.closest('[data-user-role-save]'); if(roleSave){ const row=roleSave.closest('[data-user-id]'); const id=row?.dataset?.userId||''; const email=String(row?.dataset?.userEmail||row?.querySelector('small')?.textContent?.split('•')?.[0]?.trim()||'').toLowerCase(); let role=roleValue(row?.querySelector('[data-role-select]')?.value||'user', email); if(role==='kurucu' && email!==ADMIN_EMAILS[0]){ toast('Kurucu rolü sadece ana kurucu hesabında kalabilir.'); refreshUsersPanel().catch(()=>render()); return; } const rowSource=String(row?.dataset?.userSource||''); const isRemoteUser=rowSource.includes('Supabase') || rowSource.includes('site_users') || rowSource.includes('Yetki'); if(!isRemoteUser || id.startsWith('local') || id==='current-session'){ let users=loadUsers(); if(!users.some(u=>String(u.email).toLowerCase()===email)) users.push({id:id||('local-'+Date.now()),email,displayName:email,role,source:'Yerel Tablo'}); users=users.map(u=>String(u.id)===id||String(u.email).toLowerCase()===email?{...u,role,is_active:role!=='banned'}:u); saveUsers(users); const session=currentUser(); if(session && String(session.email).toLowerCase()===email){ localStorage.setItem(STORAGE.session, JSON.stringify({...session,role})); } toast(`Yetki ${roleLabel(role,email)} olarak kaydedildi. Supabase güncelleniyor...`); apiJson('user-role-set',{adminToken:sessionToken(),ownerEmail:currentUser()?.email||'',userId:id,email,displayName:row?.querySelector('b')?.textContent||email,role}).then(()=>refreshUsersPanel()).then(()=>toast(`Supabase yetkisi ${roleLabel(role,email)} olarak güncellendi.`)).catch(()=>render()); } else { apiJson('user-role-set',{adminToken:sessionToken(),ownerEmail:currentUser()?.email||'',userId:id,email,displayName:row?.querySelector('b')?.textContent||email,role}).then(()=>refreshUsersPanel()).then(()=>toast(`Supabase yetkisi ${roleLabel(role,email)} olarak güncellendi.`)).catch(err=>toast('Yetki güncellenemedi: '+err.message)); } return; }
    const userDel=e.target.closest('[data-user-delete]'); if(userDel){ const row=userDel.closest('[data-user-id]'); const id=row?.dataset?.userId||''; const email=String(row?.dataset?.userEmail||row?.querySelector('small')?.textContent?.split('•')?.[0]?.trim()||'').toLowerCase(); if(email===ADMIN_EMAILS[0]){ toast('Ana kurucu hesabı silinemez.'); return; } if(!confirm('Kullanıcıyı silmek istiyor musun? Supabase Auth + site_users + yetki kaydı temizlenecek.')) return; const rowSource=String(row?.dataset?.userSource||''); const isRemoteUser=rowSource.includes('Supabase') || rowSource.includes('site_users') || rowSource.includes('Yetki') || id.startsWith('auth-') || id.startsWith('authority-'); saveUsers(loadUsers().filter(u=>String(u.id)!==id && String(u.email).toLowerCase()!==email)); if(!isRemoteUser || id.startsWith('local') || id==='current-session'){ toast('Yerel kullanıcı silindi.'); render(); } apiJson('user-delete',{adminToken:sessionToken(),ownerEmail:currentUser()?.email||'',userId:id,email}).then(()=>refreshUsersPanel()).then(()=>toast('Kullanıcı Supabase kayıtlarından silindi.')).catch(err=>{ toast('Kullanıcı Supabase’den silinemedi: '+err.message); render(); }); return; }
    const storyBtn=e.target.closest('[data-story-action]'); if(storyBtn){ const form=storyBtn.closest('form'); if(form){ const game={title:form.elements?.title?.value, genre:form.elements?.genre?.value, seriesName:form.elements?.seriesName?.value}; setField(form,'storyText',professionalStoryText(game),false); toast('Profesyonel hikaye metni oluşturuldu.'); } return; }
  });
  document.body.addEventListener('dragstart', e=>{ const row=e.target.closest('[data-series-dnd-item]'); if(row){ row.classList.add('dragging'); e.dataTransfer?.setData('text/plain', row.dataset.gameId||''); } });
  document.body.addEventListener('dragend', e=>{ const row=e.target.closest('[data-series-dnd-item]'); if(row){ row.classList.remove('dragging'); renumberSeriesEditor(row.closest('form')); } });
  document.body.addEventListener('dragover', e=>{ const list=e.target.closest('[data-series-dnd-list]'); if(!list) return; e.preventDefault(); const dragging=list.querySelector('.dragging'); const target=e.target.closest('[data-series-dnd-item]'); if(dragging && target && dragging!==target){ const rect=target.getBoundingClientRect(); const after=(e.clientY-rect.top) > rect.height/2; list.insertBefore(dragging, after?target.nextSibling:target); } });
  document.body.addEventListener('drop', e=>{ const list=e.target.closest('[data-series-dnd-list]'); if(list){ e.preventDefault(); renumberSeriesEditor(list.closest('form')); } });
  document.body.addEventListener('change', e=>{
    const row=e.target.closest('[data-series-dnd-item]');
    if(row && (e.target.matches('input[type="checkbox"][name="gameIds"]') || e.target.matches('[data-series-order-input]'))){
      row.classList.toggle('selected', !!row.querySelector('input[type="checkbox"][name="gameIds"]')?.checked);
      renumberSeriesEditor(row.closest('form'));
    }
  });
  document.body.addEventListener('submit', e=>{
    const ssf=e.target.closest('[data-series-sort-form]'); if(ssf){ e.preventDefault(); const fd=new FormData(ssf); setRoute('/seriler?sort='+encodeURIComponent(String(fd.get('sort')||'az'))); return; }
    const sf=e.target.closest('[data-series-form]'); if(sf){ e.preventDefault(); const fd=new FormData(sf); const oldSeries=String(fd.get('oldSeriesName')||'').trim(); const newSeries=String(fd.get('seriesName')||'').trim(); if(!newSeries){ toast('Seri adı boş olamaz.'); return; } const selectedRows=selectedSeriesRowsFromForm(sf); const selected=new Set(selectedRows.map(r=>String(r.id))); const orderMap=new Map(selectedRows.map((r,i)=>[String(r.id), i])); if(!selected.size){ toast('Seriye en az bir oyun seçmelisin.'); return; } const rows=loadGames(); const updates=[]; const next=rows.map((g,i)=>{ const id=String(g.id); const wasIn=String(g.seriesName||'Serisiz Oyunlar')===oldSeries; const isIn=selected.has(id); if(isIn){ const order=Number(orderMap.get(id) ?? i); const patched=normalizeGame({...g, seriesName:newSeries, collectionName:newSeries, seriesOrder:order, sortOrder:order}, i); updates.push(patched); return patched; } if(wasIn && oldSeries){ const patched=normalizeGame({...g, seriesName:'', collectionName:g.genre||'Genel Koleksiyon', seriesOrder:9999, sortOrder:Number(g.sortOrder||i)}, i); updates.push(patched); return patched; } return normalizeGame(g,i); }); saveGames(next); persistSeriesUpdateToSupabase(newSeries, updates).then(()=>toast('Seri Supabase ile kalıcı kaydedildi.')).catch(err=>{ console.warn('Supabase seri kayıt yerel modda kaldı:', err.message); toast('Seri yerel kaydedildi, Supabase bağlantısı sonra yenilenebilir.'); }); setRoute('/yonetim/seriler?series='+encodeURIComponent(newSeries)); return; }
    const userFilter=e.target.closest('[data-user-filter-form]'); if(userFilter){ e.preventDefault(); const fd=new FormData(userFilter); const qs=new URLSearchParams(); for(const key of ['user_q','user_role']){ const val=String(fd.get(key)||'').trim(); if(val && val!=='Tümü') qs.set(key,val); } setRoute('/yonetim/kullanicilar'+(qs.toString()?('?'+qs.toString()):'')); return; }
    const search=e.target.closest('[data-search-form]'); if(search){ e.preventDefault(); const fd=new FormData(search); const qs=new URLSearchParams(); for(const key of ['q','status','genre','series','tag','sort']){ const val=String(fd.get(key)||'').trim(); if(val && val!=='Tümü') qs.set(key,val); } setRoute('/oyun-arsivi'+(qs.toString()?('?'+qs.toString()):'')); return; }
    const login=e.target.closest('[data-login-form]'); if(login){ e.preventDefault(); (async()=>{ const fd=new FormData(login); const email=String(fd.get('email')||'').trim().toLowerCase(); const password=String(fd.get('password')||''); try{ const data=await apiJson('login',{email,password}); const u=data.user||{}; localStorage.setItem(STORAGE.session, JSON.stringify({email:u.email||email,displayName:u.full_name||u.displayName||'Hayatımız Oyun',role:isYönetimEmail(email)?'owner':(u.role||'user'),adminToken:data.adminToken||''})); toast('Supabase giriş başarılı.'); await refreshGamesFromSupabase({force:false}); setRoute(isYönetimEmail(email)?'/yonetim':'/ana-sayfa'); return; }catch(err){ console.warn('Supabase login yok, yerel deneniyor:', err.message); } let users=loadUsers(); let user=users.find(u=>String(u.email).toLowerCase()===email); if(!user && isYönetimEmail(email)){ user={id:'user-'+Date.now(),email,displayName:'Hayatımız Oyun Yönetim',password,role:'owner',createdAt:new Date().toISOString()}; users.push(user); saveUsers(users); } if(!user || String(user.password||'')!==password){ toast('E-posta veya şifre hatalı. Kayıt olmayı dene.'); return; } localStorage.setItem(STORAGE.session, JSON.stringify({email:user.email,displayName:user.displayName,role:isYönetimEmail(user.email)?'owner':(user.role||'user'),adminToken:user.adminToken||''})); toast('Yerel giriş başarılı. Supabase için şema ve kayıt gerekebilir.'); setRoute(isYönetimEmail(user.email)?'/yonetim':'/ana-sayfa'); })(); return; }
    const register=e.target.closest('[data-register-form]'); if(register){ e.preventDefault(); (async()=>{ const fd=new FormData(register); const email=String(fd.get('email')||'').trim().toLowerCase(); const displayName=String(fd.get('displayName')||'').trim(); const password=String(fd.get('password')||''); if(password.length<3){ toast('Şifre en az 3 karakter olsun.'); return; } let adminToken=''; let remoteUser=null; try{ const data=await apiJson('register',{email,password,fullName:displayName}); adminToken=data.adminToken||''; remoteUser=data.user||null; toast('Supabase kayıt oluşturuldu.'); }catch(err){ console.warn('Supabase kayıt yok, yerel kayıt:', err.message); toast('Yerel kayıt oluşturuldu. Supabase daha sonra bağlanabilir.'); } let users=loadUsers().filter(u=>String(u.email).toLowerCase()!==email); const role=isYönetimEmail(email)?'owner':(remoteUser?.role||'user'); const user={id:remoteUser?.id || 'user-'+Date.now(),email:remoteUser?.email || email,displayName:remoteUser?.full_name || displayName || email, password, role, adminToken, is_active:remoteUser?.is_active !== false, source:remoteUser?'Supabase':'Yerel',createdAt:remoteUser?.created_at || new Date().toISOString()}; users.push(user); saveUsers(users); localStorage.setItem(STORAGE.session, JSON.stringify({email:user.email,displayName:user.displayName,role:user.role,adminToken})); setRoute(isYönetimEmail(user.email)?'/yonetim':'/ana-sayfa'); })(); return; }
    const pf=e.target.closest('[data-profile-form]'); if(pf){ e.preventDefault(); const fd=new FormData(pf); const u=currentUser(); if(!u){ setRoute('/giris-yap'); return; } const displayName=String(fd.get('displayName')||'').trim() || u.displayName || u.email; const next={...u, displayName, updatedAt:new Date().toISOString()}; localStorage.setItem(STORAGE.session, JSON.stringify(next)); const users=loadUsers().map(row=>String(row.email).toLowerCase()===String(u.email).toLowerCase()?{...row, displayName, updatedAt:next.updatedAt}:row); saveUsers(users.length?users:[next]); toast('Profil bilgileri kaydedildi.'); render(); return; }

    const ngf=e.target.closest('[data-notepad-game-form]');
    if(ngf){
      e.preventDefault();
      const box=ngf.querySelector('[data-notepad-result]');
      const games=parseGameNotes(new FormData(ngf).get('notes'));
      if(!games.length){ toast('Not defterinde oyun bulunamadı. Oyun: satırıyla başla.'); if(box) box.innerHTML='<b>Oyun bulunamadı.</b><span>Her kayıt için Oyun: alanı yazmalısın.</span>'; return; }
      if(box) box.innerHTML=`<b>${games.length} oyun algılandı.</b><span>Supabase kaydı başlıyor...</span>`;
      (async()=>{
        const ok=[]; const fail=[];
        for(const game of games){
          try{ await persistGameToSupabase(game, ''); ok.push(game.title); }
          catch(err){ fail.push(`${game.title}: ${err.message||err}`); }
        }
        await refreshGamesFromSupabase({force:false}).catch(()=>{});
        if(box) box.innerHTML=`<b>✅ ${ok.length} başarılı • ❌ ${fail.length} hata</b><span>${ok.map(x=>'Kaydedildi: '+esc(x)).join('<br>')}${fail.length?'<br><br>'+fail.map(x=>'Hata: '+esc(x)).join('<br>'):''}</span>`;
        toast(fail.length ? `${ok.length} oyun kaydedildi, ${fail.length} hata var.` : `${ok.length} oyun Supabase’e kaydedildi.`);
      })();
      return;
    }

    const gf=e.target.closest('[data-game-form]'); if(gf){
      e.preventDefault();
      const fd=new FormData(gf);
      const rows=loadGames();
      const editId=String(fd.get('gameId')||'').trim();
      const title=String(fd.get('title')||'').trim();
      if(!title){ toast('Oyun adı boş olamaz.'); return; }
      const episodeCount=Math.max(0, Number(fd.get('episodeCount')||0));
      const watchedEpisodeCount=Math.max(0, Math.min(episodeCount || 9999, Number(fd.get('watchedEpisodeCount')||0)));
      const payload=normalizeGame({
        id:editId || ((window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : 'game-'+Date.now()), rawgSlug: fd.get('rawgSlug') || slugify(title), title, status:fd.get('status'),
        genre:Array.from(new Set([...(splitText(fd.get('genre'))), ...fd.getAll('genreCheck').map(x=>String(x))])).join(', '),
        seriesName:fd.get('seriesName'), cover:fd.get('cover')||'/assets/hayatimiz-kapak.png', banner:fd.get('banner'),
        releaseDate:bestReleaseDate(fd.get('releaseDate')), platforms:fd.get('platforms'), description:fd.get('description'),
        storyText:String(fd.get('storyText')||'').trim() || professionalStoryText({title, genre:fd.get('genre'), seriesName:fd.get('seriesName')}),
        youtubePlaylistUrl:fd.get('youtubePlaylistUrl'), youtubePlaylistId:fd.get('youtubePlaylistId') || extractYoutubePlaylistId(fd.get('youtubePlaylistUrl')),
        tags:Array.from(new Set([...(splitText(fd.get('tags'))), ...fd.getAll('tagsCheck').map(x=>String(x))])).join(', '),
        rawgId:fd.get('rawgId'), rawgSlug:fd.get('rawgSlug') || slugify(title), steamAppId:fd.get('steamAppId'), score:fd.get('score'),
        metaSource:fd.get('metaSource'), metaCheckedAt:fd.get('metaCheckedAt'), coverSource:fd.get('metaSource'),
        episodeCount, watchedEpisodeCount
      },0);
      let embeddedEpisodes=[];
      try{ const eps=JSON.parse(String(fd.get('episodesJson')||'[]')); if(Array.isArray(eps) && eps.length) embeddedEpisodes=eps.map(ep=>normalizeEpisode({...ep, watched:Number(ep.number)<=Number(payload.watchedEpisodeCount||0)})); }catch{}
      const existingGame=editId ? rows.find(g=>String(g.id)===editId) : null;
      const preservedEpisodes=embeddedEpisodes.length ? embeddedEpisodes : (Array.isArray(existingGame?.episodes) && existingGame.episodes.length ? existingGame.episodes.map(normalizeEpisode) : loadEpisodes(editId || payload.id));
      payload.episodes=preservedEpisodes;
      if(preservedEpisodes.length) payload.episodeCount=Math.max(Number(payload.episodeCount||0), preservedEpisodes.length);
      toast(editId?'Oyun Supabase üzerinde güncelleniyor...':'Oyun direkt Supabase games tablosuna kaydediliyor...');
      persistGameToSupabase(payload, editId)
        .then(()=>refreshGamesFromSupabase({force:false}))
        .then(()=>{ toast(editId?'Oyun Supabase’e güncellendi.':'Oyun Supabase’e kaydedildi ve liste Supabase’den yenilendi.'); setRoute('/yonetim/mevcut-oyunlar'); render(); })
        .catch(err=>{ console.error('Supabase oyun kaydı başarısız:', err); saveSyncState({mode:'supabase-error', status:'Supabase kayıt hatası', message:err.message || 'Oyun Supabase’e kaydedilemedi.'}); toast('Oyun kaydedilmedi: '+(err.message||'Supabase hatası')); render(); });
      return;
    }
    const ef=e.target.closest('[data-event-form]'); if(ef){ e.preventDefault(); const fd=new FormData(ef); const rows=loadEvents(); const gameTitle=String(fd.get('gameTitle')||'').trim(); const episodeNumber=String(fd.get('episodeNumber')||'').trim(); const foundGame=findGameForCalendarEvent({gameTitle}); const cover=(foundGame?.cover || foundGame?.banner || eventGameCover({gameTitle})); const event={id:'event-'+Date.now(),title:gameTitle+(episodeNumber?' • '+episodeNumber:''),date:fd.get('date'),time:fd.get('time'),type:fd.get('type'),gameTitle,gameId:foundGame?.id||'',seriesName:foundGame?.seriesName||'',episodeNumber,videoUrl:fd.get('videoUrl'),note:'',cover,source:foundGame?'game-match':'local'}; rows.unshift(event); saveEvents(rows); persistEventToSupabase(event).then(()=>render()).catch(err=>{ console.warn('Supabase takvim kayıt yerel modda kaldı:', err.message); saveSyncState({mode:'local', status:'Takvim yerel kayıt aktif', message:err.message}); }); toast(foundGame?'Yayın kaydedildi, oyun kapağı otomatik eşleşti.':'Yayın kaydedildi. Oyun kapağı bulunamazsa varsayılan kapak kullanılır.'); render(); return; }
    const nf=e.target.closest('[data-note-form]'); if(nf){ e.preventDefault(); const fd=new FormData(nf); const rows=loadNotes(); const note={id:'note-'+Date.now(),version:fd.get('version'),status:fd.get('status'),title:fd.get('title'),summary:fd.get('summary'),source:'local'}; rows.unshift(note); saveNotes(rows); persistNoteToSupabase(note).then(()=>render()).catch(err=>{ console.warn('Supabase not kayıt yerel modda kaldı:', err.message); saveSyncState({mode:'local', status:'Not yerel kayıt aktif', message:err.message}); }); toast('Güncelleme notu kaydedildi.'); render(); return; }
    const mf=e.target.closest('[data-maint-form]'); if(mf){ e.preventDefault(); const fd=new FormData(mf); const maintenance={enabled:fd.get('enabled')==='true',percent:Number(fd.get('percent')||0),message:fd.get('message'),eta:fd.get('eta'),adminBypass:true,source:'admin-form',updatedAt:new Date().toISOString()}; saveMaintenance(maintenance); persistMaintenanceToSupabase(maintenance).catch(err=>{ console.warn('Supabase bakım kayıt yerel modda kaldı:', err.message); saveSyncState({mode:'local', status:'Bakım yerel kayıt aktif', message:err.message}); }); toast('Bakım modu kaydedildi.'); render(); return; }
  });
}
function render(){
  const root=document.getElementById('root');
  if(!root) return;
  try{
    root.innerHTML=pageHtml();
  }catch(err){
    console.error('Güvenli render hata ekranı:', err);
    try{ root.innerHTML=emergencySafeHtml(err && err.message ? err.message : 'Sayfa oluşturulurken hata yakalandı.'); }
    catch{ root.innerHTML='<main style="min-height:100vh;display:grid;place-items:center;background:#05070d;color:#fff;font-family:Arial;padding:24px"><section style="max-width:720px;border:1px solid rgba(255,255,255,.15);border-radius:24px;padding:28px;background:#0f172a"><h1>Hayatımız Oyun</h1><p>Güvenli açılış devrede.</p><p><a style="color:#fff" href="/ana-sayfa">Ana Sayfa</a></p></section></main>'; }
  }
  try{ document.title='Hayatımız Oyun - '+VERSION; }catch{}
  if(route()==='/yonetim/kullanicilar' && document.querySelector('[data-auto-users="1"]') && !window.__HAYATIMIZ_USERS_AUTO_REFRESHED__){
    window.__HAYATIMIZ_USERS_AUTO_REFRESHED__=true;
    setTimeout(()=>refreshUsersPanel().catch(()=>{}), 120);
  }
}
window.addEventListener('popstate', render);
window.addEventListener('error', ev=>{ console.error('v4.0.5 hata:', ev.message); const root=document.getElementById('root'); if(root && (root.textContent||'').trim().length<40) root.innerHTML=emergencySafeHtml(ev.message || 'Beklenmeyen site hatası yakalandı.'); });
document.addEventListener('DOMContentLoaded', ()=>{
  appBootRepair();
  try{ bind(); }catch(err){ console.error('Bağlantı sistemi hatası, site güvenli açılıyor:', err); }
  const root=document.getElementById('root');
  if(root){ root.innerHTML='<main class="maintenanceZiyaretçi proMaintenance"><section class="maintenanceCard proMaintenanceCard"><span class="badge amber">🔄 Site durumu kontrol ediliyor</span><h1>Hayatımız Oyun</h1><p>Bakım modu ve ban durumu Supabase üzerinden kontrol ediliyor...</p></section></main>'; }
  refreshSiteRuntimeFromSupabase({force:false}).then(()=>{
    try{ render(); }catch(err){ const root=document.getElementById('root'); if(root) root.innerHTML=emergencySafeHtml(err && err.message ? err.message : 'Açılış hatası yakalandı.'); }
    refreshSiteDataFromSupabase({force:false}).then(()=>render()).catch(()=>{});
  }).catch(()=>{
    try{ render(); }catch(err){ const root=document.getElementById('root'); if(root) root.innerHTML=emergencySafeHtml(err && err.message ? err.message : 'Açılış hatası yakalandı.'); }
  });
  setTimeout(()=>{ const r=document.getElementById('root'); if(!r || (r.textContent||'').trim().length<40) render(); }, 900);
});
window.addEventListener('unhandledrejection', ev=>{ console.error('v4.0.5 promise hata:', ev.reason); const root=document.getElementById('root'); if(root && (root.textContent||'').trim().length<40) root.innerHTML=emergencySafeHtml('Beklenmeyen işlem hatası yakalandı.'); });
window.HAYATIMIZ_OYUN_VERSION = VERSION;
window.HAYATIMIZ_OYUN_FIX = FIX_NAME;
