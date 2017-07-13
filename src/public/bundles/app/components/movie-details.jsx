import React from 'react';
import PropTypes from 'prop-types';

const MovieDetails = ({ movieId }) => (isNaN(movieId) ?
    null
    :
    (
      <div>movie details</div>
    ));

MovieDetails.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieDetails;
