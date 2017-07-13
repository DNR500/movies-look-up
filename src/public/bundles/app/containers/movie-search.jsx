import React from 'react';
import SearchBox from './../components/search-box';
import MoviePagerList from './../components/movie-pager-list';
import MovieDetails from './../components/movie-details';
import movieSearchRequest from './../network/movieSearchRequest';
import scrollToTop from './../utils/scroll-to-top';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: {},
      movieId: NaN,
    };

    this.searchForMovie = this.searchForMovie.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
    this.onRequestPage = this.onRequestPage.bind(this);
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  onItemSelected(movieId) {
    this.setState({
      movieId,
    });
  }

  onRequestPage(newPage) {
    const { searchQuery } = this.state;
    movieSearchRequest(searchQuery, newPage)
      .then(this.setSearchResults);
  }

  setSearchResults(searchResults) {
    this.setState({
      searchResults,
    });
    scrollToTop();
  }

  searchForMovie(searchQuery) {
    this.setState({
      searchQuery,
    });
    movieSearchRequest(searchQuery)
      .then(this.setSearchResults);
  }

  render() {
    const { searchResults, movieId } = this.state;

    return (
      <div id="MovieSearch">
        <SearchBox searchForMovie={this.searchForMovie} />
        <MoviePagerList
          searchResults={searchResults}
          onItemSelected={this.onItemSelected}
          onRequestPage={this.onRequestPage}
        />
        <MovieDetails movieId={movieId} />
      </div>
    );
  }
}

export default MovieSearch;
