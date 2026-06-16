async function loadData() {
    try {
        // 1. Kategorileri Çek
        const { data: kategoriler, error: katError } = await supabase.from('kategoriler').select('*');
        if (katError) console.error("Kategori hatası:", katError);
        
        const list = document.getElementById('category-list');
        if (list && kategoriler) {
            list.innerHTML = `<li class="active" onclick="filterVideos(null, this)">Tüm Videolar</li>`;
            kategoriler.forEach(cat => {
                list.innerHTML += `<li onclick="filterVideos('${cat.id}', this)">${cat.isim}</li>`;
            });
        }

        // 2. Videoları Çek
        filterVideos(null, document.querySelector('li'));

    } catch (err) {
        console.error("Genel yükleme hatası:", err);
    }
}

async function filterVideos(categoryId, element) {
    if (element) {
        document.querySelectorAll('.category-list li').forEach(li => li.classList.remove('active'));
        element.classList.add('active');
    }

    let query = supabase.from('videolar').select('*');
    if (categoryId) query = query.eq('kategori_id', categoryId);

    const { data: videolar, error } = await query;
    const grid = document.getElementById('video-grid');
    
    if (grid) {
        grid.innerHTML = (videolar && videolar.length) ? '' : '<p>Henüz video eklenmemiş.</p>';
        if (videolar) {
            videolar.forEach(video => {
                grid.innerHTML += `
                    <div class="video-card">
                        <div class="thumbnail">Video</div>
                        <div class="video-info">
                            <h3 class="video-title">${video.baslik}</h3>
                        </div>
                    </div>
                `;
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', loadData);