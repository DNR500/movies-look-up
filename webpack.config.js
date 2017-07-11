const path = require('path');

const webpack = require('webpack');

const baseConfig = require('./webpack.common.config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const WebpackCleanUpPlugin = require('webpack-cleanup-plugin');

const ManifestPlugin = require('webpack-manifest-plugin');

const autoprefixer = require('autoprefixer');

const isProduction = process.env.NODE_ENV === 'production';

const additionalBuildConfig = {
  devtool: 'source-map',
  entry: {
    main: [
      './src/public/bundles/main.js',
      './src/public/bundles/main.scss',
    ],
  },
  output: {
    path: `${__dirname}/build/public/bundles`,
    filename: '[name].bundle.[hash].js',
  },
  module: {
    loaders: [
      ...baseConfig.module.rules,
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer({ browsers: ['last 2 versions'] })],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /bootstrap\/.*\.(eot|svg|ttf|woff|woff2)$/,
        exclude: [path.resolve(__dirname, 'src/public/assets')],
        use: {
          loader: 'file-loader',
          options: {
            name: '../fonts/[name].[ext]',
          },
        },
      },
      {
        test: /assets\/.*\.(svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            useRelativePath: true,
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new webpack.DefinePlugin(isProduction ? {
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    } : {}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ManifestPlugin(),
    new ExtractTextPlugin({ filename: '[name].bundle.[hash].css' }),
    new WebpackCleanUpPlugin(),
  ],
};

module.exports = Object.assign({}, baseConfig, additionalBuildConfig);
