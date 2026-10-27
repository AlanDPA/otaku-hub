import { getData, getAnimeById, getCharacters } from "./api.js";
import { renderCards } from "./ui.js";
import { renderPagination } from "./ui.js";

let page = 1;
let search = "";

const searchAnime = document.querySelector("#search-anime");

searchAnime.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    page = 1;
    search = searchAnime.value;
    loadAnimes();
  }
});

const buttonsContainer = document.querySelector("#buttons-container");
buttonsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (btn) {
    page = Number(btn.dataset.page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadAnimes();
  }
});

async function loadAnimes() {
  const results = await getData(page, search);
  const cardsContainer = document.querySelector("#cards-container");
  if (results) {
    if (results.data.length === 0) {
      cardsContainer.textContent = "No results found";
      buttonsContainer.textContent = "";
    } else {
      renderCards(results.data, cardsContainer);
      renderPagination(results.pagination, buttonsContainer);
    }
  } else {
    cardsContainer.textContent = "Couldn’t load the animes. Try again later.";
    buttonsContainer.textContent = "";
  }
}

loadAnimes();
