require('marko/node-require').install();
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const glob = require('glob');

const bundleUtils = require('./utils/bundle-utils');

const argv = require('minimist')(process.argv.slice(2));

const srcPath = argv.s || argv.src;
const buildPathReplace = argv.o || argv.output;

const validateParams = () => {
  if (argv.h || !srcPath || !buildPathReplace) {
    console.info(`---------------- usage ----------------
This script requires the following..
    Required parameters:
        -s --src : String - source pattern for the .html.js files
        -o --output : String - output directory for generated html files
        
    Example use
        node scripts/generate-static-html -s './src/public/**/*.html.js' -o './build/public/'
 ---------------------------------------`);
    process.exit();
  }
};
validateParams();

const logError = err => console.error(err);

// to be used until output of compiled templates can be toggled off in marko
const deleteCompiledMarkoFiles = (pathToDirectory) => {
  const markoFilesPattern = `${pathToDirectory.match(/^.*(?=(\.html.js))/)[0]}.marko.js`;
  glob(markoFilesPattern, (err, filepaths) =>
    filepaths.forEach((filepath) => {
      fs.unlink(filepath, (deleteErr) => {
        if (deleteErr) {
          console.error(deleteErr);
        }
      });
    }));
};

const createFromTemplate = (template, renderModel) => new Promise((resolve, reject) => {
  template.renderToString(renderModel, (err, output) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(output);
  });
});

const gatherBundlesListing = renderModel => Promise.all([
  bundleUtils.getHashedFilenames(...renderModel.css),
  bundleUtils.getHashedFilenames(...renderModel.js),
])
  .then((bundlesLists) => {
    const outputModel = Object.assign({}, renderModel);
    outputModel.css = bundlesLists[0];
    outputModel.js = bundlesLists[1];
    return outputModel;
  });

const generateHTML = (filepath, fileOutline) => gatherBundlesListing(fileOutline.renderModel)
    .then(createFromTemplate.bind(null, fileOutline.template))
    .then(content => ({ content, filepath }));

const saveFile = (filepath, content, outputMessage) => new Promise((resolve, reject) => {
  const directoryPath = filepath.match(/(.*[/])/)[0];
  mkdirp(directoryPath, (dirErr) => {
    if (dirErr) reject(`Unable to save file: ${dirErr}`);
    fs.writeFile(filepath, content, (fileErr) => {
      if (fileErr) reject(`Unable to save file: ${fileErr}`);
      resolve(outputMessage);
    });
  });
});

glob(srcPath, (err, filepaths) => {
  if (err) logError(err);
  const htmlList = filepaths.map((requirePath) => {
    const filename = requirePath.match(/[^/]*(?=[.][\w]+$)/)[0];
    const sourcePath = srcPath.match(/^.*(?=(\*\*\/\*))/)[0];
    const pathsection = requirePath.match(/(.*[/])/)[0];
    const outputPath = pathsection.replace(sourcePath, buildPathReplace);

    const outputFilepath = `${outputPath}${filename}`;
    const fileLocation = path.relative(__dirname, requirePath);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const establishFileInfo = require(fileLocation);

    return establishFileInfo().then(generateHTML.bind(null, outputFilepath));
  });
  Promise.all(htmlList)
    .then(outputList => outputList.map(file =>
      saveFile(file.filepath, file.content, `HTML generated: ${file.filepath}`)))
    .then(Promise.all.bind(Promise))
    .then((outputMessages) => {
      console.info(`${outputMessages.join('\n')}\nHTML generation ended successfully`);
      deleteCompiledMarkoFiles(srcPath);
    })
    .catch(logError.bind(null));
});
