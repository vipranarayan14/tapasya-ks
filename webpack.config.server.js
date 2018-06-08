const config = require('./webpack.config');

config.devtool = 'source-map';
config.devServer = {
  contentBase: '.',
  port: 9000,
  publicPath: '/'
};

module.exports = config;
