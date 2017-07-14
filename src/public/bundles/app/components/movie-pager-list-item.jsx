import React from 'react';
import PropTypes from 'prop-types';

const MoviePagerListItem = ({ movieData, onItemSelected }) => {
  const {
    id,
    title,
    poster_path,
    original_language,
    overview,
    release_date,
  } = movieData;
  const onItemClicked = () => {
    onItemSelected(id);
  };
  return (
    <li className="movie-pager-list__item">
      <button className="movie-pager-list__button" onClick={onItemClicked} >
        {
          poster_path &&
          <img
            className="movie-pager-list__image"
            src={`https://image.tmdb.org/t/p/w92/${poster_path}`}
            alt={title}
          />
        }
        <div className="movie-pager-list__text-container">
          { title && <h2 className="movie-pager-list__title">{title}</h2> }
          { overview && <span className="movie-pager-list__overview">{overview}</span> }
          { release_date && <span className="movie-pager-list__release-date">{release_date}</span> }
          { original_language && <span className="movie-pager-list__language">{original_language}</span> }
        </div>
      </button>
    </li>
  );
};

MoviePagerListItem.propTypes = {
  movieData: PropTypes.object.isRequired,
  onItemSelected: PropTypes.func.isRequired,
};

export default MoviePagerListItem;
