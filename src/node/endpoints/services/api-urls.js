export const movieDetailUrl =
  (domain, apiKey, movieId) =>
    `${domain}/3/movie/${movieId}?api_key=${apiKey}`;

export const movieSearchUrl =
  (domain, apiKey, searchQuery, page) =>
    `${domain}/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
