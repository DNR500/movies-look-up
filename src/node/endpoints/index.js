import movieSearchService from './services/movie-search-get';
import movieDetailService from './services/movie-detail-get';

const endpoints = (app) => {
  app.get('/movie/search/:searchQuery/page/:page', movieSearchService);
  app.get('/movie/detail/:movieId', movieDetailService);
};

export default endpoints;
