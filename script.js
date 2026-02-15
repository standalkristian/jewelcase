// ===== helpers =====

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function getRatingColor(rating) {
  if (rating === 10) return '#7f48df';
  if (rating >= 9.5) return '#D4AF37';
  if (rating >= 8.8) return '#FF7043';
  if (rating >= 8.0) return '#29B6F6';
  return '#888';
}

// ===== main =====

async function init() {
  const grid = document.getElementById('album-grid');

  // load JSON
  const response = await fetch('data/albums.json');
  const albums = await response.json();

  // optional shuffle (nice for discovery)
  const shuffled = shuffle(albums);

  renderAlbums(shuffled, grid);
}

function renderAlbums(albums, grid) {
  grid.innerHTML = '';

  albums.forEach(album => {
    const card = document.createElement('div');
    card.className = 'album-card';

    const img = document.createElement('img');
    img.className = 'album-cover';
    img.src = `images/${album.cover}`;
    img.alt = `${album.artist} - ${album.title}`;

    const rating = document.createElement('div');
    rating.className = 'album-rating';
    rating.textContent = album.rating;
    rating.style.background = getRatingColor(Number(album.rating));

    card.appendChild(img);
    card.appendChild(rating);
    grid.appendChild(card);
  });
}

// start app
init();
