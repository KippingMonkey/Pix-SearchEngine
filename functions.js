function getSearchInput(){
  const form = document.getElementById('toolbar-form');

  form.onsubmit = event => {
      event.preventDefault();
    //   let searchFor = form.elements.namedItem("searchfield"); (=alternative way of typing)
    const searchFor = form.elements.searchfield.value;
      alert(searchFor);
    //   return searchFor;
  }
}
getSearchInput();

function createGallery(node){
    const template = document.getElementById('gallery-template');
    node.appendChild(template.content.cloneNode(true));

    const apiKey = 23538954-f5928fdd584dadd6f32fceceb;
    if(!apiKey){
        alert("API key is missing from file")
    };



}


createGallery(document.getElementById('gallery'));