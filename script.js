function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

fetch('data/albums.json')
  .then(response => response.json())
  .then(data => {
    const shuffled = shuffleArray(data);
    console.log(data);
    const albumGrid = document.getElementById('album-grid');
    
    data.forEach(album => {
      const albumDiv = document.createElement('div');
      albumDiv.classList.add('album');

      albumDiv.addEventListener('mouseenter', () => {
        albumGrid.classList.add('dimmed');
      });
      
      albumDiv.addEventListener('mouseleave', () => {
        albumGrid.classList.remove('dimmed');
      });
      
      
      const albumImg = document.createElement('img');
      albumImg.src = 'images/' + album.cover;
      albumDiv.appendChild(albumImg);
      
      const albumInfo = document.createElement('div');
      albumInfo.classList.add('album-info');
      //albumInfo.innerHTML = `${album.artist}<br>${album.title}<br>${album.release_year}<br>`;
      albumDiv.appendChild(albumInfo);

      const albumTitle = document.createElement('span');
      albumTitle.classList.add('album-title');
      albumTitle.innerHTML = `${album.title}<br>`;
      albumInfo.appendChild(albumTitle);

      const albumArtist = document.createElement('span');
      albumArtist.classList.add('album-artist');
      albumArtist.innerHTML = `${album.artist}`;
      albumInfo.appendChild(albumArtist);

      const albumYear = document.createElement('span');
      albumYear.classList.add('album-year');
      albumYear.innerHTML = `${album.release_year}`;
      albumInfo.appendChild(albumYear);

      const albumGenre = document.createElement('span');
      albumGenre.classList.add('album-genre');
      albumGenre.innerHTML = `${album.main_genre}<br>`;
      albumInfo.appendChild(albumGenre);

      const albumTags = document.createElement('div');
      albumTags.classList.add('album-tags');
      album.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('tag');
        tagSpan.innerHTML = `&sdot;${tag}<br>`;
        albumTags.appendChild(tagSpan);
      });
      albumInfo.appendChild(albumTags);  

      const albumRating = document.createElement('div');
      albumRating.classList.add('album-rating');
      albumRating.textContent = `${album.rating}`;

      let background;
      if (album.rating === 10) {
        background = '#7f48df'; // Royal purple
      } else if (album.rating >= 9.5) {
        background = '#D4AF37'; // Deep gold
      } else if (album.rating >= 8.8) {
        background = '#FF7043'; // Warm coral
      } else if (album.rating >= 8.0) {
        background = '#29B6F6'; // Teal/sky blue
      } else {
        background = '#BDBDBD'; // Neutral gray
      }

      albumRating.style.background = background;
     // albumTitle.style.color = background;
      albumRating.style.fontWeight = 'bold';
      albumDiv.appendChild(albumRating);
      
      albumGrid.appendChild(albumDiv);
    });
  })
  .catch(error => console.log('Error loading JSON:', error));
