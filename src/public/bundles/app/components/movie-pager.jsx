import React from 'react';
import PropTypes from 'prop-types';

const MoviePager = ({ currentPage, totalPages, requestPage }) => {
  const onClickPrevPage = () => {
    if (currentPage > 1) requestPage(currentPage - 1);
  };
  const onClickNextPage = () => {
    if (currentPage < totalPages) requestPage(currentPage + 1);
  };

  return (
    <div className="movie-pager">
      {
        (currentPage > 1) &&
        <button type="button" className="movie-pager__prev-button" onClick={onClickPrevPage}>
          <span className="glyphicon glyphicon-circle-arrow-left" />
        </button>
      }
      <span className="movie-pager__page-indicator">{`${currentPage}/${totalPages}`}</span>
      {
        (currentPage < totalPages) &&
        <button type="button" className="movie-pager__next-button" onClick={onClickNextPage}>
          <span className="glyphicon glyphicon-circle-arrow-right" />
        </button>
      }
    </div>
  );
};

MoviePager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  requestPage: PropTypes.func.isRequired,
};

export default MoviePager;
