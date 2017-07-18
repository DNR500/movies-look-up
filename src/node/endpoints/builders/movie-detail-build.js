import formatDate from './../../../universal/utils/date/format-date';
import localToLanguage from './../../../universal/utils/locale/locale-to-language';

const reduceToNames = items => items.map(item => item.name);

const movieDetailBuild = (detailResult) => {
  const {
    adult,
    backdrop_path,
    budget,
    genres,
    homepage,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    revenue,
    runtime,
    spoken_languages,
    status,
    tagline,
    title,
    vote_average,
    vote_count,
  } = detailResult[0];

  return {
    adult,
    backdrop_path,
    budget,
    genres: reduceToNames(genres),
    homepage,
    id,
    original_language: localToLanguage(original_language),
    original_title,
    overview,
    popularity,
    poster_path,
    production_companies: reduceToNames(production_companies),
    production_countries: reduceToNames(production_countries),
    release_date: formatDate(release_date),
    revenue,
    runtime,
    spoken_languages: reduceToNames(spoken_languages),
    status,
    tagline,
    title,
    vote_average,
    vote_count,
  };
};

export default movieDetailBuild;
