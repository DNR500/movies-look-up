import configuration from './config/configuration';
import processEnvVariables from './config/process-env-variables';
import server from './httpapp';

process.title = 'movies-look-up-node';

configuration.init(processEnvVariables)
  .then((config) => {
    server.start(config.port, config.staticPath);
  });
