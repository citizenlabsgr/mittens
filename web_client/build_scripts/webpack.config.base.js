const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
    './web_client/polyfills.ts',
    './web_client/app/main.tsx'
  ],

  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['./web_client/app', './node_modules']
  },

  module: {
    loaders: [
      // Using awesome-ts instead of ts-loader because it improves
      // build speed.
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader'],
        exclude: /\.d\.ts/
      },
      // Image assets are hashed to allow cache-busting on deploy.
      {
        test: /\.(jpg|png|svg|gif)$/,
        loaders: ['file-loader?name=img/img-[hash:6].[ext]']
        //loaders: ['file-loader?name=img/[name].[ext]']
      },

      // Font assets
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loaders: ['file-loader'],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        loaders: ['html-loader']
      }
    ]
  },

  plugins: [
    // This takes the index.html file and injects our scripts.
    new HtmlWebpackPlugin({
      template: './web_client/app/index.html',
      inject: 'head'
    }),
  ]
};
