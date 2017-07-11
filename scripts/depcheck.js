const depcheck = require('depcheck');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const options = {
  withoutDev: false,
  ignoreBinPackage: false,
  ignoreDirs: [
    'build',
    'node_modules',
    'report',
  ],
  ignoreMatches: [
    'babel-cli',
  ],
  parsers: {
    '*.js': depcheck.parser.es6,
    '*.jsx': depcheck.parser.jsx,
    '*.scss': depcheck.parser.sass,
  },
  detectors: [
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration,
  ],
  specials: [
    depcheck.special.babel,
    depcheck.special.eslint,
    depcheck.special.mocha,
    depcheck.special.webpack,
  ],
};

const createReport = (filePath, reportJson) => {
  const dirPath = filePath.match(/[^']+\//g)[0];
  mkdirp(dirPath, (mkDirErr) => {
    if (mkDirErr) throw mkDirErr;
    fs.writeFile(filePath, JSON.stringify(reportJson, null, 2), (fsErr) => {
      if (fsErr) throw fsErr;
      console.info(`Report saved to ${filePath}`);
    });
  });
};

depcheck(path.resolve(__dirname, '../'), options, (report) => {
  if (process.argv[2] === 'usage') {
    createReport('report/dependencies/usage.json', Object.assign({}, report.using));
  } else {
    delete report.using;
    createReport('report/dependencies/issues.json', report);
  }
});
