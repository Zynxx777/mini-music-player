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
        const musicItem = document.createElement('div');
        musicItem.classList.add('music-item');
        musicItem.innerHTML = `
          <span>${item.snippet.title}</span>
          <button onclick="playMusic('${item.id.videoId}')">Play</button>
        `;
        musicList.appendChild(musicItem);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please check the console for details.');
    }
  }
});
