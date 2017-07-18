import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    width: '150px',
    height: '150px',
    margin: 'auto',
    border: 'none',
    background: 'transparent',
    overflow: 'hidden',
    outline: 'none',
    padding: '0',
  },
};

const MovieDetails = ({ isLoading }) => (isLoading ?
    (
      <ReactModal
        isOpen
        contentLabel=""
        style={modalStyle}
      >
        <div className="loading-indicator--rings" />
      </ReactModal>
    )
    :
    null);

MovieDetails.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default MovieDetails;
