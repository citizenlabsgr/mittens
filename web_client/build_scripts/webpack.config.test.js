const base = require('./webpack.config.base');
const webpack = require('webpack');
const _ = require('lodash');

var test = _.merge({}, base, {
  devtool: 'source-map',
  target: 'node'
});

delete test.entry;
delete test.output;

test.plugins.push(
  new webpack.SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(ts|js|tsx|jsx)($|\?)/i // process .js and .ts files only
  })
);
dev.plugins.push(
  new webpack.DefinePlugin({ PRODUCTION: false })
);

module.exports = test;
