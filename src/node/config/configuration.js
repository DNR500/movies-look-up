import configLoader from './config-loader';

let envSpecificConfig;

export default {
  init(processEnvVariables) {
    return configLoader()
      .then((config) => {
        envSpecificConfig = processEnvVariables ?
          processEnvVariables(config) : config;
        return envSpecificConfig;
      });
  },
  retrieve(key) {
    return envSpecificConfig[key];
  },
};
