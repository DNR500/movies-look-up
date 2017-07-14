import React from 'react';
import ReactDOM from 'react-dom';

import './polyfills/location.origin';

import movieSearchRequest from './network/movieSearchRequest';
import movieDetailRequest from './network/movieDetailRequest';

import MovieSearch from './containers/movie-search';

export default function init() {
  ReactDOM.render(
    (
      <MovieSearch
        movieSearchRequest={movieSearchRequest}
        movieDetailRequest={movieDetailRequest}
      />
    ),
    document.getElementById('main'));
}
