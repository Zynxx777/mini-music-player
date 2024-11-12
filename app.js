const API_URL = 'https://mini-music-player-cyak.onrender.com/api/search';

document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        try {
            const response = await fetch(`${API_URL}?query=${query}`);
            const data = await response.json();
            const musicList = document.getElementById('music-list');
            musicList.innerHTML = '';

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const thumbnailUrl = item.snippet.thumbnails.default.url; // Can also use 'high' for better quality

                const musicItem = document.createElement('div');
                musicItem.classList.add('music-item');
                musicItem.innerHTML = `
                    <img src="${thumbnailUrl}" alt="${title}" class="thumbnail">
                    <span>${title}</span>
                    <button onclick="playMusic('${videoId}')">Play</button>
                `;
                musicList.appendChild(musicItem);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please check the console for details.');
        }
    }
});

// Function to play music using embedded YouTube player
function playMusic(videoId) {
    const player = document.getElementById('youtube-player');
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
