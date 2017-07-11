export default (config) => {
  const conf = { ...config };
  conf.apikey.moviedb = conf.apikey.moviedb || process.env.moviedbApiKey;
  return conf;
};
