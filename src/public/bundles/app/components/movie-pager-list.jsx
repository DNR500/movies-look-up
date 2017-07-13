import React from 'react';
import PropTypes from 'prop-types';
import MoviePager from './movie-pager';
import MoviePagerListItem from './movie-pager-list-item';

const MoviePagerList = ({ searchResults, onItemSelected, onRequestPage }) => {
  const { results, page, total_pages, total_results } = searchResults;

  return results ? (
    <div className="movie-pager-list">
      {
          (results.length > 0) ?
            <div>
              <span className="movie-pager-list__total-results">{`total results: ${total_results}`}</span>
              <MoviePager
                currentPage={page}
                totalPages={total_pages}
                requestPage={onRequestPage}
              />
              <ul>
                {
                  results.map(movie =>
                    <MoviePagerListItem
                      key={movie.id}
                      movieData={movie}
                      onItemSelected={onItemSelected}
                    />)
                }
              </ul>
              <MoviePager
                currentPage={page}
                totalPages={total_pages}
                requestPage={onRequestPage}
              />
            </div>
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
  onItemSelected: PropTypes.func.isRequired,
  onRequestPage: PropTypes.func.isRequired,
};

export default MoviePagerList;
