const fs = require('fs');
const path = require('path');
const npm = require('global-npm');
const exec = require('child_process').exec;

const argv = require('minimist')(process.argv.slice(2));

const releaseMethod = argv.m || argv.method;

const validateParams = () => {
  if (argv.h || !releaseMethod) {
    console.info(`---------------- usage ----------------
This script requires the following..
    Required parameters:
        -m --method : String - either 'patch'|'minor'|'major'
        
    Example use
        node scripts/release.js -m 'patch'
 ---------------------------------------`);
    process.exit();
  }
};
validateParams();

const execute = (command, callback) => {
  exec(command, (err, stdout) => { callback(err, stdout); });
};

const bumpVersion = bumpMethod => new Promise((resolve, reject) => {
  npm.load({ loaded: false }, (err) => {
    if (err) {
      reject(err);
      return;
    }
    npm.commands.version([bumpMethod], (commandErr, data) => {
      if (commandErr) {
        reject(commandErr);
        return;
      }
      fs.readFile(path.resolve(process.cwd(), 'package.json'), (readErr, contents) => {
        if (readErr || !contents) {
          reject(`Problems loading package.json: ${readErr}`);
          return;
        }
        const packageJSON = JSON.parse(contents);
        data.version = packageJSON.version;
        resolve(data);
      });
    });
  });
});

const pushChangesToGit = data => new Promise((resolve, reject) => {
  execute('git push', (pushErr) => {
    if (pushErr) {
      reject(pushErr);
      return;
    }
    execute(`git push origin v${data.version}`, (tagPushErr) => {
      if (tagPushErr) {
        reject(tagPushErr);
        return;
      }
      resolve(data);
    });
  });
});

bumpVersion(releaseMethod)
  .then(pushChangesToGit)
  .then(() => console.info('release complete'));
