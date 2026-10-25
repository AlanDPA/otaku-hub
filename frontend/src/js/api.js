import { urlBase, itemsPerPage } from "./config.js";

export async function getData(page, search) {
  const paramsObj = { limit: itemsPerPage, page: page };
  const searchParams = new URLSearchParams(paramsObj);

  if(typeof search === 'string' && search.trim().length > 0) {
    searchParams.append("q",search.trim())
  }

  const url = `${urlBase}?${searchParams}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}
