const webpack = require('webpack');

const Visualizer = require('webpack-visualizer-plugin');

const baseConfig = require('./webpack.common.config');

const reportConfig = {
  entry: {
    main: './src/public/bundles/main.js',
  },
  output: {
    path: `${__dirname}/report/bundles`,
    filename: '[name].bundle.[hash].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new Visualizer({ filename: 'main.stats.html' }),
  ],
};

module.exports = Object.assign({}, baseConfig, reportConfig);
