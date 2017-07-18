import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ searchForMovie }) => {
  let searchQuery = '';
  const onInputChange = e => (searchQuery = e.target.value);
  const onSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) searchForMovie(searchQuery);
  };

  return (
    <div className="search-box">
      <h1 className="search-box__title">Moviedb Search</h1>
      <form className="search-box__form" onSubmit={onSearch}>
        <input className="search-box__form__text-input" type="text" placeholder="Enter your movie.." onInput={onInputChange} />
        <button className="search-box__form__button" type="submit" >
          <span className="glyphicon glyphicon-search" />
        </button>
      </form>
    </div>
  );
};

SearchBox.propTypes = {
  searchForMovie: PropTypes.func.isRequired,
};

export default SearchBox;
