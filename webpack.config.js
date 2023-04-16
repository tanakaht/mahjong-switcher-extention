const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    content: path.join(src, 'content'),
    background: path.join(src, 'background'),
    popup: path.join(src, 'popup/popup.js'),
  },

  output: {
    path: dist,
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
      {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
      }
    ],
  },
  resolve: {
    extensions: [ '.js' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'popup.html',
        template: "src/popup/index.html"
    })
  ],
};
