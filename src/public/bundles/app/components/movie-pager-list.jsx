import React from 'react';
import PropTypes from 'prop-types';
import MoviePagerListItem from './movie-pager-list-item.jsx';

const MoviePagerList = ({ searchResults }) => {
  const { results } = searchResults;
  
  const onItemSelected = (movieId) => {
    console.log(movieId);
  };

  return results ? (
    <div className="movie-pager-list">
      {
          (results.length > 0) ?
            <ul>
              {
                results.map(movie => 
                  <MoviePagerListItem 
                    ref={movie.id}
                    movieData={movie}
                    onItemSelected={onItemSelected}
                  />)
              }
            </ul>
            :
            <div>Sorry, no results match your search</div>
        }
    </div>
    )
    :
    null;
};

MoviePagerList.propTypes = {
  searchResults: PropTypes.object,
};

export default MoviePagerList;
