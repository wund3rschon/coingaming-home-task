const path = require('path');

const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  devServer: {
    compress: true,
    contentBase: path.resolve('public'),
    historyApiFallback: true,
    port: 9000,
  },

  entry: path.resolve('src'),
  output: {
    path: path.resolve('public'),
    filename: 'bundle.[contenthash].js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?/,
        include: path.resolve('src'),
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg)?/,
        include: path.resolve('src/assets'),
        use: 'file-loader',
      },
    ],
  },

  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
    modules: [
      path.resolve('.'),
      path.resolve('node_modules'),
    ],
  },

  plugins: [
    new HTMLPlugin({
      template: path.resolve('index.ejs'),
      filename: path.resolve('public/index.html'),
    }),
  ],
};
