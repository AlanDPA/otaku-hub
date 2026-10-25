export function getPageNumbers(currentPage, lastPage) {
  const requiredPages = [
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    lastPage,
  ];

  let sortedPages = [];
  const finalPages = [];

  if (lastPage < 6) {
    if (lastPage > 1) {
      for (let index = 1; index <= lastPage; index++) {
        const pageNumber = index;
        finalPages.push(pageNumber);
      }
    }
  } else {
    const uniquePages = [...new Set(requiredPages)];
    const validPages = uniquePages.filter(
      (pageNumber) => pageNumber >= 1 && pageNumber <= lastPage,
    );
    sortedPages = validPages.sort((a, b) => a - b);

    for (let index = 0; index < sortedPages.length; index++) {
      const page = sortedPages[index];
      const previousPage = sortedPages[index - 1];

      if (page - previousPage === 2) {
        finalPages.push(page - 1);
      }

      if (page - previousPage > 2) {
        finalPages.push("...");
      }

      finalPages.push(page);
    }
  }
  return finalPages;
}
