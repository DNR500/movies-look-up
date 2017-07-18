import limitWordCount from './../../../universal/utils/string/limit-word-count';
import formatDate from './../../../universal/utils/date/format-date';
import localToLanguage from './../../../universal/utils/locale/locale-to-language';

const formatResult = (result) => {
  const {
    id,
    title,
    poster_path,
    original_language,
    overview,
    release_date,
  } = result;

  return {
    id,
    title,
    poster_path,
    original_language: localToLanguage(original_language),
    overview: limitWordCount(overview, 40),
    release_date: formatDate(release_date),
  };
};

const movieSearchBuild = (searchResults) => {
  const { page, total_results, total_pages, results } = searchResults[0];

  return {
    page,
    total_results,
    total_pages,
    results: results.map(result => formatResult(result)),
  };
};

export default movieSearchBuild;
