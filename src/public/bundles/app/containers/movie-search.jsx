import React from 'react';
import SearchBox from './../components/search-box';
import MoviePagerList from './../components/movie-pager-list';
import MovieDetails from './../components/movie-details';
import movieSearchRequest from './../network/movieSearchRequest';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: {},
    };

    this.searchForMovie = this.searchForMovie.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
  }

  setSearchResults(searchResults) {
    this.setState({
      searchResults,
    });
  }

  searchForMovie(searchQuery) {
    this.setState({
      searchQuery,
    });
    movieSearchRequest(searchQuery)
      .then(this.setSearchResults);
  }

  render() {
    const { searchResults } = this.state;

    return (
      <div id="MovieSearch">
        <SearchBox searchForMovie={this.searchForMovie} />
        <MoviePagerList searchResults={searchResults} />
        <MovieDetails />
      </div>
    );
  }
}

export default MovieSearch;
