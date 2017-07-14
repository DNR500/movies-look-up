import React from 'react';
import PropTypes from 'prop-types';

const MovieDetails = ({ movieData, onCloseDetails }) => {
  const { poster_path, title, tagline, overview, status, vote_average,
    vote_count, release_date, runtime, spoken_languages, genres, production_companies,
    production_countries, adult, homepage } = movieData;

  return movieData.id ?
    (
      <div className="movie-details" >
        <button type="button" className="movie-details__close-button" onClick={onCloseDetails}>
          <span className="glyphicon glyphicon-remove-sign" />
        </button>
        {
          poster_path &&
          <img
            className="movie-details__image"
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt={title}
          />
        }
        <div className="movie-details__text-container" >
          { title && <h2 className="movie-details__title">{title}</h2> }
          { tagline && <h3 className="movie-details__tagline">{tagline}</h3> }
          { overview && <span className="movie-details__overview">{overview}</span> }
          { status && <span className="movie-details__status">{status}</span> }
          { vote_average && <span className="movie-details__vote-average">{vote_average}</span> }
          { vote_count && <span className="movie-details__vote_count">{vote_count}</span> }
          { release_date && <span className="movie-details__release-date">{release_date}</span> }
          { runtime && <span className="movie-details__runtime">{runtime}</span> }
          { spoken_languages &&
            <span className="movie-details__languages">{spoken_languages.join(', ')}</span> }
          { genres && genres.length &&
            <span className="movie-details__genres">{genres.join(', ')}</span> }
          { production_companies && production_companies.length &&
            <span className="movie-details__production-companies">{production_companies.join(', ')}</span> }
          { production_countries && production_countries.length &&
            <span className="movie-details__adult">May contain adult content</span> }
          { adult && <span className="movie-details__languages">{spoken_languages.join(', ')}</span> }
          { homepage && <a className="movie-details__homepage" href={homepage}>visit website</a> }
        </div>
      </div>
    )
    :
    null;
};

MovieDetails.propTypes = {
  movieData: PropTypes.object,
  onCloseDetails: PropTypes.func.isRequired,
};

export default MovieDetails;
