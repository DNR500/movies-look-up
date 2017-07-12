import React from 'react';
import ReactDOM from 'react-dom';

import './polyfills/location.origin';

import MovieSearch from './containers/movie-search';

export default function init() {
  ReactDOM.render(
    (
      <MovieSearch />
    ),
    document.getElementById('main'));
}
