const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: Path.join(__dirname, './build'),
    filename: 'index.bundle.js',
  },
  resolve: {
    alias: {
      '@': Path.resolve(__dirname, './src'),
      '@@': Path.resolve(__dirname, './public/images'),
    },
    extensions: ['.mjs', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new Dotenv(),
  ],
};
