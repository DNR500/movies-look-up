import { movieDetailAPI } from './api-urls';
import requestJSON from './../../../../universal/network/request-json';

const movieDetailRequest =
  movieId => requestJSON(movieDetailAPI(movieId));

export default movieDetailRequest;
