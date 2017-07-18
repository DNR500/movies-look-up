import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    maxWidth: '800px',
    margin: 'auto',
    border: 'none',
    background: '#000',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    padding: '0',

  },
};

const MovieDetails = ({ movieData, onCloseDetails }) => {
  const { poster_path, title, tagline, overview, status, vote_average,
    vote_count, release_date, runtime, spoken_languages, genres, production_companies,
    production_countries, adult, homepage } = movieData;

  return movieData.id ?
    (
      <ReactModal
        isOpen
        contentLabel=""
        style={modalStyle}
      >
        <div className="movie-details" >
          {
            poster_path &&
            <div className="movie-details__image-container">
              <img
                className="movie-details__image"
                src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
                alt={title}
              />
            </div>
          }
          <div className="movie-details__text-container" >
            { title && <h2 className="movie-details__title">{title}</h2> }
            { tagline && <h3 className="movie-details__tagline">{tagline}</h3> }
            { overview && <span className="movie-details__overview">{overview}</span> }
            { status && <span className="movie-details__status">{`Status: ${status}`}</span> }
            { release_date && <span className="movie-details__release-date">{`Release date: ${release_date}`}</span> }
            { (vote_average > 0) && <span className="movie-details__vote-average">{`Average vote rating: ${vote_average}`}</span> }
            { (vote_count > 0) && <span className="movie-details__vote_count">{`Number of votes: ${vote_count}`}</span> }
            { (runtime > 0) && <span className="movie-details__runtime">{`Duration: ${runtime} mins`}</span> }
            { spoken_languages && !!spoken_languages.length &&
              <span className="movie-details__languages">{`Language: ${spoken_languages.join(', ')}`}</span> }
            { genres && !!genres.length &&
              <span className="movie-details__genres">{`Genres: ${genres.join(', ')}`}</span> }
            { production_companies && !!production_companies.length &&
              <span className="movie-details__production-companies">{`Production companies: ${production_companies.join(', ')}`}</span> }
            { production_countries && !!production_countries.length &&
              <span className="movie-details__production-countries">{`Production countries: ${production_countries.join(', ')}`}</span> }
            { adult && <span className="movie-details__adult">May contain adult content</span> }
            { homepage && <a className="movie-details__homepage" href={homepage}><span className="glyphicon glyphicon-home" /> Visit Homepage</a> }
          </div>
          <button type="button" className="movie-details__close-button" onClick={onCloseDetails}>
            <span className="glyphicon glyphicon-remove-sign" />
          </button>
        </div>
      </ReactModal>
    )
    :
    null;
};

MovieDetails.propTypes = {
  movieData: PropTypes.object,
  onCloseDetails: PropTypes.func.isRequired,
};

export default MovieDetails;
