import movieSearchService from './services/movie-search-get';

const endpoints = (app) => {
  app.get('/movie/search/:searchQuery/:page', movieSearchService);
};

export default endpoints;
