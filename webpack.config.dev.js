/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const webpack = require('webpack');

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

module.exports = require('./webpack.config.base')({
  entry: {
    // Add hot reloading in development
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=true'],
    // Inject styles for embed development.
    embed: ['./style/index.css'],
  },

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
  },

  rules: [
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader', 'postcss-loader'],
    },
  ],

  // Add development plugins
  plugins,

  // Load files without hash in development
  fileLoader: 'file-loader?name=[name].[ext]',

  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',
});
