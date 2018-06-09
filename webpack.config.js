/* eslint-disable sort-keys */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const config = () => ({
  entry: {
    'assets/': './prod/',
    'pages/events/': './prod/pages/events',
    'pages/gallery/': './prod/pages/gallery'
  },
  output: {
    filename: '[name]scripts.min.js',
    path: path.resolve(`${__dirname}/dist`),
  },
  mode: 'production',
  module: {
    rules: [

      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },

      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract([
          'css-loader?sourceMap&minimize',
          'less-loader?sourceMap'
        ])
      },

      {
        test: /\.(woff|woff2|ttf|eot|svg|jpeg|png|gif)/,
        loaders: 'url-loader',
        options: {
          limit: 1,
          name: '[name].[ext]',
          useRelativePath: true
        }
      }

    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]styles.min.css'),
    new UglifyJsPlugin(),
    new CopyWebpackPlugin([{
      from: 'prod/images/processed/',
      to: 'images/'
    }]),
    new HtmlWebpackPlugin({
      template: '!!html-loader!!ejs-html-loader!prod/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true
      },
      hash: true,
      chunks: ['assets/']
    }),
    new HtmlWebpackPlugin({
      template: 'prod/pages/events/index.html',
      filename: 'pages/events/index.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'prod/pages/gallery/index.html',
      filename: 'pages/gallery/index.html',
      inject: false,
    })
  ]
});

module.exports = config;
