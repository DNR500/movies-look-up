import configuration from './../../config/configuration';
import requestJSON from './../../../universal/network/request-json';
import { movieDetailUrl } from './api-urls';
import movieDetailBuild from './../builders/movie-detail-build';

const movieDetailService = (req, res) => {
  const { movieId } = req.params;
  const { domain } = configuration.retrieve('url').moviedb;
  const apiKey = configuration.retrieve('apikey').moviedb;

  res.setHeader('Content-Type', 'application/json');

  Promise.all([
    requestJSON(movieDetailUrl(domain, apiKey, movieId)),
  ]).then(movieDetailBuild)
    .then(builtData => res.status(200).json(builtData))
    .catch(err => res.status(400).json({ err: err.message }));
};

export default movieDetailService;
