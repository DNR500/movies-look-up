const template = require('./index.marko');

const renderModel = {
  title: 'Home',
  description: 'The main page',
  css: ['main.css'],
  js: ['manifest.js', 'vendor.js', 'main.js'],
};

module.exports = () => new Promise(resolve => resolve({ template, renderModel }));
