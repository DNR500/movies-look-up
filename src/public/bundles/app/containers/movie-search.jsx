import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './../components/search-box';
import MoviePagerList from './../components/movie-pager-list';
import MovieDetails from './../components/movie-details';
import scrollToTop from './../utils/scroll-to-top';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: {},
      movieData: {},
    };
  }

  onItemSelected = (movieId) => {
    const { movieDetailRequest } = this.props;
    movieDetailRequest(movieId)
      .then(this.setMovieData);
  }

  onSearchForMovie = (searchQuery) => {
    const { movieSearchRequest } = this.props;
    this.setState({
      searchQuery,
    });
    movieSearchRequest(searchQuery)
      .then(this.setSearchResults);
  }

  onRequestPage = (newPage) => {
    const { movieSearchRequest } = this.props;
    const { searchQuery } = this.state;
    movieSearchRequest(searchQuery, newPage)
      .then(this.setSearchResults);
  }

  onCloseDetails = () => {
    this.setState({
      movieData: {},
    });
  }

  setSearchResults = (searchResults) => {
    this.setState({
      searchResults,
    });
    scrollToTop();
  }

  setMovieData = (movieData) => {
    this.setState({
      movieData,
    });
  }

  render() {
    const { searchResults, movieData } = this.state;

    return (
      <div id="MovieSearch">
        <SearchBox searchForMovie={this.onSearchForMovie} />
        <MoviePagerList
          searchResults={searchResults}
          onItemSelected={this.onItemSelected}
          onRequestPage={this.onRequestPage}
        />
        <MovieDetails
          movieData={movieData}
          onCloseDetails={this.onCloseDetails}
        />
      </div>
    );
  }
}

MovieSearch.propTypes = {
  movieSearchRequest: PropTypes.func.isRequired,
  movieDetailRequest: PropTypes.func.isRequired,
};

export default MovieSearch;
