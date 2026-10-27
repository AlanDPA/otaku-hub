import { getPageNumbers } from "./pagination.js";

function createCard(anime) {
  const template = document.querySelector("#card-template");
  const takeCard = template.content.firstElementChild;

  const clone = takeCard.cloneNode(true);

  if (Number.isInteger(anime.mal_id) && anime.mal_id > 0) {
    clone.href = `detail.html?id=${anime.mal_id}`;
  }

  const imagesHtml = clone.querySelector("[data-images]");

  const scoreHtml = clone.querySelector("[data-score]");

  const statusHtml = clone.querySelector("[data-status]");

  const titleHtml = clone.querySelector("[data-title]");

  imagesHtml.src =
    anime.images?.webp?.image_url || anime.images?.jpg?.image_url;

  imagesHtml.alt = anime.title;

  scoreHtml.textContent = anime.score ? anime.score : "N/A";

  statusHtml.textContent = anime.status;

  titleHtml.textContent = anime.title;

  return clone;
}

export function renderCards(animes, container) {
  container.replaceChildren();

  for (let index = 0; index < animes.length; index++) {
    const element = createCard(animes[index]);
    container.append(element);
  }
}

export function renderPagination(pagination, container) {
  container.replaceChildren();
  const finalPages = getPageNumbers(
    pagination.current_page,
    pagination.last_visible_page,
  );

  for (let index = 0; index < finalPages.length; index++) {
    const element = finalPages[index];
    const newContent = document.createTextNode(element);
    if (element === "...") {
      const newSpan = document.createElement("span");
      newSpan.append(newContent);
      container.append(newSpan);
    } else {
      const newButton = document.createElement("button");
      newButton.className =
        "rounded bg-white text-gray-900 px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-base text-center cursor-pointer aria-[current=page]:bg-gray-900 aria-[current=page]:font-semibold aria-[current=page]:border-2 aria-[current=page]:border-white aria-[current=page]:text-white aria-[current=page]:disabled:cursor-default";
      newButton.type = "button";
      newButton.dataset.page = element;
      if (element === pagination.current_page) {
        newButton.setAttribute("aria-current", "page");
        newButton.disabled = true;
      }
      newButton.append(newContent);
      container.append(newButton);
    }
  }
}
