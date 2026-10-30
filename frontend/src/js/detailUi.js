const backgroundDefault = "img/background-default.jpg";
const backgroundDefaultVertical = "img/background-default-vertical.jpg";

function createStreaming(anime) {
  const template = document.querySelector("#streaming-template");

  const takeCard = template.content.firstElementChild;

  const clone = takeCard.cloneNode(true);

  const dataLinkHtml = clone.querySelector("[data-link]");

  dataLinkHtml.textContent = anime.name;
  dataLinkHtml.href = anime.url;

  return clone
}

export function renderStreaming(anime, container) {
  for (let index = 0; index < anime.length; index++) {
    const element = createStreaming(anime[index]);
    container.append(element);
  }
}

function createCharacters(anime) {
  const template = document.querySelector("#character-template");

  const takeCard = template.content.firstElementChild;

  const clone = takeCard.cloneNode(true);

  const dataImagesHtml = clone.querySelector("[data-images]");

  const dataCharacterNameHtml = clone.querySelector("[data-character-name]");

  dataImagesHtml.src =
    anime.character.images?.webp?.image_url ||
    anime.character.images?.jpg?.image_url ||
    backgroundDefaultVertical;

  dataImagesHtml.alt = anime.character.name;

  dataCharacterNameHtml.textContent = anime.character.name;

  return clone;
}

export function renderCharacters(anime, container) {
  container.replaceChildren();

  for (let index = 0; index < anime.length; index++) {
    if (anime[index].role === "Main") {
      const element = createCharacters(anime[index]);
      container.append(element);
    }
  }
}

export function detailCard(anime, container) {
  container.replaceChildren();

  const template = document.querySelector("#anime-detail-template");

  const takeCard = template.content.firstElementChild;

  const clone = takeCard.cloneNode(true);

  const dataImages01Html = clone.querySelector("[data-images-01]");

  const dataImages02Html = clone.querySelector("[data-images-02]");

  const dataTitleHtml = clone.querySelector("[data-title]");

  const dataTypeHtml = clone.querySelector("[data-type]");
  const dataStatusHtml = clone.querySelector("[data-status]");
  const dataAiredStringHtml = clone.querySelector("[data-aired-string]");

  const dataGenresNameHtml = clone.querySelector("[data-genres-name]");
  const dataGenresExplicitGenresNameHtml = clone.querySelector(
    "[data-genres-explicit-genres-name]",
  );
  const dataSynopsisHtml = clone.querySelector("[data-synopsis]");
  const dataRatingHtml = clone.querySelector("[data-rating]");
  const dataScoreHtml = clone.querySelector("[data-score]");
  const dataScoreByHtml = clone.querySelector("[data-score-by]");

  dataImages01Html.src =
    anime.images?.webp?.image_url ||
    anime.images?.jpg?.image_url ||
    backgroundDefault;

  dataImages02Html.src =
    anime.images?.webp?.large_image_url ||
    anime.images?.jpg?.large_image_url ||
    backgroundDefault;

  dataImages02Html.alt = anime.title;

  dataTitleHtml.textContent = anime.title;

  dataTypeHtml.textContent = anime.type;

  dataStatusHtml.textContent = anime.status;

  dataAiredStringHtml.textContent = anime.aired?.string || "unknown";

  renderGenres(dataGenresNameHtml, anime.genres);

  renderGenres(dataGenresExplicitGenresNameHtml, anime.explicit_genres);

  dataSynopsisHtml.textContent = anime.synopsis || "No synopsis available";

  dataRatingHtml.textContent = anime.rating || "N/A";

  dataScoreHtml.textContent = anime.score || "N/A";

  dataScoreByHtml.textContent =
    `Based on ${anime.scored_by?.toLocaleString("en-US")} votes` ||
    "No votes yet";

  container.append(clone);
}

function renderGenres(container, genresList) {
  if (Array.isArray(genresList)) {
    for (let index = 0; index < genresList.length; index++) {
      const element = genresList[index];
      const newP = document.createElement("p");
      newP.textContent = element.name;
      newP.className = "px-3 py-1 rounded-sm bg-gray-950";
      container.append(newP);
    }
  }
}
