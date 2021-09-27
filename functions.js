// Declare global variables
const form = document.getElementById("toolbar-form");
const searchContainer = document.getElementById("search-container");
const colorSelect = document.getElementById("color-select");
const galleryContainer = document.getElementById("gallery-container");
const logoContainer = document.getElementById("logo-container");
let pageNumber = 1;

//Display images with API data, change layout and display number of hits
async function getSearchResults() {
  galleryContainer.replaceChildren();
  if (!searchContainer.classList.contains("search-active")) {
    !searchContainer.classList.add("search-active");
  }

  const searchValue = form.elements.searchfield.value;
  const searchResult = await fetchData(pageNumber);
  const maxPages = Math.ceil(searchResult.totalHits / 10);
  const header = document.createElement("h2");
  if (searchValue === "") {
    header.textContent = `Search results(${searchResult.totalHits} images):`;
  } else if (searchResult.totalHits > 0) {
    header.textContent = `Search results for ${searchValue.toLowerCase()}(${
      searchResult.totalHits
    } images):`;
  } else {
    header.textContent = "No search results. Try another keyword";
  }
  galleryContainer.appendChild(header);

  const gallery = document.createElement("div");
  gallery.classList.add("gallery");
  searchResult.hits.forEach((data) => {
    gallery.appendChild(createFigure(data));
  });
  galleryContainer.appendChild(gallery);
  galleryContainer.appendChild(createButtons(maxPages));
}

//Create forwards and backwards buttons and page counter
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
  if (pageNumber >= maxPages) {
    forward.disabled = true;
  } else {
    forward.disabled = false;
  }

  forward.addEventListener("click", () => {
    pageNumber++;
    getSearchResults();
  });

  //   const currentPage = document.createElement("h3");
  //   currentPage.textContent = `${pageNumber}/${maxPages}`;

  const selectPage = document.createElement("select");
  const currentPageOption = document.createElement("option");
  currentPageOption.textContent = pageNumber;
  currentPageOption.value = pageNumber;
  currentPageOption.selected = true;
  selectPage.appendChild(currentPageOption);
  for (let index = 1; index <= maxPages; index++) {
    const option = document.createElement("option");
    option.textContent = index;
    option.value = index;
    if (index !== pageNumber) {
      selectPage.appendChild(option);
    }
  }
  selectPage.addEventListener("change", () => {
    pageNumber = selectPage.value;
    getSearchResults();
  });

  btnContainer.appendChild(backward);
  btnContainer.appendChild(selectPage);
  btnContainer.appendChild(forward);

  return btnContainer;
}

//Fetch data from API
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

//Creates figures for gallery
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

//Event handlers

form.onsubmit = async (event) => {
  pageNumber = 1;
  event.preventDefault();
  getSearchResults();
};

logoContainer.addEventListener("click", () => {
  location.reload();
});
