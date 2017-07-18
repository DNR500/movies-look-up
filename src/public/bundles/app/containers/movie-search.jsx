import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchBox from './../components/search-box';
import MoviePagerList from './../components/movie-pager-list';
import MovieDetails from './../components/movie-details';
import LoadIndicator from './../components/load-indicator';
import scrollToTop from './../utils/scroll-to-top';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: {},
      movieData: {},
      isLoading: false,
    };
  }

  onItemSelected = (movieId) => {
    const { movieDetailRequest } = this.props;
    this.setState({ isLoading: true });
    movieDetailRequest(movieId)
      .then(this.setMovieData);
  }

  onSearchForMovie = (searchQuery) => {
    const { movieSearchRequest } = this.props;
    this.setState({
      searchQuery,
      isLoading: true,
    });
    movieSearchRequest(searchQuery)
      .then(this.setSearchResults);
  }

  onRequestPage = (newPage) => {
    const { movieSearchRequest } = this.props;
    const { searchQuery } = this.state;
    this.setState({ isLoading: true });
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
      isLoading: false,
    });
    scrollToTop();
  }

  setMovieData = (movieData) => {
    this.setState({
      movieData,
      isLoading: false,
    });
  }

  render() {
    const { searchResults, movieData, isLoading } = this.state;
    const movieSearchClass = classNames({
      'movie-search--no-scroll': !!movieData.id,
    });

    return (
      <div id="MovieSearch" className={movieSearchClass}>
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
        <LoadIndicator
          isLoading={isLoading}
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
