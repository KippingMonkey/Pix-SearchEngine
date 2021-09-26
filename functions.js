function getSearchResults(){
    
  const form = document.getElementById('toolbar-form');

  form.onsubmit = async event => {
      event.preventDefault();
      
      document.getElementById('gallery').style.display = 'flex';
      document.querySelector('.search-container').classList.add('search-active');
      document.querySelector('.footer-container').classList.add('search-active');
      

      //let searchFor = form.elements.namedItem("searchfield"); (=alternative way of typing)
      const searchFor = form.elements.searchfield.value;
      const apiKey = '23538954-f5928fdd584dadd6f32fceceb';

        const searchString = new URLSearchParams({
            key: apiKey,
            q: searchFor,
        });
      const response = await fetch('https://pixabay.com/api/?' + searchString);
      const searchResult = await response.json();
      
      let figures = document.querySelectorAll('figure');
      let images = document.querySelectorAll(".search-result");
      let figCap1 = document.querySelectorAll(".tags");
      let figCap2 = document.querySelectorAll(".photographer");
      
      for (let i = 0; i < figures.length; i++) {
          images[i].src = searchResult.hits[i].webformatURL;
          images[i].alt = searchResult.hits[i].tags;
          figCap1[i].innerHTML = `#: ${searchResult.hits[i].tags}`;
          figCap2[i].innerHTML = `User: ${searchResult.hits[i].user}`;
      }
  }
}

function createGallery(node){
    const template = document.getElementById('gallery-template');
    node.appendChild(template.content.cloneNode(true));
}

createGallery(document.getElementById('gallery'));
getSearchResults();