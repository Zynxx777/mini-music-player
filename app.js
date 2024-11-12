document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    if (query) {
      const response = await fetch(`/api/search?query=${query}`);
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
    }
  });
  
  function playMusic(videoId) {
    const player = document.getElementById('player');
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`; // Embed video with autoplay
  }
  