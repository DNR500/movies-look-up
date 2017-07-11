import configuration from './../../config/configuration';
import requestJSON from './../../../universal/network/request-json';
import { movieSearchUrl } from './api-urls';
import movieSearchBuild from './../builders/movie-search-build';

const movieSearchService = (req, res) => {
  const { searchQuery, page } = req.params;
  const { domain } = configuration.retrieve('url').moviedb;
  const apiKey = configuration.retrieve('apikey').moviedb;

  res.setHeader('Content-Type', 'application/json');

  Promise.all([
    requestJSON(movieSearchUrl(domain, apiKey, searchQuery, page)),
  ]).then(movieSearchBuild)
    .then(builtData => res.status(200).json(builtData))
    .catch(err => res.status(400).json({ err: err.message }));
};

export default movieSearchService;
