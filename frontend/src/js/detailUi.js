const backgroundDefault = "img/background-default.jpg";

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
    anime.trailer?.images?.maximum_image_url || backgroundDefault;

  dataImages02Html.src =
    anime.images?.webp?.image_url || anime.images?.jpg?.image_url;

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
    `Based on ${anime.scored_by?.toLocaleString("en-US")} votes` || "No votes yet";

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
