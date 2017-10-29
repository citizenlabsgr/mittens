const base = require('./webpack.config.base');
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ROOT = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

var dev = _.merge({}, base, {
  output: {
    publicPath: '/static/',
    path: root('/build'),
    filename: 'app.[hash:6].js'
  }
});

dev.plugins.push(
  new webpack.DefinePlugin({
    PRODUCTION: true,
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }})//,
  //new UglifyJSPlugin()
);

module.exports = dev;
