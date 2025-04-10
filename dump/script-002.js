fetch('data/albums.json')
  .then(response => response.json())
  .then(data => {
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
      albumInfo.innerHTML = `${album.artist}<br>${album.title}<br>${album.release_year}<br>`;
      albumDiv.appendChild(albumInfo);

      const ratingElement = document.createElement('div');
      ratingElement.classList.add('album-rating');
      ratingElement.textContent = `${album.rating}`;

      // Choose background based on rating
      let background;
      if (album.rating === 10) {
        background = '#7E57C2'; // Royal purple
      } else if (album.rating >= 9.5) {
        background = '#D4AF37'; // Deep gold
      } else if (album.rating >= 8.8) {
        background = '#FF7043'; // Warm coral
      } else if (album.rating >= 8.0) {
        background = '#29B6F6'; // Teal/sky blue
      } else {
        background = '#BDBDBD'; // Neutral gray
      }

      ratingElement.style.background = background;
      ratingElement.style.fontWeight = 'bold';
      albumDiv.appendChild(ratingElement);
      
      albumGrid.appendChild(albumDiv);
    });
  })
  .catch(error => console.log('Error loading JSON:', error));
