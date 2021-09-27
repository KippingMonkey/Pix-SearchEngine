const form = document.getElementById("toolbar-form");
const searchContainer = document.getElementById("search-container");
const colorSelect = document.getElementById("color-select");
const gallery = document.getElementById("gallery");
let pageNumber = 1;

async function getSearchResults() {
    gallery.replaceChildren();
    // document.getElementById("gallery").style.display = "flex";
    if (!searchContainer.classList.contains("search-active")) {
      !searchContainer.classList.add("search-active");
    }

    //let searchFor = form.elements.namedItem("searchfield"); (=alternative way of typing)
    const searchValue = form.elements.searchfield.value;
    // const color = colorSelect.value;
    // const apiKey = "23538954-f5928fdd584dadd6f32fceceb";

    // const searchString = new URLSearchParams({
    //   key: apiKey,
    //   q: searchFor,
    //   colors: color,
    //   per_page: 10,
    //   page: 1
    // });
    // const response = await fetch("https://pixabay.com/api/?" + searchString);

    // if (!response.ok) {
    //   const message = `An error has occured: ${response.status}`;
    //   throw new Error(message);
    // }
    // const searchResult = await response.json();
    const searchResult = await fetchData(pageNumber);
    const maxPages = Math.ceil(searchResult.totalHits / 10);
    const header = document.createElement("h2");
    if (searchValue === "") {
      header.textContent = "Search results:";
    } else if (searchResult.totalHits > 0) {
      header.textContent = `Search results for ${searchValue.toLowerCase()}:`;
    } else {
      header.textContent = "No search results. Try another keyword";
    }
    gallery.appendChild(header);

    searchResult.hits.forEach((data) => {
      gallery.appendChild(createFigure(data));
    });
    // let figures = document.querySelectorAll("figure");
    // let images = document.querySelectorAll(".search-result");
    // let figCap1 = document.querySelectorAll(".tags");
    // let figCap2 = document.querySelectorAll(".photographer");

    // for (let i = 0; i < figures.length; i++) {
    //   figures[i].style.display = "inline-block";
    //   images[i].src = searchResult.hits[i].webformatURL;
    //   images[i].alt = searchResult.hits[i].tags;
    //   figCap1[i].innerHTML = `#: ${searchResult.hits[i].tags}`;
    //   figCap2[i].innerHTML = `User: ${searchResult.hits[i].user}`;
    // }
    gallery.appendChild(createButtons(maxPages));
  };


function createButtons(maxPages) {
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  const backward = document.createElement("button");
  const iconBack = document.createElement("i");
  iconBack.classList.add("fas", "fa-backward", "fa-2x");
  backward.appendChild(iconBack);
  if (pageNumber === 1) {
    backward.disabled = true;
  } else {
    backward.disabled = false;
  }

  backward.addEventListener("click", () => {
      pageNumber--;
      getSearchResults();
    });
    
    const forward = document.createElement("button");
    const iconForward = document.createElement("i");
    iconForward.classList.add("fas", "fa-forward", "fa-2x");
    forward.appendChild(iconForward);
    if (pageNumber === maxPages) {
        forward.disabled = true;
    } else {
        forward.disabled = false;
    }
    
    forward.addEventListener("click", () => {
      pageNumber++;
      getSearchResults();
  })

  const currentPage = document.createElement("h3");
  currentPage.textContent = pageNumber;

  btnContainer.appendChild(backward);
  btnContainer.appendChild(currentPage);
  btnContainer.appendChild(forward);

  return btnContainer;
}

async function fetchData(page) {
  const searchFor = form.elements.searchfield.value;
  const color = colorSelect.value;
  const apiKey = "23538954-f5928fdd584dadd6f32fceceb";

  const searchString = new URLSearchParams({
    key: apiKey,
    q: searchFor,
    colors: color,
    per_page: 10,
    page: page,
  });
  const response = await fetch("https://pixabay.com/api/?" + searchString);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

function createFigure(data) {
  const figure = document.createElement("figure");
  const hyperlink = document.createElement("a");
  const image = document.createElement("img");
  const tags = document.createElement("figcaption");
  const photographer = document.createElement("figcaption");

  figure.style.display = "inline-block";
  image.src = data.webformatURL;
  image.alt = data.tags;
  tags.textContent = `#: ${data.tags}`;
  photographer.textContent = `User: ${data.user}`;
  hyperlink.href = data.webformatURL;
  hyperlink.target = "_blank";

  image.appendChild(hyperlink);
  figure.appendChild(image);
  figure.appendChild(tags);
  figure.appendChild(photographer);

  return figure;
}

function createGallery(node) {
  const template = document.getElementById("gallery-template");
  node.appendChild(template.content.cloneNode(true));
}

// createGallery(document.getElementById("gallery"));
// getSearchResults();

form.onsubmit = async (event) => {
    pageNumber = 1;
    event.preventDefault();
    getSearchResults();
}

// function showDropdown() {
//   let dropdownMenu = document.getElementById("dropdown-menu");
//   let dropdownbtn = document.getElementById("paintbrush");

//   dropdownbtn.addEventListener("mouseover", function () {
//     dropdownMenu.style.display = "block";
//   });
//   window.onclick = function () {
//     dropdownMenu.style.display = "none";
//   };
// }
// showDropdown();

// function colorBrush() {
//   let radiobtns = Array.from(document.querySelectorAll('[type="radio"]'));
//   let htmlcolors = [
//     "#bcbcbc",
//     "gray",
//     "#F8F8F8",
//     "red",
//     "orange",
//     "green",
//     "turquoise",
//     "blue",
//     "purple",
//     "pink",
//     "white",
//     "gray",
//     "black",
//     "#964B00",
//   ];
//   let brush = document.getElementById("paintbrush");

//   for (let i = 0; i < radiobtns.length; i++) {
//     let btn = document.querySelector(`[value="${i}"]`);
//     btn.addEventListener("click", function () {
//       // alert(`Color: ${btn.id} got clicked`);
//       if (i === 10) {
//         brush.style.backgroundColor = "gray";
//       } else {
//         brush.style.backgroundColor = "white";
//       }
//       brush.style.color = htmlcolors[i];
//     });
//   }
// }
// colorBrush();

// function highlightChoice() {
//   let htmlcolors = [
//     "#bcbcbc",
//     "gray",
//     "#F8F8F8",
//     "red",
//     "orange",
//     "green",
//     "turquoise",
//     "blue",
//     "purple",
//     "pink",
//     "white",
//     "gray",
//     "black",
//     "#964B00",
//   ];
//   var labels = Array.from(document.querySelectorAll(".c-label"));
//   for (let i = 0; i < labels.length; i++) {
//     labels[i].addEventListener("mouseover", function () {
//       // alert(`label ${i}`)
//       let label = this;
//       label.style.backgroundColor = htmlcolors[i];
//       if (i === 2 || i === 10) {
//         label.style.color = "black";
//         label.style.outline = "1px solid gray";
//       } else {
//         label.style.color = "white";
//       }
//     });
//   }
// }
// highlightChoice();

// function resetChoice() {
//   var labels = Array.from(document.querySelectorAll(".c-label"));
//   for (let i = 0; i < labels.length; i++) {
//     labels[i].addEventListener("mouseout", function () {
//       // alert(`label ${i}`)
//       let label = this;
//       label.style.backgroundColor = "white";
//       label.style.color = "black";
//       label.style.outline = 0;
//     });
//   }
// }
// resetChoice();
