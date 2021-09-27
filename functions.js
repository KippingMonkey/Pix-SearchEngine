function getSearchResults(){
    
  const form = document.getElementById('toolbar-form');

  form.onsubmit = async event => {
      event.preventDefault();
      
      document.getElementById('gallery').style.display = 'flex';
      document.querySelector('.search-container').classList.add('search-active');
      document.querySelector('.footer-container').classList.add('search-active');
      

      //let searchFor = form.elements.namedItem("searchfield"); (=alternative way of typing)
      const searchFor = form.elements.searchfield.value;
      const color = document.querySelector('input[name="color_codes"]:checked').id;
      const apiKey = '23538954-f5928fdd584dadd6f32fceceb';

        const searchString = new URLSearchParams({
            key: apiKey,
            q: searchFor,
            colors: color,
        });
      const response = await fetch('https://pixabay.com/api/?' + searchString);
      const searchResult = await response.json();
      
      let figures = document.querySelectorAll('figure');
      let images = document.querySelectorAll(".search-result");
      let figCap1 = document.querySelectorAll(".tags");
      let figCap2 = document.querySelectorAll(".photographer");
      
      for (let i = 0; i < figures.length; i++) {
          figures[i].style.display = 'inline-block';
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


function showDropdown(){
let dropdownMenu = document.getElementById("dropdown-menu");
let dropdownbtn = document.getElementById("paintbrush");

dropdownbtn.addEventListener("mouseover",function(){
    dropdownMenu.style.display = "block";
})
window.onclick = function(){
    dropdownMenu.style.display = "none";
}
}
showDropdown();


function colorBrush(){
let radiobtns = Array.from(document.querySelectorAll('[type="radio"]'));
let htmlcolors = ["#bcbcbc","gray","#F8F8F8","red","orange","green","turquoise","blue","purple","pink","white","gray","black","#964B00" ]
let brush = document.getElementById("paintbrush");

for (let i = 0; i < radiobtns.length; i++) {
    let btn = document.querySelector(`[value="${i}"]`);
    btn.addEventListener("click",function(){
    // alert(`Color: ${btn.id} got clicked`);
        if (i === 10) {
        brush.style.backgroundColor = "gray"
        }
        else{
        brush.style.backgroundColor = "white"
    }
brush.style.color = htmlcolors[i];
});
}
}
colorBrush();

function highlightChoice(){
    let htmlcolors = ["#bcbcbc","gray","#F8F8F8","red","orange","green","turquoise","blue","purple","pink","white","gray","black","#964B00" ]
    var labels = Array.from(document.querySelectorAll(".c-label"));
for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener("mouseover",function(){
        // alert(`label ${i}`)
    let label = this;
    label.style.backgroundColor = htmlcolors[i];
    if (i === 2 || i === 10) {
        label.style.color = "black";
        label.style.outline ="1px solid gray";
    }
    else{label.style.color="white";}
    });
}
}
highlightChoice();

function resetChoice(){
    var labels = Array.from(document.querySelectorAll(".c-label"));
for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener("mouseout",function(){
        // alert(`label ${i}`)
    let label = this;
    label.style.backgroundColor = "white";
    label.style.color = "black";
    label.style.outline = 0;
    });
}
}
resetChoice();





