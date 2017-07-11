import configuration from './config/configuration';
import processEnvVariables from './config/process-env-variables';
import server from './httpapp';
import endpoints from './endpoints';

process.title = 'movies-look-up-node';

configuration.init(processEnvVariables)
  .then((config) => {
    endpoints(server.app);
    server.start(config.port, config.staticPath);
  });
