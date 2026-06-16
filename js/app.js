// Kategorileri ve Videoları Getir
async function loadCategories() {
    const { data: categories } = await supabase.from('categories').select('*');
    const list = document.getElementById('category-list');
    list.innerHTML = `<li class="active" onclick="filterVideos(null, this)">Tüm Videolar</li>`;
    
    categories.forEach(cat => {
        list.innerHTML += `<li onclick="filterVideos('${cat.id}', this)">${cat.name}</li>`;
    });
}

async function filterVideos(categoryId, element) {
    // Aktif sınıfı değiştir
    document.querySelectorAll('.category-list li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');

    let query = supabase.from('videos').select('*');
    if (categoryId) query = query.eq('category_id', categoryId);

    const { data: videos } = await query;
    const grid = document.getElementById('video-grid');
    grid.innerHTML = videos.length ? '' : '<p>Bu kategoride video bulunamadı.</p>';

    videos.forEach(video => {
        grid.innerHTML += `
            <div class="video-card">
                <div class="thumbnail">${video.thumbnail_url || 'Resim Yok'}</div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-category">${video.category_id || 'Genel'}</p>
                </div>
            </div>
        `;
    });
}

async function loadCategories() {
    const { data: categories } = await supabase.from('categories').select('*');
    const list = document.getElementById('category-list');
    list.innerHTML = ''; 
    
    categories.forEach(cat => {
        list.innerHTML += `<li onclick="filterVideos('${cat.id}', this)">${cat.name}</li>`;
    });
}