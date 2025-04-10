fetch('data/albums.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const albumGrid = document.getElementById('album-grid');
    
    data.forEach(album => {
      const albumDiv = document.createElement('div');
      albumDiv.classList.add('album');
      
      const albumImg = document.createElement('img');
      albumImg.src = 'images/' + album.cover;
      albumDiv.appendChild(albumImg);
      
      const albumInfo = document.createElement('div');
      albumInfo.classList.add('album-info');
      albumInfo.innerHTML = `${album.artist} - ${album.title}<br>${album.release_year}<br>${album.rating}`;
      albumDiv.appendChild(albumInfo);

      const ratingElement = document.createElement('div');
      ratingElement.classList.add('album-test');
      ratingElement.textContent = `${album.rating}`;
      
      let background;
      if (album.rating >= 8) {
        background = '#4CAF50';
      } else if (album.rating >= 6) {
        background = '#FFC107';
      } else {
        background = '#F44336';
      }
      
      ratingElement.style.background = background;
      albumDiv.appendChild(ratingElement);
      


//      const albumTest = document.createElement('div');
//      albumTest.classList.add('album-test');
//      albumTest.innerHTML = `${album.rating}`;
//      albumDiv.appendChild(albumTest);      
      
      albumGrid.appendChild(albumDiv);
    });
  })
  .catch(error => console.log('Error loading JSON:', error));
