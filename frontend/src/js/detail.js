import { getAnimeById, getCharacters, getStreaming } from "./api.js";
import { detailCard, renderCharacters, renderStreaming } from "./detailUi.js";

async function loadDetails() {
  const queryString = location.search;
  const paramsObj = new URLSearchParams(queryString);
  const idText = paramsObj.get("id");
  const animeDetailContainer = document.querySelector(
    "#anime-detail-container",
  );
  const charactersContainer = document.querySelector("#characters-container");
  const streamingContainer = document.querySelector("#streaming-container");

  if (/^\d+$/.test(idText) && Number(idText) > 0) {
    const id = Number(idText);

    const resultsAnimeDetail = await getAnimeById(id);
    const resultsCharacters = await getCharacters(id);
    const resultsStreaming = await getStreaming(id);

    if (resultsAnimeDetail?.data) {
      detailCard(resultsAnimeDetail.data, animeDetailContainer);

      document.title = `${resultsAnimeDetail.data.title || "Anime"} | Otaku Hub`;
    } else {
      animeDetailContainer.textContent =
        "Couldn’t load the anime. Try again later.";
    }

    if (resultsCharacters?.data) {
      const mainCharacters = resultsCharacters.data.filter(
        (data) => data.role === "Main",
      );
      if (mainCharacters.length > 0) {
        renderCharacters(resultsCharacters.data, charactersContainer);
      } else {
        charactersContainer.textContent =
          "No characters listed for this anime yet.";
      }
    } else {
      charactersContainer.textContent = "Couldn’t load the characters...";
    }

    if (resultsStreaming?.data) {
      renderStreaming(resultsStreaming.data, streamingContainer);
    } else {
      streamingContainer.textContent =
        "No streaming links listed for this anime yet.";
    }
  } else {
    animeDetailContainer.textContent = "Invalid anime id";
  }
}

loadDetails();
