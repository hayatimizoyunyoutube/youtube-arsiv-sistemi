async function fetchVideos() {
    const { data, error } = await supabase.from('videos').select('*');
    if (error) return console.error("Video çekme hatası:", error);
    
    const grid = document.getElementById('video-grid');
    grid.innerHTML = ''; // Eski sabit kodları temizle

    data.forEach(video => {
        grid.innerHTML += `
            <div class="video-card">
                <div class="thumbnail">${video.thumbnail_url ? `<img src="${video.thumbnail_url}" width="100%">` : 'Resim Yok'}</div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-category">${video.youtube_url}</p>
                </div>
            </div>
        `;
    });
}

// Sayfa açıldığında videoları getir
fetchVideos();