const path = require('path');
require('dotenv').config(); // 🔑 Загрузка .env

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/img', to: 'img' },
        { from: 'public/svg', to: 'svg' }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.REACT_APP_YANDEX_API_KEY': JSON.stringify(process.env.REACT_APP_YANDEX_API_KEY),
      'process.env.REACT_APP_YANDEX_FOLDER_ID': JSON.stringify(process.env.REACT_APP_YANDEX_FOLDER_ID),
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 8000,
    open: true
  }
};
