const domain = window.location.origin;

export const movieSearchAPI =
  (searchQuery, page = 1) => `${domain}/movie/search/${searchQuery}/page/${page}`;

export const movieDetailAPI =
  movieId => `${domain}/movie/detail/${movieId}`;
