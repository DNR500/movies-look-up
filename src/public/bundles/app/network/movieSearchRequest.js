import { movieSearchAPI } from './api-urls';
import requestJSON from './../../../../universal/network/request-json';

const movieSearchRequest =
  (searchQuery, page) => requestJSON(movieSearchAPI(searchQuery, page));

export default movieSearchRequest;
