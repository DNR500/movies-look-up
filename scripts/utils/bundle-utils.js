const fs = require('fs');
const path = require('path');

const mainfestFilepath = '/build/public/bundles/manifest.json';

let manifest;

const createErrorMessge = (filepath, err) => `Unable to find: ${filepath}
Ensure that the project has been built. ${err}`;

const getHashedFilename = srcFilename => new Promise((resolve, reject) => {
  if (manifest) {
    resolve(manifest[srcFilename]);
    return;
  }

  fs.readFile(path.resolve(process.cwd() + mainfestFilepath), 'utf8', (err, contents) => {
    if (err || !contents) {
      reject(createErrorMessge(mainfestFilepath, err));
      return;
    }
    manifest = JSON.parse(contents);
    resolve(manifest[srcFilename]);
  });
});

const getHashedFilenames = (...srcFilenames) => {
  const hashedFilenameQueries = srcFilenames.map(srcFilename => getHashedFilename(srcFilename));
  return Promise.all(hashedFilenameQueries);
};

module.exports = {
  getHashedFilename,
  getHashedFilenames,
};
