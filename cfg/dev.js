'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let dev_mode = process.env.DEV_MODE || 'independent'; // navbar or independent

if( dev_mode === 'navbar' ) {
  process.env.BASE_HREF = '/navbar/admin/';
  baseConfig.devServer = {
    contentBase: './src/',
    hot: true,
    port: defaultSettings.port,
    publicPath: 'http://127.0.0.1:8000/navbar/admin/',
    noInfo: false,
    public: '127.0.0.1:8000/navbar/admin/',
    proxy: [
      {
        context: [ '/app/' ],
        target: 'http://127.0.0.1:8080'
      },
      {
        context: [ '/' ],
        target: 'http://127.0.0.1:8081',
        bypass: function( req ) {
          if( !!req.path.match( /^\/navbar\/admin/ ) ) {
            return req.path;
          }
          else {
            return false;
          }
        }
      }
    ]
  };
}

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      baseHref: !!process.env.BASE_HREF ? process.env.BASE_HREF : '/'
    } ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules(),
  historyApiFallback: true
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
