import { getAnimeById } from "./api.js";
import { detailCard } from "./detailUi.js";

async function loadDetails() {
  const queryString = location.search;
  const paramsObj = new URLSearchParams(queryString);
  const idText = paramsObj.get("id");
  const animeDetailContainer = document.querySelector(
    "#anime-detail-container",
  );

  if (/^\d+$/.test(idText) && Number(idText) > 0) {
    const id = Number(idText);

    const results = await getAnimeById(id);
    if (results?.data) {
      detailCard(results.data, animeDetailContainer);
      document.title = `${results.data.title || "Anime"} | Otaku Hub`;
    } else {
      animeDetailContainer.textContent =
        "Couldn’t load the anime. Try again later.";
    }
  } else {
    animeDetailContainer.textContent = "Invalid anime id";
  }
}

loadDetails();
